"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const Module = require("node:module");
const path = require("node:path");
const { setTimeout: delay } = require("node:timers/promises");

process.env.QUALITY_TV_FAST_WAIT_MS = "20";
process.env.STREAM_LIVE_FIRST_BATCH_WAIT_MS = "150";
process.env.QUALITY_RESPONSE_WAIT_MS = "200";
process.env.QUALITY_EMPTY_FALLBACK_WAIT_MS = "20";
process.env.STREAM_PROBE_TIMEOUT_MS = "500";

const filename = path.resolve(__dirname, "../addon.js");
const addon = new Module(filename, module);
addon.filename = filename;
addon.paths = Module._nodeModulePaths(path.dirname(filename));
addon._compile(fs.readFileSync(filename, "utf8") +
  "\nmodule.exports.test = { getQualityBandStreams, getSharedMasterBuild };", filename);
const { getQualityBandStreams, getSharedMasterBuild } = addon.exports.test;

async function check() {
  const id = "tmdb:126400";
  const title = "Gangs of Wasseypur - Part 2";
  const good = "https://media.example.test/seekable.mp4";
  const bad = "https://media.example.test/not-seekable.mp4";
  const stream = (url) => ({ url, title: `${title} 2012 1080p` });
  let penguCalls = 0;
  let releaseSlowProbe;
  const slowProbe = new Promise((resolve) => { releaseSlowProbe = resolve; });
  const entries = [
    { id: "pengu", name: "Pengu", getStreams: () => {
      penguCalls++;
      return [stream(good), stream(bad)];
    } },
    { id: "ordinary", name: "Ordinary", getStreams: () => [stream("https://media.example.test/ordinary.mp4")] },
    { id: "torbox", name: "Torbox", getStreams: async () => {
      await delay(90);
      return [stream("https://media.example.test/other.mp4")];
    } }
  ];
  const before = global.fetch;
  const bytes = Buffer.alloc(4096);
  bytes.write("ftyp", 4);
  const ranges = [];
  global.fetch = async (url, options) => {
    if (new URL(url).hostname === "api.themoviedb.org") {
      return Response.json({ title, release_date: "2012-08-08" });
    }
    const range = options.headers.Range;
    const [start, end] = range.match(/\d+/g).map(Number);
    if (url === bad) {
      await slowProbe;
      return new Response(bytes, { status: 200, headers: { "content-type": "video/mp4" } });
    }
    assert.equal(url, good);
    ranges.push(start);
    if (start > 0) await delay(45);
    return new Response(bytes, { status: 206, headers: {
      "content-type": "video/mp4",
      "content-range": `bytes ${start}-${end}/4000000`
    } });
  };
  try {
    const fhd = await getQualityBandStreams("movie", id, entries, "1080");
    assert.equal(fhd.filter((s) => s.behaviorHints.doomProviderId === "pengu").length, 1);
    assert.ok(fhd.some((s) => s.behaviorHints.doomProviderId === "torbox"));
    assert.ok(fhd.some((s) => s.behaviorHints.doomProviderId === "ordinary"));
    assert.ok(fhd.every((s) => s.url !== bad));
    const build = getSharedMasterBuild("movie", id, entries);
    releaseSlowProbe();
    const full = await build.fullPromise;
    assert.equal(full.filter((s) => s.behaviorHints.doomProviderId === "pengu").length, 1);
    assert.ok(full.every((s) => s.url !== bad));
    assert.equal(penguCalls, 1);
    assert.equal(ranges.length, 2);
    assert.ok(ranges[1] > 0);
  } finally {
    releaseSlowProbe();
    global.fetch = before;
  }
}

check().catch((error) => { console.error(error); process.exitCode = 1; });
