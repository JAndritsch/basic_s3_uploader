/* This is a mock of the BasicS3Uploader. It walks and talks just like the real thing, but doesn't
* actually perform any AJAX calls or upload any files to S3. Rather, it simply reports that everything
* is "okay" and tells you when the upload is done. 
*
* This is meant to be used when you need the Javascript functionality working but don't actually want
* any files to get uploaded (such as running tests).
*/

var BasicS3UploaderMock = function(file, settings) {
  var uploader = this; 
  uploader.file = file;
  uploader._XHRs = [];
  uploader._configureUploader(settings);
  uploader._notifyUploaderReady();
  uploader._setReady();
};

// Configure the uploader using the provided settings or sensible defaults.
BasicS3UploaderMock.prototype._configureUploader = function(settings) {
  var uploader = this;

  uploader.settings = {};

  uploader.settings.contentType             = settings.contentType || uploader.file.type;
  uploader.settings.chunkSize               = settings.chunkSize || 1024 * 1024 * 10; // 10MB
  uploader.settings.encrypted               = settings.encrypted || false;
  uploader.settings.maxRetries              = settings.maxRetries || 5;
  uploader.settings.maxFileSize             = settings.maxFileSize || 1024 * 1024 * 1024 * 5; // 5GB
  uploader.settings.acl                     = settings.acl || "public-read";
  uploader.settings.signatureBackend        = settings.signatureBackend || "";
  uploader.settings.initSignaturePath       = settings.initSignaturePath || "/get_init_signature";
  uploader.settings.remainingSignaturesPath = settings.remainingSignaturesPath || "/get_remaining_signatures";
  uploader.settings.bucket                  = settings.bucket || "your-bucket-name";
  uploader.settings.host                    = settings.host || "http://" + uploader.settings.bucket + "." + "s3.amazonaws.com";
  uploader.settings.awsAccessKey            = settings.awsAccessKey || "YOUR_AWS_ACCESS_KEY_ID";
  uploader.settings.log                     = settings.log || false;
  uploader.settings.customHeaders           = settings.customHeaders || {};
  uploader.settings.maxConcurrentChunks     = settings.maxConcurrentChunks || 5;

  var defaultKey = "/" + uploader.settings.bucket + "/" + new Date().getTime() + "_" + uploader.file.name;
  uploader.settings.key = settings.key || defaultKey;

  uploader.settings.onReady         = settings.onReady || function() {};
  uploader.settings.onStart         = settings.onStart || function() {};
  uploader.settings.onProgress      = settings.onProgress || function(loaded, total) {};
  uploader.settings.onChunkUploaded = settings.onChunkUploaded || function(chunkNumber, totalChunks) {};
  uploader.settings.onComplete      = settings.onComplete || function(location) {};
  uploader.settings.onError         = settings.onError || function(errorCode, description) {};
  uploader.settings.onRetry         = settings.onRetry || function(attempts) {};
  uploader.settings.onCancel        = settings.onCancel || function() {};

};

BasicS3UploaderMock.prototype.startUpload = function() {
  var uploader = this; 
  uploader._createChunks();
  uploader._notifyUploadStarted();
  uploader._setUploading();
  uploader._getInitSignature();
};

BasicS3UploaderMock.prototype.cancelUpload = function() {
  var uploader = this;
  uploader._notifyUploadCancelled();
  uploader._setCancelled();
};

BasicS3UploaderMock.prototype._createChunks = function() {
  var uploader = this;
  var chunks = {};

  var chunkSize = Math.min(uploader.settings.chunkSize, uploader.file.size);
  var totalChunks = Math.ceil(uploader.file.size / chunkSize);

  var remainingSize, startRange, endRange, sizeOfChunk;

  for(var partNumber = 1; partNumber < totalChunks + 1; partNumber++) {
    remainingSize = remainingSize || uploader.file.size;
    startRange = startRange || 0;
    sizeOfChunk = sizeOfChunk || chunkSize * partNumber;

    endRange = (startRange + sizeOfChunk);

    chunks[partNumber] = {startRange: startRange, endRange: endRange};

    startRange = (chunkSize * partNumber);
    remainingSize = remainingSize - sizeOfChunk;

    if (remainingSize < sizeOfChunk) {
      sizeOfChunk = remainingSize;
    }
  }
  uploader._chunks = chunks;
};

BasicS3UploaderMock.prototype._getInitSignature = function() {
  var uploader = this;
  uploader._initSignature = "Mock-init-signature";
  uploader._date = "Mock-init-date";
  uploader._initiateUpload();
};

