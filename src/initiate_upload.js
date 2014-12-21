bs3u.InitiateUploadRequest = function(settings, callbacks) {
  bs3u.extend(this, new bs3u.Request(settings, callbacks));
};

bs3u.InitiateUploadRequest.prototype.start = function() {
  if (this.headers) {
    this.callS3("url", "method", "params", "body");
  } else {
    this.getHeaders("url", "params", "payload");
  }
};

bs3u.InitiateUploadRequest.prototype.success = function(response) {
  var xml = response.target.responseXML;
  var uploadId = xml.getElementsByTagName('UploadId')[0].textContent;
  this.callbacks.onSuccess(uploadId);
};
