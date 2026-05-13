"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const TMDB_API_KEY = process.env.TMDB_API_KEY || "439c478a771f35c05022f9feabcca01c";
const DEFAULT_TIMEOUT_MS = Number(process.env.PROVIDER_TIMEOUT_MS || 25000);

const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, "manifest.json"), "utf8"));
const providerRegistry = JSON.parse(fs.readFileSync(path.join(ROOT, "providers.json"), "utf8"));

const providerEntries = providerRegistry.scrapers
  .filter((provider) => provider.enabled)
  .map((provider) => ({
    id: provider.id,
    name: provider.name,
    modulePath: path.join(ROOT, provider.filename),
    getStreams: null
  }));

function loadProvider(provider) {
  if (!provider.getStreams) {
    provider.getStreams = require(provider.modulePath).getStreams;
  }

  if (typeof provider.getStreams !== "function") {
    throw new Error(`${provider.name} does not export getStreams`);
  }

  return provider.getStreams;
}

function parseStremioId(type, id) {
  const parts = String(id || "").split(":");
  const imdbId = parts[0];

  if (!/^tt\d+$/i.test(imdbId)) {
    return null;
  }

  if (type === "series") {
    const season = Number(parts[1]);
    const episode = Number(parts[2]);
    if (!Number.isInteger(season) || !Number.isInteger(episode)) {
      return null;
    }
    return { imdbId, type: "series", mediaType: "tv", season, episode };
  }

  if (type === "movie") {
    return { imdbId, type: "movie", mediaType: "movie", season: null, episode: null };
  }

  return null;
}

async function resolveTmdbId(imdbId, mediaType) {
  const resultsKey = mediaType === "tv" ? "tv_results" : "movie_results";
  const url = new URL(`https://api.themoviedb.org/3/find/${encodeURIComponent(imdbId)}`);
  url.searchParams.set("api_key", TMDB_API_KEY);
  url.searchParams.set("external_source", "imdb_id");

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "Doom-addon Stremio Addon"
    }
  });

  if (!response.ok) {
    throw new Error(`TMDB lookup failed with ${response.status}`);
  }

  const payload = await response.json();
  const match = payload[resultsKey] && payload[resultsKey][0];
  return match ? String(match.id) : null;
}

function qualityRank(value) {
  const text = String(value || "").toLowerCase();
  if (text.includes("2160") || text.includes("4k")) return 5;
  if (text.includes("1440") || text.includes("2k")) return 4;
  if (text.includes("1080")) return 3;
  if (text.includes("720")) return 2;
  if (text.includes("480")) return 1;
  return 0;
}

function normalizeHeaders(headers) {
  if (!headers || typeof headers !== "object") {
    return null;
  }

  return Object.fromEntries(
    Object.entries(headers)
      .filter(([, value]) => value !== undefined && value !== null && value !== "")
      .map(([key, value]) => [key, String(value)])
  );
}

function looksWebReady(url) {
  return /^https:\/\//i.test(url) && /\.mp4(?:[?#].*)?$/i.test(url);
}

const UMBRELLA_STREAM_LABELS = {
  "4khdhub": "4K HH",
  "4khdhub_murph": "4K HHM"
};

function normalizeLanguageText(value) {
  const text = String(value || "")
    .replace(/\b4KHDHub\s+Murph\b/ig, "")
    .replace(/\b4KHDHub\b/ig, "")
    .replace(/\b4K\b/ig, "")
    .replace(/\b(?:2160p|1080p|720p|480p|360p|auto)\b/ig, "")
    .replace(/[|:()[\]]/g, " ")
    .replace(/\s*-\s*/g, " - ")
    .replace(/^\s*-\s*|\s*-\s*$/g, "")
    .replace(/\s+/g, " ")
    .trim();

  const languages = [];
  const seen = new Set();
  for (const part of text.split(/\s+-\s+|[,/]+|\s+\|\s+/)) {
    const normalized = part.trim();
    if (!normalized || /\d/.test(normalized)) continue;
    const key = normalized.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    languages.push(normalized.replace(/\b\w/g, (char) => char.toUpperCase()));
  }

  return languages.join(" - ");
}

