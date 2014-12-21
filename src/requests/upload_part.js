// Handles retreving authentication and uploading an part via S3's
// UploadPart API.
//
// Usage:
// 
// var uploadPartRequest = new bs3u.UploadPartRequest(uploadId, partNumber, uploader.settings, {
//   onSuccess: function(partNumber, eTag) {
//     uploader._chunks[partNumber].uploading = false;
//     uploader._chunks[partNumber].uploadComplete = true;
//     uploader._chunks[partNumber].eTag = eTag;
//   },
//   onRetry: function(response, attempts) {
//     // notify about retry
//   },
//   onRetriesExhausted: function(response) {
//     // set failed status and stop all requests
//   }
// });
//
// uploadPartRequest.start();
//
bs3u.UploadPartRequest = function(uploadId, partNumber, settings, callbacks) {
  this.uploadId = uploadId;
  this.partNumber = partNumber;
  bs3u.extend(this, new bs3u.Request(settings, callbacks));
};

bs3u.UploadPartRequest.prototype.getHeaders = function() {
  this._getHeaders("url", "params", "payload");
};

bs3u.UploadPartRequest.prototype.callS3 = function() {
  this._callS3("url", "method", "params", "body");
};

bs3u.UploadPartRequest.prototype.success = function(response) {
  var eTag = response.target.getResponseHeader("ETag");
  this.callbacks.onSuccess(this.partNumber, eTag);
};
