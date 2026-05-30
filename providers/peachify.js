var _0xa6ba51=_0x5505;function _0x5505(_0xcf8c9a,_0x2b3d0f){_0xcf8c9a=_0xcf8c9a-0xa8;var _0x52bd8b=_0x52bd();var _0x550542=_0x52bd8b[_0xcf8c9a];if(_0x5505['jFkxsI']===undefined){var _0x5d2a10=function(_0x114dcc){var _0x15db41='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var _0x583fc6='',_0x230050='';for(var _0x42274d=0x0,_0x45373a,_0x7430c3,_0x24d51c=0x0;_0x7430c3=_0x114dcc['charAt'](_0x24d51c++);~_0x7430c3&&(_0x45373a=_0x42274d%0x4?_0x45373a*0x40+_0x7430c3:_0x7430c3,_0x42274d++%0x4)?_0x583fc6+=String['fromCharCode'](0xff&_0x45373a>>(-0x2*_0x42274d&0x6)):0x0){_0x7430c3=_0x15db41['indexOf'](_0x7430c3);}for(var _0x236749=0x0,_0x539507=_0x583fc6['length'];_0x236749<_0x539507;_0x236749++){_0x230050+='%'+('00'+_0x583fc6['charCodeAt'](_0x236749)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x230050);};_0x5505['ckddPI']=_0x5d2a10,_0x5505['fOsaXx']={},_0x5505['jFkxsI']=!![];}var _0x5d5b2a=_0x52bd8b[0x0],_0x48ebba=_0xcf8c9a+_0x5d5b2a,_0x1b73fc=_0x5505['fOsaXx'][_0x48ebba];return!_0x1b73fc?(_0x550542=_0x5505['ckddPI'](_0x550542),_0x5505['fOsaXx'][_0x48ebba]=_0x550542):_0x550542=_0x1b73fc,_0x550542;}(function(_0x10c647,_0x160f72){var _0x523ec1=_0x5505,_0x540528=_0x10c647();while(!![]){try{var _0x139830=-parseInt(_0x523ec1(0xbe))/0x1+parseInt(_0x523ec1(0xa8))/0x2+parseInt(_0x523ec1(0xc3))/0x3*(-parseInt(_0x523ec1(0xab))/0x4)+parseInt(_0x523ec1(0xb3))/0x5+-parseInt(_0x523ec1(0xbf))/0x6+parseInt(_0x523ec1(0xb1))/0x7+-parseInt(_0x523ec1(0xc6))/0x8*(parseInt(_0x523ec1(0xbc))/0x9);if(_0x139830===_0x160f72)break;else _0x540528['push'](_0x540528['shift']());}catch(_0x54bf36){_0x540528['push'](_0x540528['shift']());}}}(_0x52bd,0xe20c7));var __async=(_0x583fc6,_0x230050,_0x42274d)=>{return new Promise((_0x45373a,_0x7430c3)=>{var _0x4399a2=_0x5505,_0x24d51c=_0x590f4f=>{try{_0x539507(_0x42274d['next'](_0x590f4f));}catch(_0x3b2e45){_0x7430c3(_0x3b2e45);}},_0x236749=_0x4a905e=>{var _0x2b2861=_0x5505;try{_0x539507(_0x42274d[_0x2b2861(0xba)](_0x4a905e));}catch(_0x1973df){_0x7430c3(_0x1973df);}},_0x539507=_0x2db862=>_0x2db862[_0x4399a2(0xc5)]?_0x45373a(_0x2db862[_0x4399a2(0xb4)]):Promise[_0x4399a2(0xaf)](_0x2db862[_0x4399a2(0xb4)])[_0x4399a2(0xc7)](_0x24d51c,_0x236749);_0x539507((_0x42274d=_0x42274d[_0x4399a2(0xac)](_0x583fc6,_0x230050))[_0x4399a2(0xb6)]());});},PROVIDER_NAME=_0xa6ba51(0xaa),BACKEND_URL='https://piratezoro9-testingphase.hf.space',API_KEY='Shikari@95';function getStreams(_0x129f54,_0x5e083c,_0x1adeb9,_0x5b8b52){return __async(this,null,function*(){var _0x2db0b3=_0x5505;try{console['log']('['+PROVIDER_NAME+_0x2db0b3(0xb2)+_0x129f54);const _0x1591b9={'site':_0x2db0b3(0xca),'tmdb_id':String(_0x129f54),'type':_0x5e083c==='tv'||_0x5e083c===_0x2db0b3(0xc4)?'series':_0x2db0b3(0xc2),'season':_0x1adeb9?parseInt(_0x1adeb9):0x0,'episode':_0x5b8b52?parseInt(_0x5b8b52):0x0},_0x37e686=yield fetch(BACKEND_URL+_0x2db0b3(0xc0),{'method':_0x2db0b3(0xb8),'headers':{'Content-Type':_0x2db0b3(0xae),'x-api-key':API_KEY},'body':JSON['stringify'](_0x1591b9)});if(!_0x37e686['ok'])return console['log']('['+PROVIDER_NAME+']\x20Backend\x20error:\x20'+_0x37e686[_0x2db0b3(0xb5)]),[];const _0x5c444f=yield _0x37e686[_0x2db0b3(0xb9)]();if(_0x5c444f[_0x2db0b3(0xad)]&&_0x5c444f['streams'])return console[_0x2db0b3(0xc8)]('['+PROVIDER_NAME+_0x2db0b3(0xbb)+_0x5c444f[_0x2db0b3(0xb0)][_0x2db0b3(0xbd)]+'\x20streams.'),_0x5c444f[_0x2db0b3(0xb0)];return[];}catch(_0x1dd172){return console['log']('['+PROVIDER_NAME+_0x2db0b3(0xa9)+_0x1dd172[_0x2db0b3(0xb7)]),[];}});}typeof module!=='undefined'&&module[_0xa6ba51(0xc9)]?module[_0xa6ba51(0xc9)]={'getStreams':getStreams}:global[_0xa6ba51(0xc1)]=getStreams;function _0x52bd(){var _0x17588f=['yxbWBgLJyxrPB24VANnVBG','CMvZB2X2zq','C3rYzwfTCW','ntm5ndKZnxLJwK5uBG','xsbgzxrJAgLUzYbMCM9TigjHy2TLBMqGzM9YifrnreiGsuq6ia','mZu4nJe2nu9nzhf3EG','DMfSDwu','C3rHDhvZ','BMv4Da','BwvZC2fNzq','ue9tva','ANnVBG','DgHYB3C','xsbcywnRzw5KihjLDhvYBMvKia','mte5odC5mtLmzhHItKC','BgvUz3rO','mtm2mJjhCu9que0','mte1mty0C2PUyMjt','l2v4DhjHy3q','z2v0u3rYzwfTCW','Bw92Awu','m0j4teT4qq','C2vYAwvZ','zg9Uzq','ogD3Bw5XDa','DgHLBG','Bg9N','zxHWB3j0CW','CgvHy2HPzNK','mZyWnta3nfjkq0vJEq','xsbgzxrJAcbMywLSzwq6ia','ugvHy2HPzNK','mZK5ota5mLvVv2npAG','yxbWBhK','C3vJy2vZCW'];_0x52bd=function(){return _0x17588f;};return _0x52bd();}

// __DOOM_SEEKABLE_VALIDATION__
var __doomProbeCache = Object.create(null);
var __doomProbeCacheTtlMs = 10 * 60 * 1000;
var __doomProbeTimeoutMs = 6 * 1000;

function __doomMergeHeaders(base, extra) {
  var merged = {};
  var key;
  for (key in base || {}) merged[key] = base[key];
  for (key in extra || {}) merged[key] = extra[key];
  return merged;
}

function __doomWithTimeout(promise, timeoutMs) {
  return new Promise(function(resolve, reject) {
    var settled = false;
    var timer = setTimeout(function() {
      if (settled) return;
      settled = true;
      reject(new Error("timeout"));
    }, timeoutMs);

    Promise.resolve(promise).then(function(value) {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve(value);
    }, function(error) {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      reject(error);
    });
  });
}

function __doomLooksLikeHls(url, contentType) {
  var normalizedUrl = String(url || "").toLowerCase();
  var normalizedType = String(contentType || "").toLowerCase();
  return normalizedUrl.indexOf(".m3u8") !== -1
    || normalizedType.indexOf("mpegurl") !== -1
    || normalizedType.indexOf("application/x-mpegurl") !== -1
    || normalizedType.indexOf("vnd.apple.mpegurl") !== -1;
}

function __doomBuildProbeCacheKey(stream) {
  var headers = stream && stream.headers ? stream.headers : {};
  return [
    stream && stream.url ? stream.url : "",
    headers.Referer || headers.referer || "",
    headers.Origin || headers.origin || ""
  ].join("|");
}

function __doomGetCachedProbeResult(cacheKey) {
  var entry = __doomProbeCache[cacheKey];
  if (!entry) return null;
  if (Date.now() - entry.timestamp > __doomProbeCacheTtlMs) {
    delete __doomProbeCache[cacheKey];
    return null;
  }
  return entry.ok;
}

function __doomSetCachedProbeResult(cacheKey, ok) {
  __doomProbeCache[cacheKey] = {
    ok: !!ok,
    timestamp: Date.now()
  };
}

function __doomResponseIsSeekable(response, url) {
  if (!response || !response.ok) return false;
  var headers = response.headers;
  var contentType = headers && headers.get ? headers.get("content-type") || "" : "";
  if (__doomLooksLikeHls(url, contentType)) return true;
  var acceptRanges = headers && headers.get ? headers.get("accept-ranges") || "" : "";
  var contentRange = headers && headers.get ? headers.get("content-range") || "" : "";
  return response.status === 206
    || /bytes/i.test(acceptRanges)
    || /^bytes\s+/i.test(contentRange);
}

function __doomProbeStream(stream) {
  if (!stream || !stream.url || typeof fetch !== "function") {
    return Promise.resolve(false);
  }

  var cacheKey = __doomBuildProbeCacheKey(stream);
  var cached = __doomGetCachedProbeResult(cacheKey);
  if (cached !== null) {
    return Promise.resolve(cached);
  }

  var url = stream.url;
  var isHls = __doomLooksLikeHls(url, "");
  var baseHeaders = __doomMergeHeaders({}, stream.headers || {});
  var rangedHeaders = __doomMergeHeaders({}, baseHeaders);
  if (!isHls && !rangedHeaders.Range && !rangedHeaders.range) {
    rangedHeaders.Range = "bytes=0-1";
  }

  var attempts = [
    { method: "GET", headers: isHls ? baseHeaders : rangedHeaders, redirect: "follow" },
    { method: "HEAD", headers: baseHeaders, redirect: "follow" }
  ];

  function tryAttempt(index) {
    if (index >= attempts.length) return Promise.resolve(false);
    return __doomWithTimeout(fetch(url, attempts[index]), __doomProbeTimeoutMs)
      .then(function(response) {
        if (__doomResponseIsSeekable(response, url)) return true;
        return tryAttempt(index + 1);
      })
      .catch(function() {
        return tryAttempt(index + 1);
      });
  }

  return tryAttempt(0).then(function(ok) {
    __doomSetCachedProbeResult(cacheKey, ok);
    return ok;
  });
}

function __doomFilterSeekableStreams(streams, providerLabel) {
  if (!Array.isArray(streams) || streams.length === 0) {
    return Promise.resolve([]);
  }

  return Promise.all(streams.map(function(stream) {
    return __doomProbeStream(stream)
      .then(function(ok) { return { stream: stream, ok: ok }; })
      .catch(function() { return { stream: stream, ok: false }; });
  })).then(function(results) {
    var filtered = results.filter(function(item) { return item.ok; }).map(function(item) { return item.stream; });
    var label = providerLabel || "[Doom-addon]";
    if (filtered.length === 0) {
      console.log(label + " Seekable filter kept 0/" + streams.length + " streams; returning original streams as fallback");
      return streams;
    }
    console.log(label + " Seekable filter kept " + filtered.length + "/" + streams.length + " streams");
    return filtered;
  });
}

(function() {
  if (typeof getStreams !== "function" || getStreams.__doomSeekableWrapped) {
    return;
  }

  var __doomOriginalGetStreams = getStreams;
  var __doomProviderLabel = typeof PLUGIN_TAG !== "undefined"
    ? PLUGIN_TAG
    : (typeof TAG !== "undefined" ? TAG : "[Doom-addon]");

  var __doomWrappedGetStreams = function() {
    return Promise.resolve(__doomOriginalGetStreams.apply(this, arguments))
      .then(function(streams) {
        return __doomFilterSeekableStreams(streams, __doomProviderLabel);
      })
      .catch(function(error) {
        var message = error && error.message ? error.message : String(error);
        console.error(__doomProviderLabel + " Seekable validation failed: " + message);
        return [];
      });
  };

  __doomWrappedGetStreams.__doomSeekableWrapped = true;
  getStreams = __doomWrappedGetStreams;

  if (typeof module !== "undefined" && module.exports) {
    module.exports.getStreams = getStreams;
  } else if (typeof global !== "undefined") {
    global.getStreams = getStreams;
  }
})();

// __DOOM_STREAM_NORMALIZATION__
function __doomNormalizeHeaders(headers) {
  if (!headers || typeof headers !== "object") return null;
  var normalized = {};
  var key;
  for (key in headers) {
    if (headers[key] !== undefined && headers[key] !== null && headers[key] !== "") {
      normalized[key] = String(headers[key]);
    }
  }
  return Object.keys(normalized).length ? normalized : null;
}

function __doomLooksWebReady(url) {
  var normalized = String(url || "").toLowerCase();
  return normalized.indexOf("https://") === 0
    && (normalized.indexOf(".mp4") !== -1 || normalized.indexOf("format=mp4") !== -1);
}

function __doomNormalizeStream(rawStream) {
  if (!rawStream || typeof rawStream !== "object") return null;
  var targetUrl = rawStream.url || rawStream.externalUrl;
  if (!targetUrl || typeof targetUrl !== "string") return null;

  var requestHeaders = __doomNormalizeHeaders(rawStream.headers);
  var behaviorHints = {};
  var key;
  for (key in rawStream.behaviorHints || {}) behaviorHints[key] = rawStream.behaviorHints[key];

  if (rawStream.fileName && !behaviorHints.filename) behaviorHints.filename = rawStream.fileName;
  if (typeof rawStream.size === "number" && rawStream.size > 0 && !behaviorHints.videoSize) {
    behaviorHints.videoSize = rawStream.size;
  }
  if (typeof rawStream.videoSize === "number" && rawStream.videoSize > 0 && !behaviorHints.videoSize) {
    behaviorHints.videoSize = rawStream.videoSize;
  }
  if (!behaviorHints.bingeGroup) {
    var providerId = typeof PLUGIN_TAG !== "undefined" ? PLUGIN_TAG : (typeof TAG !== "undefined" ? TAG : "doom-addon");
    behaviorHints.bingeGroup = String(providerId).replace(/[^a-z0-9]+/gi, "-").toLowerCase();
  }
  if (!__doomLooksWebReady(targetUrl) || requestHeaders) behaviorHints.notWebReady = true;
  if (requestHeaders) behaviorHints.proxyHeaders = { request: requestHeaders };

  var description = rawStream.description || rawStream.title || rawStream.name || "Doom-addon stream";
  return {
    name: rawStream.name || "Doom-addon",
    title: description,
    description: description,
    url: targetUrl,
    behaviorHints: behaviorHints
  };
}

(function() {
  if (typeof getStreams !== "function" || getStreams.__doomNormalizedWrapped) return;

  var __doomOriginalGetStreamsForNormalization = getStreams;
  var __doomNormalizedGetStreams = function() {
    return Promise.resolve(__doomOriginalGetStreamsForNormalization.apply(this, arguments))
      .then(function(streams) {
        if (!Array.isArray(streams)) return [];
        return streams.map(__doomNormalizeStream).filter(Boolean);
      });
  };

  __doomNormalizedGetStreams.__doomNormalizedWrapped = true;
  getStreams = __doomNormalizedGetStreams;

  if (typeof module !== "undefined" && module.exports) {
    module.exports.getStreams = getStreams;
  } else if (typeof global !== "undefined") {
    global.getStreams = getStreams;
  }
})();
