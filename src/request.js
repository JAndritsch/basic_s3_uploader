bs3u.Request = function(settings, callbacks) {
  this.settings  = settings;
  this.callbacks = callbacks; // onSuccess, onRetry, onRetriesExhausted
  this.attempts  = 0;
  this.headers   = null;
  this.utils     = new bs3u.Utils(settings);
}

bs3u.Request.prototype.start = function() {
  throw "You need to define this method!";
};

bs3u.Request.prototype.success = function(response) {
  throw "You need to define this method!";
};

// Calls the user-defined backend to grab headers for the call
bs3u.Request.prototype.getHeaders = function(url, params, payload) {
  var self = this;

  self.utils.sha256Async(payload, function(encrypted) {
    params.payload = encrypted

    var ajax = new bs3u.Ajax({
      url: url,
      method: "GET",
      params: params,
      headers: self.settings.customHeaders,
    });

    ajax.onSuccess(function(response) {
      self.headers = JSON.parse(response.target.responseText);
      // Call the start method again after we set headers to the child class
      // can correctly call S3.
      self.start();
    });

    ajax.onError(self._retry);
    ajax.send();
  });
};

// Calls to S3
bs3u.Request.prototype.callS3 = function(url, method, params, body) {
  var self = this;
  var ajax = new bs3u.Ajax({
    url: url,
    method: method,
    params: params,
    headers: self.headers
  });

  ajax.onSuccess(self._success);
  ajax.onError(self._retry);

  if (body) {
    ajax.send(body);
  } else {
    ajax.send();
  }
};

// The success callback for calling S3
bs3u.Request.prototype._success = function(response) {
  if (response.target.status == 200) {
    // Call the success callback defined by the subclass
    this.success(response);
  } else {
    // Call the _retry method defined by this class
    this._retry(response);
  }
};

bs3u.Request.prototype._retry = function(response) {
  var self = this;
  if (self.utils.retryAvailable(self.attempts)) {
    self.attempts += 1;
    setTimeout(function() {
      // Notify caller about retry
      self.callbacks.onRetry(self.attempts, response);
      // Fire the main method again
      self.start();
    }, utils.timeToWaitBeforeNextRetry(self.attempts));
  } else {
    // Notify caller about retries exhausted
    self.callbacks.onRetriesExhausted(response);
  }
};


