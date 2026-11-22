"use strict";

const { manifests } = require("../upstreams.json");

async function getStreams(tmdbId, mediaType, season, episode, imdbId) {
  const type = mediaType === "tv" ? "series" : mediaType;
  const showId = imdbId || (tmdbId ? `tmdb:${tmdbId}` : "");
  if (!showId || !["movie", "series"].includes(type)) return [];
  if (type === "series" && (!Number.isInteger(season) || !Number.isInteger(episode))) return [];

  const id = type === "series" ? `${showId}:${season}:${episode}` : showId;
  const base = manifests.cncverse.replace(/\/manifest\.json$/, "");
  const response = await fetch(`${base}/stream/${type}/${encodeURIComponent(id)}.json`, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(25000)
  });
  if (!response.ok) throw new Error(`CNCVerse returned HTTP ${response.status}`);
  const { streams } = await response.json();
  return (Array.isArray(streams) ? streams : []).flatMap((stream) => {
    if (typeof stream?.url !== "string" || !/^https?:\/\//i.test(stream.url)) return [];
    const details = String(stream.description || stream.title || "").split(/\r?\n/);
    const audio = details.find((line) => /\baudio\s*:/i.test(line)) || "";
    if (!/\b(?:hindi|hin|english|eng)\b/i.test(audio)) return [];
    return [{ ...stream, language: audio, title: undefined,
      description: details.filter((line) => !/\bsubtitles\b/i.test(line)).join("\n") }];
  });
}

module.exports = { getStreams };
