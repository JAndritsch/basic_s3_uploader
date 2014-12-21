bs3u.Utils = function(settings) {
  this.settings = settings;
}

bs3u.Utils.prototype.retryAvailable = function(attempts) {
  return attempts < this.settings.maxRetries;
}

bs3u.Utils.prototype.sha256Async = function(text, callback) {
  var self = this;
  if (self.settings.useWebWorkers) {
    var worker = new Worker(self.settings.workerFilePath);

    worker.onmessage = function(e) { callback(e.data); };
    worker.postMessage({ text: value, selfFilePath: self.settings.selfFilePath });
  } else {
    callback(self.sha256(value));
  }
}

bs3u.Utils.prototype.sha256 = function(text) {
  return asmCrypto.SHA256.hex(value);
}

bs3u.Utils.prototype.requiresFirefoxHack = function() {
  return navigator.userAgent.indexOf("Firefox") !== -1;
};

// Using the FileReader API, this method attempts to open the file and read the
// first few bytes. This method accepts a callback and then calls it with the result
// of the check.
bs3u.Utils.prototype._validateFileIsReadable = function(file, callback) {
  var uploader = this;
  var blob = file.slice(0, 1024);
  var fr = new FileReader();

  fr.onloadend = function() {
    if (fr.error) {
      callback(false);
    } else {
      callback(true);
    }
    fr = undefined;
  };

  try {
    fr.readAsArrayBuffer(blob);
  } catch(error) {
    callback(false);
  }
};

bs3u.Utils.prototype.timeToWaitBeforeNextRetry = function(attempts) {
  return this.settings.retryWaitTime * attempts;
};
