// Handles retreving authentication and creating a new upload request via
// S3's InitiateMultipartUpload API.
//
// Usage:
// 
// var initiateUploadRequest = new bs3u.InitiateUploadRequest(uploader.settings, {
//   onSuccess: function(uploadId) {
//     // save uploadId
//     // start uploading chunks
//   },
//   onRetry: function(response, attempts) {
//     // notify about retry
//   },
//   onRetriesExhausted: function(response) {
//     // set failed status and stop all requests
//   }
// });
//
// initiateUploadRequest.start();
//
bs3u.InitiateUploadRequest = function(settings, callbacks) {
  bs3u.extend(this, new bs3u.Request(settings, callbacks));
};

bs3u.InitiateUploadRequest.prototype.getHeaders = function() {
  this._getHeaders("url", "params", "payload");
};

bs3u.InitiateUploadRequest.prototype.callS3 = function() {
  this._callS3("url", "method", "params", "body");
};

bs3u.InitiateUploadRequest.prototype.success = function(response) {
  var xml = response.target.responseXML;
  var uploadId = xml.getElementsByTagName('UploadId')[0].textContent;
  // Notify caller of success, pass in uploadId
  this.callbacks.onSuccess(uploadId);
};