BasicS3UploaderMock.prototype._initiateUpload = function() {
  var uploader = this;
  uploader._uploadId = "Mock-upload-id";
  uploader._getRemainingSignatures();
};

BasicS3UploaderMock.prototype._getRemainingSignatures = function() {
  var uploader = this;
  uploader._chunkSignatures = "Mock-chunk-signatures";
  uploader._completeSignature = "Mock-complete-signature";
  uploader._listSignature = "Mock-list-signature";
  uploader._chunkProgress = {};
  uploader._eTags = {};
  uploader._uploadChunks();
};

BasicS3UploaderMock.prototype._uploadChunks = function() {
  var uploader = this;
  var totalChunks = Object.keys(uploader._chunks).length;

  for(var chunkNumber = 1; chunkNumber < totalChunks + 1; chunkNumber++) {
    var chunk = uploader._chunks[chunkNumber];
    uploader._uploadChunk(chunkNumber);
  }
};

BasicS3UploaderMock.prototype._uploadChunk = function(number) {
  var uploader = this;

  var loaded = 0;
  var total = uploader.file.size;

  for(var chunkNumber = 1; chunkNumber < number + 1; chunkNumber++) {
    loaded += uploader._chunks[chunkNumber].endRange;
  }

  uploader._chunkProgress[number] = loaded;
  uploader._notifyUploadProgress();
  uploader._eTags[number] = "Mock-etag";

  if (uploader._allETagsAvailable()) {
    uploader._completeUpload();
  }

};

BasicS3UploaderMock.prototype._completeUpload = function(retries) {
  var uploader = this;
  uploader._notifyUploadComplete("mock-location");
  uploader._setComplete();
};

BasicS3UploaderMock.prototype._allETagsAvailable = function() {
  var uploader = this;
  return Object.keys(uploader._eTags).length == Object.keys(uploader._chunks).length;
};

BasicS3UploaderMock.prototype._setReady = function() {
  var uploader = this;
  uploader._status = "ready";
};

BasicS3UploaderMock.prototype._isReady = function() {
  var uploader = this;
  return uploader._status == "ready";
};

BasicS3UploaderMock.prototype._setUploading = function() {
  var uploader = this;
  uploader._status = "uploading";
};

BasicS3UploaderMock.prototype._isUploading = function() {
  var uploader = this;
  return uploader._status == "uploading";
};

BasicS3UploaderMock.prototype._setComplete = function() {
  var uploader = this;
  uploader._status = "complete";
};

BasicS3UploaderMock.prototype._isComplete = function() {
  var uploader = this;
  return uploader._status == "complete";
};

BasicS3UploaderMock.prototype._setCancelled = function() {
  var uploader = this;
  uploader._status = "cancelled";
};

BasicS3UploaderMock.prototype._isCancelled = function() {
  var uploader = this;
  return uploader._status == "cancelled";
};

BasicS3UploaderMock.prototype._setFailed = function() {
  var uploader = this;
  uploader._status = "failed";
};

BasicS3UploaderMock.prototype._isFailed = function() {
  var uploader = this;
  return uploader._status == "failed";
};

BasicS3UploaderMock.prototype._notifyUploaderReady = function() {
  var uploader = this;
  uploader.settings.onReady.call(uploader);
};

BasicS3UploaderMock.prototype._notifyUploadStarted = function() {
  var uploader = this;
  uploader.settings.onStart.call(uploader);
};

BasicS3UploaderMock.prototype._notifyUploadProgress = function() {
  var uploader = this;
  var loaded = 0;

  for (var chunkNumber in uploader._chunkProgress) {
    loaded += uploader._chunkProgress[chunkNumber];
  }

  var total = uploader.file.size;

  uploader.settings.onProgress.call(uploader, loaded, total);
};

BasicS3UploaderMock.prototype._notifyUploadComplete = function(location) {
  var uploader = this;
  uploader.settings.onComplete.call(uploader, location);
};

BasicS3UploaderMock.prototype._notifyUploadError = function(errorCode, description) {
  var uploader = this;
  uploader.settings.onError.call(uploader, errorCode, description);
};

BasicS3UploaderMock.prototype._notifyUploadRetry = function(attempt) {
  var uploader = this;
  uploader.settings.onRetry.call(uploader, attempt);
};

BasicS3UploaderMock.prototype._notifyUploadCancelled = function() {
  var uploader = this;
  uploader.settings.onCancel.call(uploader);
};
