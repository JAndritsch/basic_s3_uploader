// Handles retreving authentication and list parts of an upload via S3's
// ListMultipartUpload API.
bs3u.ListPartsRequest = function(uploadId, settings, callbacks) {
  this.uploadId = uploadId;
  bs3u.extend(this, new bs3u.Request(settings, callbacks));
};

bs3u.ListPartsRequest.prototype.getHeaders = function() {
  var url = this.settings.signatureBackend + this.settings.listHeadersPath;
  var params = {
    key: this.settings.key,
    content_type: this.settings.contentType,
    region: this.settings.region,
    upload_id: this.uploadId,
    host: this.settings.host,
  };
  var payload = "";
  this._getHeaders(url, params, payload);
};

bs3u.ListPartsRequest.prototype.callS3 = function() {
  var host;
  if (this.settings.usingCloudFront) {
    host = this.utils.defaultHost(this.settings);
  } else {
    host = this.settings.host;
  }

  var url = host + "/" + this.settings.key;
  var method = "GET";
  var params = {
    uploadId: this.uploadId,
  };
  var body = null;
  this._callS3(url, method, params, body);
};

bs3u.ListPartsRequest.prototype.success = function(response) {
  var xml = response.target.responseXML;
  var parts = xml.getElementsByTagName("Part");
  this.callbacks.onSuccess(parts);
};
