// Handles retreving authentication and creating a new upload request via
// S3's InitiateMultipartUpload API.
bs3u.InitiateUploadRequest = function(settings, callbacks) {
  bs3u.extend(this, new bs3u.Request(settings, callbacks));
};

bs3u.InitiateUploadRequest.prototype.getHeaders = function() {
  var url = this.settings.signatureBackend + this.settings.initHeadersPath;
  var params = {
    key: this.settings.key,
    content_type: this.settings.contentType,
    acl: this.settings.acl,
    encrypted: this.settings.encrypted,
    region: this.settings.region,
    host: this.settings.host,
  };
  var payload = "";
  this._getHeaders(url, params, payload);
};

bs3u.InitiateUploadRequest.prototype.callS3 = function() {
  var url = this.settings.host + "/" + this.settings.key + "?uploads";
  var method = "POST";
  var params = {};
  var body = null;

  this._callS3(url, method, params, body);
};

bs3u.InitiateUploadRequest.prototype.success = function(response) {
  var xml = response.target.responseXML;
  var uploadId = xml.getElementsByTagName('UploadId')[0].textContent;
  // Notify caller of success, pass in uploadId
  this.callbacks.onSuccess(uploadId);
};
