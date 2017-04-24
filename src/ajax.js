bs3u.Ajax = function(config) {
  this.config = config;
  this.xhr    = new XMLHttpRequest();
};

bs3u.Ajax.prototype.onError = function(callback) {
  callback = callback || function() {};
  this.xhr.addEventListener("error", callback, true);
};

bs3u.Ajax.prototype.onTimeout = function(callback) {
  callback = callback || function() {};
  this.xhr.addEventListener("timeout", callback, true);
};

bs3u.Ajax.prototype.onSuccess = function(callback) {
  callback = callback || function() {};
  this.xhr.addEventListener("load", callback, true);
};

bs3u.Ajax.prototype.onReadyStateChange = function(callback) {
  callback = callback || function() {};
  this.xhr.addEventListener("readystatechange", callback);
};

bs3u.Ajax.prototype.onProgress = function(callback) {
  callback = callback || function() {};
  this.xhr.upload.addEventListener("progress", callback);
};

bs3u.Ajax.prototype.setTimeout = function(timeout) {
  this.xhr.timeout = timeout;
};

bs3u.Ajax.prototype.buildURL = function(url, params) {
  if (params) {
    for (var name in params) {

      if (url.indexOf('?') !== -1) {
        url += "&";
      } else {
        url += "?";
      }

      url += encodeURIComponent(name) + "=";
      url += encodeURIComponent(params[name]);
    }
  }
  return url;
};

bs3u.Ajax.prototype.setHeaders = function(headers) {
  var ajax = this;
  ajax.headers = headers;
  for (var header in headers) {
    ajax.xhr.setRequestHeader(header, headers[header]);
  }
};

bs3u.Ajax.prototype.open = function() {
  var url = this.config.url;
  var method = this.config.method || "GET";
  var params = this.config.params || {};

  url = this.buildURL(url, params);

  this.url = url;
  this.method = method;
  
  this.xhr.open(method, url);
};

bs3u.Ajax.prototype.send = function(body) {
  var headers = this.config.headers || {};
  var timeout = this.config.timeout || bs3u.constants.FIFTEEN_MINUTES;

  this.open();
  this.setHeaders(headers);
  this.setTimeout(timeout);

  this.body = body;

  if (body) {
    this.xhr.send(body);
  } else {
    this.xhr.send();
 }
};

bs3u.Ajax.prototype.abort = function() {
  this.xhr.abort();
};
