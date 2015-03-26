// Handles retreving authentication and uploading an part via S3's
// UploadPart API.
bs3u.UploadPartRequest = function(uploadId, chunk, settings, callbacks) {
  this.uploadId = uploadId;
  this.chunk = chunk;
  bs3u.extend(this, new bs3u.Request(settings, callbacks));
};

bs3u.UploadPartRequest.prototype.getHeaders = function() {
  var self = this;
  var chunk = this.chunk;
  var body = chunk.contents();
  var fileReader = new FileReader();

  fileReader.onloadend = function() {
    var url = self.settings.signatureBackend + self.settings.chunkHeadersPath;
    var params = {
      key: self.settings.key,
      content_type: self.settings.contentType,
      part_number: chunk.getNumber(),
      upload_id: self.uploadId,
      region: self.settings.region,
      host: self.settings.host,
    };
    var payload = fileReader.result;
    // IMPORTANT! Forgetting to do this will result in the FileReader remaining
    // in memory with the entire contents of the file/data read.
    fileReader = undefined;
    self._getHeaders(url, params, payload);
  };

  fileReader.readAsArrayBuffer(body);
};

bs3u.UploadPartRequest.prototype.callS3 = function() {
  var chunk = this.chunk;
  var body = chunk.contents();
  var url = this.settings.host + "/" + this.settings.key;
  var method = "PUT";
  var params = {
    uploadId: this.uploadId,
    partNumber: chunk.getNumber(),
  };
  this._callS3(url, method, params, body);
};

bs3u.UploadPartRequest.prototype.success = function(response) {
  var eTag = response.target.getResponseHeader("ETag");
  this.chunk.setETag(eTag);
  this.callbacks.onSuccess();
};
