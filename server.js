"use strict";

const http = require("http");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const { Readable } = require("stream");
const { manifest, addonManifests, getStreams, scopeHasProvider } = require("./addon");

const PORT = Number(process.env.PORT || 7000);
const HOST = process.env.HOST || "0.0.0.0";
const ASSETS_DIR = path.join(__dirname, "assets");
const AIO_PROXY_TTL_MS = Number(process.env.AIO_PROXY_TTL_MS || 30 * 60 * 1000);
const aioProxyUrls = new Map();

function sendJson(response, statusCode, payload, cacheSeconds = 0) {
  const body = JSON.stringify(payload);
  response.writeHead(statusCode, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": cacheSeconds > 0 ? `public, max-age=${cacheSeconds}` : "no-store",
    "Content-Length": Buffer.byteLength(body)
  });
  response.end(body);
}

function sendText(response, statusCode, text) {
  response.writeHead(statusCode, {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "text/plain; charset=utf-8",
    "Content-Length": Buffer.byteLength(text)
  });
  response.end(text);
}

function sendFile(response, statusCode, filePath, contentType, cacheSeconds = 0) {
  const body = fs.readFileSync(filePath);
  response.writeHead(statusCode, {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": contentType,
    "Cache-Control": cacheSeconds > 0 ? `public, max-age=${cacheSeconds}` : "no-store",
    "Content-Length": body.length
  });
  response.end(body);
}

function parseStreamPath(pathname) {
  const match = pathname.match(/^\/(?:addons\/([^/]+)\/)?stream\/([^/]+)\/(.+)\.json$/);
  if (!match) {
    return null;
  }

  return {
    scope: match[1] ? decodeURIComponent(match[1]) : "main",
    type: decodeURIComponent(match[2]),
    id: decodeURIComponent(match[3])
  };
}

function parseAddonManifestPath(pathname) {
  const match = pathname.match(/^\/addons\/([^/]+)\/manifest\.json$/);
  return match ? decodeURIComponent(match[1]) : null;
}

function parseAioProxyPath(pathname) {
  const match = pathname.match(/^\/aio-proxy\/([^/]+)$/);
  return match ? decodeURIComponent(match[1]) : null;
}

function cleanupAioProxyUrls() {
  const now = Date.now();
  for (const [token, entry] of aioProxyUrls) {
    if (!entry || entry.expiresAt <= now) {
      aioProxyUrls.delete(token);
    }
  }
}

function isAioPlaybackUrl(value) {
  try {
    const parsed = new URL(String(value || ""));
    return parsed.protocol === "https:"
      && parsed.hostname === "aiostreams.elfhosted.com"
      && parsed.pathname.startsWith("/playback/");
  } catch {
    return false;
  }
}

function rememberAioProxyUrl(rawUrl) {
  cleanupAioProxyUrls();
  const token = crypto.createHash("sha256").update(rawUrl).digest("base64url").slice(0, 32);
  aioProxyUrls.set(token, {
    url: rawUrl,
    expiresAt: Date.now() + AIO_PROXY_TTL_MS
  });
  return token;
}

function proxyAioStreams(streams, origin) {
  if (!Array.isArray(streams) || streams.length === 0) {
    return streams;
  }

  return streams.map((stream) => {
    if (!stream || typeof stream !== "object" || !isAioPlaybackUrl(stream.url)) {
      return stream;
    }

    const token = rememberAioProxyUrl(stream.url);
    return Object.assign({}, stream, {
      url: `${origin}/aio-proxy/${encodeURIComponent(token)}`
    });
  });
}

function aioProxyHeaders(request) {
  const headers = {};
  for (const name of ["accept", "accept-language", "range", "if-range"]) {
    if (request.headers[name]) {
      headers[name] = request.headers[name];
    }
  }
  headers["user-agent"] = process.env.AIO_PROXY_USER_AGENT || "Doom-addon/1.0";
  return headers;
}

