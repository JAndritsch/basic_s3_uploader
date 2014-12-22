// Handles retreving authentication and uploading an part via S3's
// UploadPart API.
bs3u.UploadPartRequest = function(uploadId, partNumber, part, file, settings, callbacks) {
  this.uploadId   = uploadId;
  this.partNumber = partNumber;
  this.file       = file;
  this.part       = part;
  bs3u.extend(this, new bs3u.Request(settings, callbacks));
};

bs3u.UploadPartRequest.prototype.getHeaders = function() {
  var self = this;
  var part = this.part;
  var body = this.file.slice(part.startRange, part.endRange);
  var fileReader = new FileReader();

  fileReader.onloadend = function() {
    var url = self.settings.signatureBackend + self.settings.chunkHeadersPath;
    var params = {
      key: self.settings.key,
      content_type: self.settings.contentType,
      part_number: self.partNumber, 
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
  var part = this.part;
  var body = this.file.slice(part.startRange, part.endRange);
  var url = this.settings.host + "/" + this.settings.key;
  var method = "PUT";
  var params = {
    uploadId: this.uploadId,
    partNumber: this.partNumber,
  };
  this._callS3(url, method, params, body);
};

bs3u.UploadPartRequest.prototype.success = function(response) {
  var eTag = response.target.getResponseHeader("ETag");
  this.callbacks.onSuccess(eTag);
};
