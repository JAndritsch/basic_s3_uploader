// Handles retreving authentication and list parts of an upload via S3's
// ListMultipartUpload API.
//
// Usage:
// 
// var listPartsRequest = new bs3u.ListPartsRequest(uploadId, uploader.settings, {
//   onSuccess: function(partsFromS3) {
//     // handle invalid
//     // handle missing
//   },
//   onRetry: function(response, attempts) {
//     // notify about retry
//   },
//   onRetriesExhausted: function(response) {
//     // set failed status and stop all requests
//   }
// });
//
// listPartsRequest.start();
//
bs3u.ListPartsRequest = function(uploadId, settings, callbacks) {
  this.uploadId = uploadId;
  bs3u.extend(this, new bs3u.Request(settings, callbacks));
};

bs3u.ListPartsRequest.prototype.getHeaders = function() {
  this._getHeaders("url", "params", "payload");
};

bs3u.ListPartsRequest.prototype.callS3 = function() {
  this._callS3("url", "method", "params", "body");
};

bs3u.ListPartsRequest.prototype.success = function(response) {
  var xml = response.target.responseXML;
  var parts = xml.getElementsByTagName("Part");
  this.callbacks.onSuccess(parts);
};
