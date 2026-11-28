"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const Module = require("node:module");
const path = require("node:path");
const vm = require("node:vm");
const registry = require("../providers.json");

const filename = path.resolve(__dirname, "../addon.js");
const addon = new Module(filename, module);
addon.filename = filename;
addon.paths = Module._nodeModulePaths(path.dirname(filename));
addon._compile(fs.readFileSync(filename, "utf8") +
  "\nmodule.exports.test = { streamRequiresProbe, matchesRequestedMedia };", filename);
const { addonManifests, scopeHasProvider, normalizeStream, test } = addon.exports;
const expected = {
  vegamovies_asura: "VG A",
  moviesdrive_asura: "MD A",
  cinefreak_asura: "CF A",
  "4khdhub_asura": "4KHH A",
  hdhub4u_asura: "HDHU A",
  uhdmovies_asura: "UHD A"
};
const asura = registry.scrapers.filter((provider) => provider.id.endsWith("_asura"));
assert.deepEqual(asura.map((provider) => provider.id).sort(), Object.keys(expected).sort());
assert.equal(addonManifests.asura.name, "Umbrella A");
const scopes = ["asura", "main", "quality-4k", "quality-1080", "quality-low"];
for (const provider of asura) {
  assert.equal(provider.enabled, true);
  for (const scope of scopes) assert.equal(scopeHasProvider(scope, provider.id), true);
  assert.equal(scopeHasProvider("d3adlyrocket", provider.id), false);
  const module = { exports: {} };
  vm.runInNewContext(fs.readFileSync(path.resolve(__dirname, "..", provider.filename), "utf8"), { module }, { timeout: 1000 });
  assert.equal(typeof module.exports.getStreams, "function");
  const info = { title: "Example Movie", year: "2026" };
  const normalized = normalizeStream({
    name: "Example Movie (2026)", title: "1080p English",
    url: "https://example.test/example.mp4"
  }, provider, info);
  assert.equal(test.streamRequiresProbe(normalized), true);
  assert.equal(test.matchesRequestedMedia(normalized, info, { type: "movie" }), true);
  assert.ok(normalized.description.endsWith("Darth Vader - " + expected[provider.id]));
}
const flixnest = registry.scrapers.filter((provider) => provider.id.startsWith("flix_streams_"));
assert.ok(flixnest.length > 0);
for (const provider of flixnest) {
  assert.equal(provider.enabled, false);
  for (const scope of ["flixnest", ...scopes]) assert.equal(scopeHasProvider(scope, provider.id), false);
}
