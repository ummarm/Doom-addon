'use strict';const _0x49ebe2=_0x5afd;(function(_0x451911,_0x157cdf){const _0x106c1f=_0x5afd,_0x38632f=_0x451911();while(!![]){try{const _0x3f9ff2=parseInt(_0x106c1f(0x210))/0x1*(parseInt(_0x106c1f(0x22f))/0x2)+-parseInt(_0x106c1f(0x1ea))/0x3+-parseInt(_0x106c1f(0x207))/0x4+-parseInt(_0x106c1f(0x1f4))/0x5+-parseInt(_0x106c1f(0x232))/0x6+-parseInt(_0x106c1f(0x1f9))/0x7+parseInt(_0x106c1f(0x233))/0x8;if(_0x3f9ff2===_0x157cdf)break;else _0x38632f['push'](_0x38632f['shift']());}catch(_0x53a023){_0x38632f['push'](_0x38632f['shift']());}}}(_0x5816,0x321f7));function _0x5afd(_0x4770d2,_0x1f59d1){_0x4770d2=_0x4770d2-0x1e9;const _0x581638=_0x5816();let _0x5afdc6=_0x581638[_0x4770d2];if(_0x5afd['VcKFOL']===undefined){var _0x8c2163=function(_0x481fae){const _0x57b898='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x59097c='',_0x2f3ed5='';for(let _0x1f9eed=0x0,_0x264969,_0x2b60ab,_0x57db0=0x0;_0x2b60ab=_0x481fae['charAt'](_0x57db0++);~_0x2b60ab&&(_0x264969=_0x1f9eed%0x4?_0x264969*0x40+_0x2b60ab:_0x2b60ab,_0x1f9eed++%0x4)?_0x59097c+=String['fromCharCode'](0xff&_0x264969>>(-0x2*_0x1f9eed&0x6)):0x0){_0x2b60ab=_0x57b898['indexOf'](_0x2b60ab);}for(let _0x539404=0x0,_0xcc1896=_0x59097c['length'];_0x539404<_0xcc1896;_0x539404++){_0x2f3ed5+='%'+('00'+_0x59097c['charCodeAt'](_0x539404)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x2f3ed5);};_0x5afd['hmAIXb']=_0x8c2163,_0x5afd['lhrVmu']={},_0x5afd['VcKFOL']=!![];}const _0x438f99=_0x581638[0x0],_0x5905bc=_0x4770d2+_0x438f99,_0x431829=_0x5afd['lhrVmu'][_0x5905bc];return!_0x431829?(_0x5afdc6=_0x5afd['hmAIXb'](_0x5afdc6),_0x5afd['lhrVmu'][_0x5905bc]=_0x5afdc6):_0x5afdc6=_0x431829,_0x5afdc6;}var __async=(_0x59097c,_0x2f3ed5,_0x1f9eed)=>{return new Promise((_0x264969,_0x2b60ab)=>{const _0x1791a0=_0x5afd;var _0x57db0=_0x3f83e7=>{const _0x3c4a5a=_0x5afd;try{_0xcc1896(_0x1f9eed[_0x3c4a5a(0x225)](_0x3f83e7));}catch(_0x5f2ae8){_0x2b60ab(_0x5f2ae8);}},_0x539404=_0x3cecc6=>{try{_0xcc1896(_0x1f9eed['throw'](_0x3cecc6));}catch(_0x117f1f){_0x2b60ab(_0x117f1f);}},_0xcc1896=_0x4d5df5=>_0x4d5df5[_0x1791a0(0x218)]?_0x264969(_0x4d5df5[_0x1791a0(0x1fa)]):Promise[_0x1791a0(0x22b)](_0x4d5df5[_0x1791a0(0x1fa)])[_0x1791a0(0x20d)](_0x57db0,_0x539404);_0xcc1896((_0x1f9eed=_0x1f9eed[_0x1791a0(0x1f1)](_0x59097c,_0x2f3ed5))[_0x1791a0(0x225)]());});},WORKER_BASE='https://moviebox.s4nch1tt.workers.dev',TAG=_0x49ebe2(0x22c),cache=new Map(),CACHE_TTL=0x14*0x3c*0x3e8;function getCached(_0x1f2d28){const _0x1232d3=_0x49ebe2,_0x70f0a2=cache[_0x1232d3(0x208)](_0x1f2d28);if(!_0x70f0a2)return void 0x0;if(Date[_0x1232d3(0x1ef)]()-_0x70f0a2['ts']>CACHE_TTL)return cache['delete'](_0x1f2d28),void 0x0;return _0x70f0a2[_0x1232d3(0x21f)];}function setCached(_0x1a33f7,_0x2a80ed){const _0x476b6a=_0x49ebe2;if(cache['size']>0x12c){const _0x472c7d=cache[_0x476b6a(0x1ee)]()[_0x476b6a(0x225)]()[_0x476b6a(0x1fa)];cache[_0x476b6a(0x223)](_0x472c7d);}cache[_0x476b6a(0x20e)](_0x1a33f7,{'val':_0x2a80ed,'ts':Date[_0x476b6a(0x1ef)]()});}function fetchFromWorker(_0x235ff5,_0x3bbc99,_0x5f1be8,_0x517999){return __async(this,null,function*(){const _0x31e1f3=_0x5afd;let _0x2f489c=WORKER_BASE+_0x31e1f3(0x1ed)+encodeURIComponent(_0x235ff5)+_0x31e1f3(0x21e)+encodeURIComponent(_0x3bbc99)+_0x31e1f3(0x222);_0x3bbc99==='tv'&&(_0x2f489c+=_0x31e1f3(0x22e)+(_0x5f1be8||0x1)+_0x31e1f3(0x1fb)+(_0x517999||0x1));console[_0x31e1f3(0x1ec)](TAG+_0x31e1f3(0x227)+_0x2f489c);const _0x5bd0ba=yield fetch(_0x2f489c,{'headers':{'Accept':_0x31e1f3(0x213),'User-Agent':'MurphAddon/4.3'},'signal':AbortSignal[_0x31e1f3(0x20f)](0x3a98)});if(!_0x5bd0ba['ok'])throw new Error(_0x31e1f3(0x1eb)+_0x5bd0ba[_0x31e1f3(0x209)]);const _0x48dc42=yield _0x5bd0ba[_0x31e1f3(0x1e9)]();return Array[_0x31e1f3(0x1f6)](_0x48dc42[_0x31e1f3(0x229)])?_0x48dc42[_0x31e1f3(0x229)]:Array['isArray'](_0x48dc42)?_0x48dc42:[];});}function buildStream(_0xe3f806,_0x3560f5,_0x42b940,_0x3d33ca){const _0x1044e9=_0x49ebe2,_0x3f6581=_0xe3f806['proxy_url']||_0xe3f806['url']||'';if(!_0x3f6581)return null;let _0x33572e=_0x1044e9(0x203);if(_0xe3f806[_0x1044e9(0x1fc)]){const _0x1c13b6=String(_0xe3f806[_0x1044e9(0x1fc)])[_0x1044e9(0x214)](/(\d+)/);_0x33572e=_0x1c13b6?_0x1c13b6[0x1]+'p':String(_0xe3f806[_0x1044e9(0x1fc)]);}let _0x296900='Original';const _0x52cccd=(_0xe3f806[_0x1044e9(0x22d)]||'')[_0x1044e9(0x214)](/\(([^)]+)\)/);if(_0x52cccd)_0x296900=_0x52cccd[0x1];const _0x19618e=_0x1044e9(0x21b)+_0x33572e+'\x20|\x20'+_0x296900,_0x53e568=(_0xe3f806[_0x1044e9(0x215)]||'')[_0x1044e9(0x211)](_0x1044e9(0x21c))[0x0][_0x1044e9(0x211)]('\x20S1')[0x0][_0x1044e9(0x1f5)]();let _0x22a16d='';_0x3560f5&&_0x42b940!=null&&_0x3d33ca!=null&&(_0x22a16d=_0x1044e9(0x216)+String(_0x42b940)[_0x1044e9(0x201)](0x2,'0')+'E'+String(_0x3d33ca)[_0x1044e9(0x201)](0x2,'0'));const _0x209cbd=[];_0x209cbd[_0x1044e9(0x1f8)](_0x53e568+_0x22a16d);let _0x108161=_0x1044e9(0x21d)+_0x33572e+'\x20·\x20🔊\x20'+_0x296900;if(_0xe3f806[_0x1044e9(0x212)])_0x108161+=_0x1044e9(0x20c)+_0xe3f806[_0x1044e9(0x212)];if(_0xe3f806[_0x1044e9(0x226)])_0x108161+=_0x1044e9(0x20a)+_0xe3f806['format']+']';_0x209cbd[_0x1044e9(0x1f8)](_0x108161);if(_0xe3f806[_0x1044e9(0x219)]>0x0){let _0x2571bb=_0x1044e9(0x220)+_0xe3f806[_0x1044e9(0x219)]+'\x20MB';if(_0xe3f806['duration_s'])_0x2571bb+=_0x1044e9(0x221)+Math[_0x1044e9(0x20b)](_0xe3f806[_0x1044e9(0x1ff)]/0x3c)+_0x1044e9(0x231);_0x209cbd[_0x1044e9(0x1f8)](_0x2571bb);}return _0x209cbd[_0x1044e9(0x1f8)](_0x1044e9(0x230)),{'name':_0x19618e,'title':_0x209cbd[_0x1044e9(0x200)]('\x0a'),'url':_0x3f6581,'behaviorHints':{'notWebReady':![],'bingeGroup':_0x1044e9(0x202)},'isMovieBoxDirect':!![]};}function getStreams(_0x3ebada,_0x274334,_0x307301,_0x521fee){return __async(this,null,function*(){const _0x256b0a=_0x5afd,_0x5326ab=_0x274334==='tv'||_0x274334===_0x256b0a(0x1fd),_0x39baca=_0x5326ab?_0x307301||0x1:null,_0x5bba1d=_0x5326ab?_0x521fee||0x1:null,_0x458b89='mb::v2::'+_0x3ebada+'::'+_0x274334+'::'+_0x39baca+'::'+_0x5bba1d,_0x2e7a9d=getCached(_0x458b89);if(_0x2e7a9d)return console[_0x256b0a(0x1ec)](TAG+'\x20Cache\x20HIT\x20→\x20'+_0x2e7a9d[_0x256b0a(0x228)]+_0x256b0a(0x1fe)),_0x2e7a9d;console[_0x256b0a(0x1ec)](TAG+'\x20▶\x20'+_0x3ebada+'\x20'+_0x274334+(_0x5326ab?'\x20S'+_0x39baca+'E'+_0x5bba1d:''));try{const _0x5c87ca=yield fetchFromWorker(_0x3ebada,_0x274334,_0x39baca,_0x5bba1d);if(!_0x5c87ca['length'])return console[_0x256b0a(0x1ec)](TAG+_0x256b0a(0x205)),[];const _0x20ee49=_0x5c87ca[_0x256b0a(0x1f2)](_0x27dc38=>buildStream(_0x27dc38,_0x5326ab,_0x39baca,_0x5bba1d))[_0x256b0a(0x22a)](Boolean),_0x55b26c=_0x2c96a4=>{const _0x4aef5e=_0x256b0a,_0x5f79cf=_0x2c96a4['toLowerCase']()['trim']();if(_0x5f79cf==='original')return 0x0;if(_0x5f79cf==='hindi\x20dub'||_0x5f79cf===_0x4aef5e(0x224))return 0x1;return 0x2;};return _0x20ee49[_0x256b0a(0x1f7)]((_0x2b7b93,_0x1a48b5)=>{const _0x4d9d83=_0x256b0a;var _0x29a929,_0x27602b;const _0x53f48c=(_0x2b7b93[_0x4d9d83(0x22d)][_0x4d9d83(0x211)]('|')['pop']()||'')[_0x4d9d83(0x1f5)](),_0x2acb5c=(_0x1a48b5['name'][_0x4d9d83(0x211)]('|')[_0x4d9d83(0x217)]()||'')[_0x4d9d83(0x1f5)](),_0x40170a=_0x55b26c(_0x53f48c),_0x3dd1cb=_0x55b26c(_0x2acb5c);if(_0x40170a!==_0x3dd1cb)return _0x40170a-_0x3dd1cb;const _0x296732=parseInt(((_0x29a929=_0x2b7b93[_0x4d9d83(0x22d)][_0x4d9d83(0x214)](/\d+p/))==null?void 0x0:_0x29a929[0x0])||0x0),_0x43227f=parseInt(((_0x27602b=_0x1a48b5[_0x4d9d83(0x22d)][_0x4d9d83(0x214)](/\d+p/))==null?void 0x0:_0x27602b[0x0])||0x0);if(_0x43227f!==_0x296732)return _0x43227f-_0x296732;return _0x53f48c[_0x4d9d83(0x1f3)](_0x2acb5c);}),console[_0x256b0a(0x1ec)](TAG+'\x20✔\x20'+_0x20ee49[_0x256b0a(0x228)]+_0x256b0a(0x234)),setCached(_0x458b89,_0x20ee49),_0x20ee49;}catch(_0xed17e9){return console[_0x256b0a(0x21a)](TAG+_0x256b0a(0x206)+_0xed17e9[_0x256b0a(0x204)]),[];}});}function _0x5816(){const _0x4b3186=['Bw92AwvIB3G','qxv0BW','BwvZC2fNzq','ie5Vihn0CMvHBxmGCMv0DxjUzwq','ievYCM9YoIa','nZi5mJeYy3noB0DO','z2v0','C3rHDhvZ','imk3ifS','CM91BMq','imk3ipcFJP4G','DgHLBG','C2v0','DgLTzw91Da','muXezLLVqG','C3bSAxq','y29Kzwm','yxbWBgLJyxrPB24VANnVBG','Bwf0y2G','DgL0Bgu','imk3ifm','Cg9W','zg9Uzq','C2L6zv9TyG','zxjYB3i','8j+tPsbnB3zPzujVEcb8ia','ifmW','8j+oPsa','jNr5Cgu9','DMfS','8j+sVIa','imk3iokpSsa','jMXHBMC9ywXS','zgvSzxrL','AgLUzgK','BMv4Da','zM9YBwf0','ifDVCMTLCIdIHPiG','BgvUz3rO','C3rYzwfTCW','zMLSDgvY','CMvZB2X2zq','w01VDMLLqM94xq','BMfTzq','jNnLpq','mZC1mZuYuxbjwfvR','qNKGtxvYCgGGu3rYzwfTCYdIMQe','ig1PBG','mJiYntC4nfPdC2z2wa','oti5mJyWmgXgAxPPuW','ihn0CMvHBxmGCMvHzhK','ANnVBG','nduWmZi3txnzqxP3','v29YA2vYieHuvfaG','Bg9N','l3n0CMvHBxm/Dg1KyL9Pzd0','A2v5CW','BM93','zxHWB3j0CW','yxbWBhK','BwfW','Bg9JywXLq29TCgfYzq','mti3oti1mgLMrLj5tG','DhjPBq','AxnbCNjHEq','C29YDa','ChvZAa','mti5mZa1neDjwLHWvW','DMfSDwu','jMvWpq','CMvZB2X1DgLVBG','C2vYAwvZ','ihn0CMvHBxm','zhvYyxrPB25FCW','AM9PBG','CgfKu3rHCNq'];_0x5816=function(){return _0x4b3186;};return _0x5816();}module[_0x49ebe2(0x1f0)]={'getStreams':getStreams};

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
