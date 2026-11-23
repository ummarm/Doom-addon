"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const Module = require("node:module");
const path = require("node:path");

const filename = path.resolve(__dirname, "../addon.js");
const addon = new Module(filename, module);
addon.filename = filename;
addon.paths = Module._nodeModulePaths(path.dirname(filename));
addon._compile(fs.readFileSync(filename, "utf8") +
  "\nmodule.exports.test = { startStreamBuild };", filename);
const { manifest, addonManifests, parseStremioId, test } = addon.exports;

function supportsStream(config, type, id) {
  return config.resources.some((resource) => resource.name === "stream" &&
    resource.types.includes(type) && resource.idPrefixes.some((prefix) => id.startsWith(prefix)));
}

async function check() {
  for (const config of [manifest, ...["quality-4k", "quality-1080", "quality-low"].map((id) => addonManifests[id])]) {
    assert.equal(supportsStream(config, "movie", "tmdb:126400"), true);
    assert.equal(supportsStream(config, "movie", "tt1954470"), true);
    assert.equal(supportsStream(config, "series", "tt1954470:1:2"), true);
    assert.equal(supportsStream(config, "series", "tmdb:126400:1:2"), false);
  }
  assert.equal(parseStremioId("movie", "tmdb:126400:1"), null);
  assert.equal(parseStremioId("series", "tmdb:126400:1:2"), null);
  assert.equal(parseStremioId("series", "tt1954470:1:2").episode, 2);

  const fetchBefore = global.fetch;
  const requests = [];
  try {
    global.fetch = async (url) => {
      const requestPath = new URL(url).pathname;
      requests.push(requestPath);
      if (requestPath === "/3/movie/126400") {
        return Response.json({ title: "Gangs of Wasseypur - Part 2", release_date: "2012-08-08", imdb_id: "" });
      }
      if (requestPath === "/3/find/tt1954470") {
        return Response.json({ movie_results: [{ id: 117691 }] });
      }
      if (requestPath === "/3/movie/117691") {
        return Response.json({ title: "Gangs of Wasseypur - Part 1", imdb_id: "tt1954470" });
      }
      throw new Error("Unexpected TMDB test request");
    };
    const part2 = await test.startStreamBuild("movie", "tmdb:126400", []);
    assert.equal(part2.mediaInfo.title, "Gangs of Wasseypur - Part 2");
    assert.equal(part2.parsed.imdbId, "");
    assert.deepEqual(requests, ["/3/movie/126400"]);
    const part1 = await test.startStreamBuild("movie", "tt1954470", []);
    assert.equal(part1.mediaInfo.title, "Gangs of Wasseypur - Part 1");
    assert.deepEqual(requests.slice(1), ["/3/find/tt1954470", "/3/movie/117691"]);
  } finally {
    global.fetch = fetchBefore;
  }
}

check().catch((error) => { console.error(error); process.exitCode = 1; });
