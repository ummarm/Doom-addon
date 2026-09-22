"use strict";

const PROVIDER_NAME = "Pengu";
const DEFAULT_MANIFEST_URL = "https://pengu.uk/manifest.json";

function normalizeBaseUrl(raw) {
  return String(raw || "")
    .replace(/\/manifest\.json$/i, "")
    .replace(/\/+$/, "");
}

function configuredBaseUrl() {
  return normalizeBaseUrl(
    process.env.PENGU_MANIFEST_URL
    || process.env.PENGU_BASE_URL
    || DEFAULT_MANIFEST_URL
  );
}

function streamId(imdbId, tmdbId, mediaType, season, episode) {
  const baseId = imdbId || (tmdbId ? `tmdb:${tmdbId}` : "");
  if ((mediaType === "series" || mediaType === "tv") && season != null && episode != null) {
    return `${baseId}:${season}:${episode}`;
  }
  return baseId;
}

async function fetchPenguStreams(imdbId, tmdbId, mediaType, season, episode) {
  const baseUrl = configuredBaseUrl();
  const stremioType = mediaType === "tv" ? "series" : mediaType;
  const id = streamId(imdbId, tmdbId, stremioType, season, episode);
  if (!baseUrl || !id) {
    return [];
  }

  const response = await fetch(
    `${baseUrl}/stream/${encodeURIComponent(stremioType)}/${encodeURIComponent(id)}.json`,
    {
      headers: {
        Accept: "application/json",
        "User-Agent": "Doom-addon/3.0"
      },
      redirect: "follow"
    }
  );

  if (!response.ok) {
    throw new Error(`${PROVIDER_NAME} returned HTTP ${response.status}`);
  }

  const payload = await response.json();
  return Array.isArray(payload.streams) ? payload.streams : [];
}

async function getStreams(tmdbId, mediaType = "movie", season = null, episode = null, imdbId = "") {
  try {
    return (await fetchPenguStreams(imdbId, tmdbId, mediaType, season, episode))
      .filter((stream) => stream && typeof stream.url === "string" && stream.url);
  } catch (error) {
    console.error(`[${PROVIDER_NAME}] ${error.message || error}`);
    return [];
  }
}

module.exports = { getStreams };
