// Handles retreving authentication and finalizing an upload via S3's
// CompleteMultipartUpload API.
bs3u.CompleteUploadRequest = function(uploadId, parts, settings, callbacks) {
  this.uploadId = uploadId;
  this.parts    = parts;
  bs3u.extend(this, new bs3u.Request(settings, callbacks));
};

bs3u.CompleteUploadRequest.prototype.getHeaders = function() {
  var url = this.settings.signatureBackend + this.settings.completeHeadersPath;
  var params = {
    key: this.settings.key,
    content_type: this.settings.contentType,
    region: this.settings.region,
    upload_id: this.uploadId,
    host: this.settings.host,
  };
  var payload = this._generateCompletePayload();
  this._getHeaders(url, params, payload);
};

bs3u.CompleteUploadRequest.prototype.callS3 = function() {
  var body = this._generateCompletePayload();
  if (this.utils.requiresFirefoxHack()) {
    body = new Blob([body]);
  }
  var url = this.settings.host + "/" + this.settings.key;
  var method = "POST";
  var params = {
    uploadId: this.uploadId
  };
  this._callS3(url, method, params, body);
};

bs3u.CompleteUploadRequest.prototype.success = function(response) {
  var xml = response.target.responseXML;
  var location = xml.getElementsByTagName('Location')[0].textContent;
  this.callbacks.onSuccess(location);
};

bs3u.CompleteUploadRequest.prototype._generateCompletePayload = function() {
  var self = this;

  var body = "<CompleteMultipartUpload>";
  var totalParts = Object.keys(self.parts);
  var partNumber;
  // Order is important here, so iterating "the old fashioned way" to make sure
  // we maintain ascending order for this payload.
  for (var i = 0; i < totalParts.length; i++) {
    partNumber = i + 1;
    body += "<Part>";
    body += "<PartNumber>" + partNumber + "</PartNumber>";
    body += "<ETag>" + self.parts[partNumber].eTag + "</ETag>";
    body += "</Part>";
  }
  body += "</CompleteMultipartUpload>";
  return body;
};
