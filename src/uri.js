bs3u.URI = function(url) {
  this.parser = document.createElement('a');
  this.parser.href = url;
};

bs3u.URI.prototype.protocol = function() {
  return this.parser.protocol;
};

bs3u.URI.prototype.hostname = function() {
  return this.parser.hostname;
};

bs3u.URI.prototype.port = function() {
  return this.parser.port;
};

bs3u.URI.prototype.pathname = function() {
  return this.parser.pathname;
};

bs3u.URI.prototype.queryString = function() {
  return this.parser.search;
};

bs3u.URI.prototype.hash = function() {
  return this.parser.hash;
};

bs3u.URI.prototype.host = function() {
  return this.parser.host;
};
