"use strict";

const assert = require("node:assert/strict");
const { addonManifests, getCatalog } = require("../addon");

async function check() {
  const { catalogs } = addonManifests.live;
  assert.ok(catalogs.some((catalog) => catalog.type === "tv"));
  assert.ok(catalogs.some((catalog) => catalog.type === "sport"));
  assert.ok(catalogs.every((catalog) => !catalog.extra?.some(({ name }) => name === "search")));
  assert.ok(addonManifests.dramas.catalogs[0].extra.some(({ name }) => name === "search"));

  const fetchBefore = global.fetch;
  const browsed = [];
  const payload = { metas: [{ id: "example" }] };
  global.fetch = async (url) => {
    browsed.push(decodeURIComponent(new URL(url).pathname));
    return Response.json(payload);
  };
  try {
    assert.deepEqual(await getCatalog("live", "tv", "nuvio_sports_football", "search=football"), { metas: [] });
    assert.deepEqual(await getCatalog("live", "sport", "sports_football", "skip=10&search=football"), { metas: [] });
    assert.deepEqual(browsed, []);
    assert.deepEqual(await getCatalog("live", "tv", "nuvio_sports_football"), payload);
    assert.deepEqual(await getCatalog("live", "sport", "sports_football", "skip=10"), payload);
    assert.match(browsed[0], /\/catalog\/tv\/nuvio_sports_football\.json$/);
    assert.match(browsed[1], /\/catalog\/sport\/sports_football\/skip=10\.json$/);
  } finally {
    global.fetch = fetchBefore;
  }
}

check().catch((error) => { console.error(error); process.exitCode = 1; });