function umbrellaStreamName(rawStream, provider) {
  const providerCode = UMBRELLA_STREAM_LABELS[provider.id];
  if (!providerCode) {
    return null;
  }

  const sourceName = rawStream.name || "";
  const sourceTitle = rawStream.title || rawStream.description || "";
  const languageText = normalizeLanguageText(sourceName) || normalizeLanguageText(sourceTitle);
  return ["Umbrella", providerCode, languageText].filter(Boolean).join(" | ");
}

function normalizeStream(rawStream, provider) {
  if (!rawStream || typeof rawStream !== "object") {
    return null;
  }

  const targetUrl = rawStream.url || rawStream.externalUrl;
  if (!targetUrl || typeof targetUrl !== "string") {
    return null;
  }

  const requestHeaders = normalizeHeaders(rawStream.headers);
  const quality = rawStream.quality || "";
  const nameParts = [provider.name, quality].filter(Boolean);
  const description = rawStream.description || rawStream.title || nameParts.join(" | ");
  const behaviorHints = Object.assign({}, rawStream.behaviorHints || {});

  if (rawStream.fileName && !behaviorHints.filename) {
    behaviorHints.filename = rawStream.fileName;
  }
  if (typeof rawStream.size === "number" && rawStream.size > 0 && !behaviorHints.videoSize) {
    behaviorHints.videoSize = rawStream.size;
  }
  if (!behaviorHints.bingeGroup) {
    behaviorHints.bingeGroup = `doomp-${provider.id}-${String(quality || "auto").toLowerCase()}`;
  }
  if (!looksWebReady(targetUrl) || requestHeaders) {
    behaviorHints.notWebReady = true;
  }
  if (requestHeaders) {
    behaviorHints.proxyHeaders = {
      request: requestHeaders
    };
  }

  return {
    name: umbrellaStreamName(rawStream, provider) || rawStream.name || nameParts.join(" | ") || provider.name,
    title: description,
    description,
    url: targetUrl,
    behaviorHints
  };
}

function dedupeStreams(streams) {
  const seen = new Set();
  return streams.filter((stream) => {
    const key = `${stream.url}|${stream.name}|${stream.description}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

async function withTimeout(promise, ms, label) {
  let timeout;
  const timer = new Promise((_, reject) => {
    timeout = setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms);
  });

  try {
    return await Promise.race([promise, timer]);
  } finally {
    clearTimeout(timeout);
  }
}

async function getStreams(type, id) {
  const parsed = parseStremioId(type, id);
  if (!parsed) {
    return [];
  }

  let tmdbId;
  try {
    tmdbId = await resolveTmdbId(parsed.imdbId, parsed.mediaType);
    if (!tmdbId) {
      return [];
    }
  } catch (error) {
    console.error(`[TMDB] ${error.message || error}`);
    return [];
  }

  const providerResults = await Promise.allSettled(
    providerEntries.map(async (provider) => {
      const providerGetStreams = loadProvider(provider);
      const rawStreams = await withTimeout(
        Promise.resolve(providerGetStreams(tmdbId, parsed.mediaType, parsed.season, parsed.episode)),
        DEFAULT_TIMEOUT_MS,
        provider.name
      );

      return (Array.isArray(rawStreams) ? rawStreams : [])
        .map((stream) => normalizeStream(stream, provider))
        .filter(Boolean);
    })
  );

  const streams = providerResults.flatMap((result, index) => {
    if (result.status === "fulfilled") {
      return result.value;
    }
    console.error(`[${providerEntries[index].name}] ${result.reason.message || result.reason}`);
    return [];
  });

  return dedupeStreams(streams).sort((a, b) => {
    const rankA = qualityRank(`${a.name} ${a.description}`);
    const rankB = qualityRank(`${b.name} ${b.description}`);
    return rankB - rankA;
  });
}

module.exports = {
  manifest,
  getStreams,
  parseStremioId,
  resolveTmdbId,
  normalizeStream
};
