var Ajax = function(config) {
  this.config     = config;
  this.xhr        = new XMLHttpRequest();
};

Ajax.prototype.onError = function(callback) {
  callback = callback || function() {};
  this.xhr.addEventListener("error", callback, true);
};

Ajax.prototype.onTimeout = function(callback) {
  callback = callback || function() {};
  this.xhr.addEventListener("timeout", callback, true);
};

Ajax.prototype.onLoad = function(callback) {
  callback = callback || function() {};
  this.xhr.addEventListener("load", callback, true);
};

Ajax.prototype.onReadyStateChange = function(callback) {
  callback = callback || function() {};
  this.xhr.addEventListener("readystatechange", callback);
};

Ajax.prototype.onProgress = function(callback) {
  callback = callback || function() {};
  this.xhr.upload.addEventListener("progress", callback);
};

Ajax.prototype.setTimeout = function(timeout) {
  this.xhr.timeout = timeout;
};

Ajax.prototype.buildURL = function(url, params) {
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

Ajax.prototype.setHeaders = function(headers) {
  var ajax = this;
  for (var header in headers) {
    ajax.xhr.setRequestHeader(header, headers[header]);
  }
};

Ajax.prototype.open = function() {
  var url = this.config.url;
  var method = this.config.method;
  this.xhr.open(method, url);
};

Ajax.prototype.send = function(body) {
  var headers = this.config.headers || {};
  var timeout = this.config.timeout || 0;

  this.open();
  this.setHeaders(headers);
  this.setTimeout(timeout);

  if (body) {
    this.xhr.send(body);
  } else {
    this.xhr.send();
 }
};
