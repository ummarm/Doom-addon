"use strict";

const PROVIDER_NAME = "Pengu";
const RETRYABLE_STATUS = new Set([502, 503, 504]);
const FIRST_REQUEST_TIMEOUT_MS = 7000;
const RETRY_REQUEST_TIMEOUT_MS = 17000;
const DEFAULT_MANIFEST_URL = "https://pengu.uk/%7B%22auth_token%22%3A%22o_3vfdJwk6Ala9JE5xNBzfU1FJqFicrxlAupcRebxV8%22%7D/manifest.json";

function normalizeBaseUrl(raw) {
  return String(raw || "")
    .replace(/\/manifest\.json$/i, "")
    .replace(/\/+$/, "");
}

function configuredBaseUrl() {
  const configuredUrl = process.env.PENGU_MANIFEST_URL || process.env.PENGU_BASE_URL;
  if (configuredUrl) {
    return normalizeBaseUrl(configuredUrl);
  }

  const authToken = String(process.env.PENGU_AUTH_TOKEN || "").trim();
  if (authToken) {
    return `${normalizeBaseUrl(DEFAULT_MANIFEST_URL)}/${encodeURIComponent(JSON.stringify({ auth_token: authToken }))}`;
  }

  return normalizeBaseUrl(DEFAULT_MANIFEST_URL);
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

  const url = `${baseUrl}/stream/${encodeURIComponent(stremioType)}/${encodeURIComponent(id)}.json`;
  const options = {
    headers: {
      Accept: "application/json",
      "User-Agent": "Doom-addon/3.0"
    },
    redirect: "follow"
  };
  async function request(timeoutMs) {
    const response = await fetch(url, { ...options, signal: AbortSignal.timeout(timeoutMs) });
    if (!response.ok) {
      await response.body?.cancel().catch(() => {});
      const error = new Error(`${PROVIDER_NAME} returned HTTP ${response.status}`);
      error.retryable = RETRYABLE_STATUS.has(response.status);
      throw error;
    }
    const payload = await response.json();
    return Array.isArray(payload.streams) ? payload.streams : [];
  }

  try {
    return await request(FIRST_REQUEST_TIMEOUT_MS);
  } catch (error) {
    if (!error.retryable && error.name !== "TimeoutError" && !/fetch failed/i.test(error.message || "")) throw error;
    return request(RETRY_REQUEST_TIMEOUT_MS);
  }
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
