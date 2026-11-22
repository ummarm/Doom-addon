"use strict";

const assert = require("node:assert/strict");
const { getStreams } = require("../providers/cncverse");

async function test() {
  const originalFetch = global.fetch;
  const media = "https://example.test/video.mp4";
  const hints = { proxyHeaders: { request: { Referer: "https://example.test/" } } };
  let requested;
  global.fetch = async (url) => {
    requested = new URL(url);
    return Response.json({ streams: [
      { url: media, description: "Audio: Hindi, Tamil\nSubtitles: English", behaviorHints: hints },
      { url: media, description: "Audio: Tamil\nSubtitles: English" },
      { externalUrl: media, description: "Audio: English" },
      { url: "file:///video.mp4", description: "Audio: English" }
    ] });
  };
  try {
    const streams = await getStreams(null, "tv", 3, 4, "tt2531336");
    assert.match(decodeURIComponent(requested.pathname), /\/stream\/series\/tt2531336:3:4\.json$/);
    assert.equal(streams.length, 1);
    assert.equal(streams[0].description, "Audio: Hindi, Tamil");
    assert.deepEqual(streams[0].behaviorHints, hints);
    assert.deepEqual(await getStreams(null, "tv", null, null, "tt2531336"), []);
  } finally {
    global.fetch = originalFetch;
  }
}

test().catch((error) => { console.error(error); process.exitCode = 1; });