async function handleAioProxy(request, response, token) {
  cleanupAioProxyUrls();
  const entry = aioProxyUrls.get(token);
  if (!entry) {
    sendJson(response, 410, { error: "AIO playback URL expired" });
    return;
  }

  const upstream = await fetch(entry.url, {
    headers: aioProxyHeaders(request),
    redirect: "follow"
  });

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Cache-Control": "no-store"
  };
  for (const name of ["content-type", "content-length", "accept-ranges", "content-range", "etag", "last-modified"]) {
    const value = upstream.headers.get(name);
    if (value) {
      headers[name] = value;
    }
  }

  response.writeHead(upstream.status, headers);
  if (!upstream.body) {
    response.end();
    return;
  }

  Readable.fromWeb(upstream.body).pipe(response);
}

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);

    if (request.method === "OPTIONS") {
      response.writeHead(204, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS"
      });
      response.end();
      return;
    }

    if (request.method !== "GET") {
      sendJson(response, 405, { error: "Method not allowed" });
      return;
    }

    const aioProxyToken = parseAioProxyPath(url.pathname);
    if (aioProxyToken) {
      await handleAioProxy(request, response, aioProxyToken);
      return;
    }

    if (url.pathname === "/" || url.pathname === "/health") {
      sendText(
        response,
        200,
        [
          "Doom-addon Stremio add-on is running.",
          `Install URL: ${url.origin}/manifest.json`,
          `Umbrella M: ${url.origin}/addons/murph/manifest.json`,
          `Umbrella Y: ${url.origin}/addons/yoruix/manifest.json`,
          `Umbrella D: ${url.origin}/addons/d3adlyrocket/manifest.json`,
          `Umbrella F: ${url.origin}/addons/flixnest/manifest.json`,
          `Umbrella MF: ${url.origin}/addons/mediafusion/manifest.json`,
          `Umbrella AIO: ${url.origin}/addons/aiostreams/manifest.json`,
          `Umbrella 4K: ${url.origin}/addons/quality-4k/manifest.json`,
          `Umbrella 1080: ${url.origin}/addons/quality-1080/manifest.json`,
          `Umbrella Low: ${url.origin}/addons/quality-low/manifest.json`,
          ""
        ].join("\n")
      );
      return;
    }

    if (url.pathname === "/assets/umbrella-icon.png") {
      sendFile(response, 200, path.join(ASSETS_DIR, "umbrella-icon.png"), "image/png", 86400);
      return;
    }

    if (url.pathname === "/manifest.json") {
      sendJson(response, 200, manifest, 3600);
      return;
    }

    const addonManifestScope = parseAddonManifestPath(url.pathname);
    if (addonManifestScope) {
      const scopedManifest = addonManifests[addonManifestScope];
      if (!scopedManifest) {
        sendJson(response, 404, { error: "Add-on group not found" });
        return;
      }
      sendJson(response, 200, scopedManifest, 3600);
      return;
    }

    const streamRequest = parseStreamPath(url.pathname);
    if (streamRequest) {
      const streams = await getStreams(streamRequest.type, streamRequest.id, { scope: streamRequest.scope });
      if (!streams) {
        sendJson(response, 404, { error: "Add-on group not found" });
        return;
      }
      const cacheSeconds = scopeHasProvider(streamRequest.scope, "aiostreams") ? 0 : 300;
      const responseStreams = scopeHasProvider(streamRequest.scope, "aiostreams")
        ? proxyAioStreams(streams, url.origin)
        : streams;
      sendJson(response, 200, { streams: responseStreams }, cacheSeconds);
      return;
    }

    sendJson(response, 404, { error: "Not found" });
  } catch (error) {
    console.error(error);
    sendJson(response, 500, { error: "Internal server error" });
  }
});

server.listen(PORT, HOST, () => {
  const displayHost = HOST === "0.0.0.0" ? "localhost" : HOST;
  console.log(`Doom-addon Stremio add-on listening on http://${displayHost}:${PORT}`);
});
