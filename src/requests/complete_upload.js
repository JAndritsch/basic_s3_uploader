// Handles retreving authentication and finalizing an upload via S3's
// CompleteMultipartUpload API.
//
// Usage:
// 
// var completeUploadRequest = new bs3u.CompleteUploadRequest(uploadId, uploader.settings, {
//   onSuccess: function(location) {
//     // notify location
//     // stop all intervals
//   },
//   onRetry: function(response, attempts) {
//     // notify about retry
//   },
//   onRetriesExhausted: function(response) {
//     // set failed status and stop all requests
//   }
// });
//
// completeUploadRequest.start();
//
bs3u.CompleteUploadRequest = function(uploadId, settings, callbacks) {
  this.uploadId = uploadId;
  bs3u.extend(this, new bs3u.Request(settings, callbacks));
};

bs3u.CompleteUploadRequest.prototype.getHeaders = function() {
  this._getHeaders("url", "params", "payload");
};

bs3u.CompleteUploadRequest.prototype.callS3 = function() {
  this._callS3("url", "method", "params", "body");
};

bs3u.CompleteUploadRequest.prototype.success = function(response) {
  var location = response.something.location;
  this.callbacks.onSuccess(location);
};
