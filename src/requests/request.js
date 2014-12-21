// The base class for sending requests to the signature and S3 APIs. All requests
// should inherit from this.
bs3u.Request = function(settings, callbacks) {
  this.settings  = settings;
  this.callbacks = callbacks; // onSuccess, onRetry, onRetriesExhausted, onProgress
  this.attempts  = 0;
  this.headers   = null;
  this.utils     = new bs3u.Utils(settings);
  this.xhrs      = [];
};

// public

// The main method to invoke. Requires the caller to have defined the 'callS3',
// 'getHeaders', and 'success' methods.
bs3u.Request.prototype.start = function() {
  if (this.headers) {
    this.callS3();
  } else {
    this.getHeaders();
  }
};

bs3u.Request.prototype.stop = function() {
  var self = this;

  var ajax;
  for (var index in self.xhrs) {
    ajax = self.xhrs[index];
    ajax.abort();
    ajax = undefined;
  }
  self.xhrs = [];
};

// private

// Calls the user-defined backend to grab headers for the S3 request
bs3u.Request.prototype._getHeaders = function(url, params, payload) {
  var self = this;

  self.utils.sha256Async(payload, function(encrypted) {
    params.payload = encrypted;

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

    ajax.onError(function(response) { self._retry(response); });
    ajax.send();
    self.xhrs.push(ajax);
  });
};

// Sends the request to S3. Requires self.headers to be defined correctly.
bs3u.Request.prototype._callS3 = function(url, method, params, body) {
  var self = this;
  var ajax = new bs3u.Ajax({
    url: url,
    method: method,
    params: params,
    headers: self.headers
  });

  ajax.onSuccess(function(response) { self._success(response); });
  ajax.onError(function(response) { self._retry(response); });

  if (self.callbacks.onProgress) {
    ajax.onProgress(function(response) { self.callbacks.onProgress(response); });
  }

  if (body) {
    ajax.send(body);
  } else {
    ajax.send();
  }
  self.xhrs.push(ajax);
};

// The success callback for calling S3. Any non-200 response should trigger a
// retry.
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
    // Increment the attempts
    self.attempts += 1;

    setTimeout(function() {
      // Notify caller about retry
      self.callbacks.onRetry(self.attempts, response);
      // Fire the main method again
      self.start();
      // Make sure to wait a bit before retry.
    }, self.utils.timeToWaitBeforeNextRetry(self.attempts));

  } else {
    // Notify caller about retries exhausted
    self.callbacks.onRetriesExhausted(response);
  }
};
