var Uploader = function(file, settings) {
  var uploader = this; 
  uploader._configureUploader(file, settings);
};

Uploader.prototype._configureUploader = function(file, settings) {
  var uploader = this;

  uploader.file = file;

  uploader.chunkSize = settings.chunkSize || 1024 * 1024;
  uploader.encrypted = settings.encrypted || false;
  uploader.private = settings.private || false;
  uploader.signatureBackend = settings.signatureBackend || "/some/backend/";
  uploader.bucket = settings.bucket || "your-bucket-name";
  uploader.host = settings.host || "http://" + uploader.bucket + "." + "s3.amazonaws.com";
  uploader.awsAccessKey = settings.awsAccessKey || "YOUR_AWS_ACCESS_KEY_ID";

  var defaultKey = "/" + uploader.bucket + "/" + new Date().getTime() + "_" + uploader.file.name;
  uploader.key = settings.key || defaultKey;

  uploader.onStart = settings.onStart || function() {};
  uploader.onProgress = settings.onProgress || function() {};
  uploader.onComplete = settings.onComplete || function() {};
}

Uploader.prototype.startUpload = function() {
  var uploader = this; 

  uploader._createChunks();
  uploader._getSignatures();
  uploader._notifyUploadStarted();
  // for each chunk
  //   uploader._uploadChunk(chunk);
}

Uploader.prototype._createChunks = function() {}
Uploader.prototype._getSignatures = function() {}
Uploader.prototype._uploadChunk = function(blob) {}

/* Events */
Uploader.prototype._notifyUploadStarted = function() {
  var uploader = this;
  uploader.onStart();
}

Uploader.prototype._notifyUploadProgress = function() {
  var uploader = this;
  var uploaded = "some-bytes";
  var chunk = "some-chunk-number";
  var total = upoader.file.size;

  uploader.onProgress(chunk, uploaded, total);
}

Uploader.prototype._notifyUploadComplete = function() {
  var uploader = this;
  var uploadedFilePath = "some/upload/path";
  uploader.onComplete(uploadedFilePath);
}

