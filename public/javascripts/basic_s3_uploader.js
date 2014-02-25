/*
* Copyright © 2014 Joel Andritsch <joel.andritsch@gmail.com>
*
* This work is free. You can redistribute it and/or modify it under the
* terms of the Do What The Fuck You Want To Public License, Version 2,
* as published by Sam Hocevar. See the COPYING file for more details.
*/

// Simple constructor. Accepts a file object and some settings.
var BasicS3Uploader = function(file, settings) {
  var uploader = this; 
  uploader.file = file;
  uploader._XHRs = [];
  uploader._configureUploader(settings);
  uploader._notifyUploaderReady();
  uploader._setReady();
}

BasicS3Uploader.version = {
  full: "1.0.0",
  major: "1",
  minor: "0",
  patch: "0"
}

// Configure the uploader using the provided settings or sensible defaults.
BasicS3Uploader.prototype._configureUploader = function(settings) {
  var uploader = this;

  uploader.settings = {};

  // The content type of the file
  uploader.settings.contentType             = settings.contentType || uploader.file.type;
  // Size of each part sent in the multipart request. AWS requires a chunk size of at least 5mb,
  // so it cannot be any lower than that.
  uploader.settings.chunkSize               = settings.chunkSize || 1024 * 1024 * 10; // 10MB
  // If set to true, the upload will be performed using an AES256 encryption.
  uploader.settings.encrypted               = settings.encrypted || false;
  // Should any part of the upload process fail, it will automatically retry any AJAX call
  // as long as it's within the retry limit.
  uploader.settings.maxRetries              = settings.maxRetries || 5;
  // The maximum file size allowed for this upload. AWS currently does not support uploading files
  // larger than 5 gigabytes.
  uploader.settings.maxFileSize             = settings.maxFileSize || 1024 * 1024 * 1024 * 5; // 5GB
  // The ACL (Access Control List) policy. Valid options are as follows:
    // authenticated-read
    // bucket-owner-full-control
    // bucket-owner-read
    // log-delivery-write
    // private
    // public-read (default)
    // public-read-write
  uploader.settings.acl                     = settings.acl || "public-read";
  // The root path to your signature backend. If you plan on defining the necessary
  // routes at the root of your application, leave this blank.
  uploader.settings.signatureBackend        = settings.signatureBackend || "";
  // The path for which the upload init signature can be retrieved.
  uploader.settings.initSignaturePath       = settings.initSignaturePath || "/get_init_signature";
  // The path for which all other signatures can be retrieved.
  uploader.settings.remainingSignaturesPath = settings.remainingSignaturesPath || "/get_remaining_signatures";
  // The name of your S3 bucket
  uploader.settings.bucket                  = settings.bucket || "your-bucket-name";
  // The host name is not required but can be explicitly set.
  uploader.settings.host                    = settings.host || "http://" + uploader.settings.bucket + "." + "s3.amazonaws.com";
  // Your AWS Access Key. NOTE: This is not your secret access key!
  uploader.settings.awsAccessKey            = settings.awsAccessKey || "YOUR_AWS_ACCESS_KEY_ID";
  // If true, you will see logging output in your browser's web inspector. 
  uploader.settings.log                     = settings.log || false;
  // Any custom headers that need to be set. Note that these headers are only used for
  // communication with your own application and are not sent to AWS.
  uploader.settings.customHeaders           = settings.customHeaders || {};

  // Generates a default key to use for the upload if none was provided.
  var defaultKey = "/" + uploader.settings.bucket + "/" + new Date().getTime() + "_" + uploader.file.name;
  // The key for this upload. 
  uploader.settings.key = settings.key || defaultKey;

  // Events
  
  // Fires when the uploader has been initialized and ready to start uploading.
  uploader.settings.onReady         = settings.onReady || function() {};
  // Fires when the upload has started.
  uploader.settings.onStart         = settings.onStart || function() {};
  // Fires whenever upload progress is reported for any chunk.
  uploader.settings.onProgress      = settings.onProgress || function(loaded, total) {};
  // Fires whenever a single chunk has finished uploading.
  uploader.settings.onChunkUploaded = settings.onChunkUploaded || function(chunkNumber, totalChunks) {};
  // Fires whenever all chunks have finished uploading.
  uploader.settings.onComplete      = settings.onComplete || function(location) {};
  // Fires whenever an error is encountered.
  uploader.settings.onError         = settings.onError || function(errorCode, description) {};
  // Fires whenever a call is retried. Note that if multiple chunks are uploading at once and
  // they all fail, this will get called once for each chunk.
  uploader.settings.onRetry         = settings.onRetry || function(attempts) {};
  // Fires whenever an upload is cancelled.
  uploader.settings.onCancel        = settings.onCancel || function() {};

}

// Start the upload, but only if the file is deemed "readable". 
BasicS3Uploader.prototype.startUpload = function() {
  var uploader = this; 

  uploader._log("startUpload called");

  if (uploader._isUploading()) {
    uploader._log("Uploader is already running.");
    return;
  }

  if (uploader.file.size > uploader.settings.maxFileSize) {
    var errorCode = 0;
    uploader._notifyUploadError(errorCode, uploader.errors[errorCode]);
    uploader._setFailed();
    uploader._log("Uploader error: ", uploader.errors[errorCode]);
    return;
  }

  uploader._validateFileIsReadable(function(valid) {
    if (valid) {
      uploader._createChunks();
      uploader._notifyUploadStarted();
      uploader._setUploading();
      uploader._getInitSignature();
    } else {
      var errorCode = 1;
      uploader._notifyUploadError(errorCode, uploader.errors[errorCode]);
      uploader._setFailed();
      uploader._log("Uploader error: ", uploader.errors[errorCode]);
    }
  });

}

// Cancels all XHR requests.
BasicS3Uploader.prototype.cancelUpload = function() {
  var uploader = this;
  var xhr;

  if (!uploader._isUploading()) {
    return;
  }

  uploader._log("Aborting upload");
  for (index in uploader._XHRs) {
    uploader._XHRs[index].abort();
  }

  uploader._XHRs = [];
  uploader._notifyUploadCancelled();
  uploader._setCancelled();
}

// Slices up the file into chunks, storing the startRange and endRange of each chunk on the uploader
// so the blobs can be created when needed.
BasicS3Uploader.prototype._createChunks = function() {
  var uploader = this;
  var chunks = {}

  uploader._log("Slicing up file into chunks");

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
  uploader._log("Total chunks to upload:", Object.keys(chunks).length);
}

// Call to the provided signature backend to get the init signature.
// The response should look something like:
//    { signature: "some-signature", date: "the date for this request" }
BasicS3Uploader.prototype._getInitSignature = function(retries) {
  var uploader = this;
  var attempts = retries || 0;

  uploader._log("Getting the init signature");

  uploader._ajax({
    url: uploader.settings.signatureBackend + uploader.settings.initSignaturePath,
    method: "GET",
    params: {
      key: uploader.settings.key,
      filename: uploader.file.name,
      filesize: uploader.file.size,
      mime_type: uploader.settings.contentType,
      bucket: uploader.settings.bucket,
      acl: uploader.settings.acl,
      encrypted: uploader.settings.encrypted
    },
    customHeaders: uploader.settings.customHeaders,
    success: function(response) {
      var xhr = this;
      if (xhr.status == 200) {
        uploader._log("Init signature retrieved");
        var json = JSON.parse(response.target.responseText);
        uploader._initSignature = json['signature'];
        uploader._date = json['date'];
        uploader._initiateUpload();
      } else {
        uploader._log("Server returned a non-200. Deferring to error handler!");
        xhr._data.error();
      }
    },
    error: function(response) {
      if (uploader._retryAvailable(attempts)) {
        attempts += 1;
        uploader._log("Attempting to retry retrieval of init signature.");
        setTimeout(function() {
          uploader._notifyUploadRetry(attempts);
          uploader._getInitSignature(attempts);
        }, 2000 * attempts)
      } else {
        var errorCode = 2;
        uploader._notifyUploadError(errorCode, uploader.errors[errorCode]);
        uploader._setFailed();
        uploader._log("Uploader error!", uploader.errors[errorCode]);
      }
    }
  });
}

// Initiate a new upload to S3 using the init signature. This will return an UploadId
// when successful.
BasicS3Uploader.prototype._initiateUpload = function(retries) {
  var uploader = this;
  var attempts = retries || 0;
  var authorization = "AWS " + uploader.settings.awsAccessKey + ":" + uploader._initSignature;

  uploader._log("Initiating the upload");

  var headers = {
    "x-amz-date": uploader._date,
    "x-amz-acl": uploader.settings.acl,
    "Authorization": authorization,
    "Content-Disposition": "attachment; filename=" + uploader.file.name
  };

  if (uploader.settings.encrypted) {
    headers["x-amz-server-side-encryption"] = "AES256";
  }

  uploader._ajax({
    url: uploader.settings.host + "/" + uploader.settings.key + "?uploads",
    method: "POST",
    headers: headers,
    success: function(response) {
      var xhr = this;
      if (xhr.status == 200) {
        uploader._log("Upload initiated.");
        var xml = response.target.responseXML;
        uploader._uploadId = xml.getElementsByTagName('UploadId')[0].textContent;
        uploader._getRemainingSignatures();
      } else {
        uploader._log("Initiate upload error. Deferring to error handler.");
        xhr._data.error();
      }
    },
    error: function(response) {
      if (uploader._retryAvailable(attempts)) {
        attempts += 1;
        uploader._log("Retrying to initiate the upload.");
        setTimeout(function() {
          uploader._notifyUploadRetry(attempts);
          uploader._initiateUpload(attempts);
        }, 2000 * attempts)
      } else {
        var errorCode = 3;
        uploader._notifyUploadError(errorCode, uploader.errors[errorCode]);
        uploader._setFailed();
        uploader._log("Uploader error!", uploader.errors[errorCode]);
      }
    }
  });
}

// Using the UploadId, retrieve the remaining signatures required for uploads
// from the signature backend. The response should include all chunk signatures,
// a "list parts" signature, and a "complete" signature. A sample response might
// look something like this:
//
// {
//   chunk_signatures: {
//     1: { signature: "signature", date: "date" },
//     2: { signature: "signature", date: "date" },
//     3: { signature: "signature", date: "date" },
//   },
//   complete_signature: { signature: "signature", date: "date" },
//   list_signature: { signature: "signature", date: "date" }
// }
//
// Note that for the chunk_signatures section, the key corresponds to the 
// part number (or chunk number).
BasicS3Uploader.prototype._getRemainingSignatures = function(retries) {
  var uploader = this;
  var attempts = retries || 0;

  uploader._log("Attempting to get the remaining upload signatures");

  uploader._ajax({
    url: uploader.settings.signatureBackend + uploader.settings.remainingSignaturesPath,
    params: {
      upload_id: uploader._uploadId,
      total_chunks: Object.keys(uploader._chunks).length,
      mime_type: uploader.settings.contentType,
      bucket: uploader.settings.bucket,
      key: uploader.settings.key
    },
    customHeaders: uploader.settings.customHeaders,
    success: function(response) {
      var xhr = this;
      if (xhr.status == 200) {
        uploader._log("Remaining signatures have been retrieved");
        var json = JSON.parse(response.target.responseText);

        uploader._chunkSignatures = json['chunk_signatures'];
        uploader._completeSignature = json['complete_signature'];
        uploader._listSignature = json['list_signature'];
        uploader._eTags = {}
        uploader._chunkProgress = {};
        uploader._uploadChunks();
      } else { 
        uploader._log("Failed to get remaining signatures. Deferring to error handler");
        xhr._data.error();
      }
    },
    error: function(response) {
      if (uploader._retryAvailable(attempts)) {
        attempts += 1;
        uploader._log("Retrying retrieval of remaining signatures");
        setTimeout(function() {
          uploader._notifyUploadRetry(attempts);
          uploader._getRemainingSignatures(attempts);
        }, 2000 * attempts)
      } else {
        var errorCode = 4;
        uploader._notifyUploadError(errorCode, uploader.errors[errorCode]);
        uploader._setFailed();
        uploader._log("Uploader error!", uploader.errors[errorCode]);
      }
    }
  });
}

// Iterate over all chunks and start all uploads simultaneously
BasicS3Uploader.prototype._uploadChunks = function() {
  var uploader = this;
  var totalChunks = Object.keys(uploader._chunks).length;

  for(var chunkNumber = 1; chunkNumber < totalChunks + 1; chunkNumber++) {
    var chunk = uploader._chunks[chunkNumber];
    uploader._uploadChunk(chunkNumber);
  }
}

// Uploads a single chunk to S3. Because multiple chunks can be uploading at
// the same time, the "success" callback for this request checks to see if all
// chunks have been uploaded. If they have, the uploader will try to complete
// the upload.
BasicS3Uploader.prototype._uploadChunk = function(number, retries) {
  var uploader = this;
  var attempts = retries || 0;

  uploader._log("About to upload chunk " + number);

  var chunk = uploader._chunks[number];
  var signature = uploader._chunkSignatures[number].signature;
  var date = uploader._chunkSignatures[number].date;
  var authorization = "AWS " + uploader.settings.awsAccessKey + ":" + signature;
  var totalChunks = Object.keys(uploader._chunks).length;

  uploader._ajax({
    url: uploader.settings.host + "/" + uploader.settings.key,
    method: "PUT",
    body: uploader.file.slice(chunk.startRange, chunk.endRange),
    params: {
      uploadId: uploader._uploadId,
      partNumber: number,
    },
    headers: {
      "x-amz-date": date,
      "Authorization": authorization,
      "Content-Disposition": "attachment; filename=" + uploader.file.name,
      "Content-Type": uploader.settings.contentType,
    },
    progress: function(response) {
      uploader._chunkProgress[number] = response.loaded;
      uploader._log("Upload progress for chunk " + number, response.loaded);
      uploader._notifyUploadProgress();
    },
    success: function(response) {
      var xhr = this;
      if (xhr.status == 200) {
        uploader._log("Chunk " + number +  " has finished uploading");
        uploader._notifyChunkUploaded(number, totalChunks);
        var eTag = xhr.getResponseHeader("ETag");
        if (eTag && eTag.length > 0) {
          uploader._eTags[number] = eTag;
        }

        if (uploader._allETagsAvailable()) {
          uploader._verifyAllChunksUploaded();
        }
      } else {
        uploader._log("Upload of chunk " + number +  " has failed. Deferring to error handler");
        xhr._data.error();
      }
    },
    error: function(response) {
      if (uploader._retryAvailable(attempts)) {
        attempts += 1;
        uploader._log("Retrying to upload chunk " + number);
        setTimeout(function() {
          uploader._notifyUploadRetry(attempts);
          uploader._uploadChunk(number, attempts);
        }, 2000 * attempts)
      } else {
        var errorCode = 5;
        uploader._notifyUploadError(errorCode, uploader.errors[errorCode]);
        uploader._setFailed();
        uploader._log("Uploader error!", uploader.errors[errorCode]);
      }
    }
  });
}

// Calls the S3 "List chunks" API and compares the result to the chunks the uploader
// sent. If any chunk is invalid (missing eTag, invalid size, different number of chunks)
// then the uploader attempts to re-upload that chunk.
BasicS3Uploader.prototype._verifyAllChunksUploaded = function(retries) {
  var uploader = this;
  var attempts = retries || 0;
  var signature = uploader._listSignature.signature;
  var date = uploader._listSignature.date;
  var authorization = "AWS " + uploader.settings.awsAccessKey + ":" + signature;

  uploader._log("Verifying all chunks have been uploaded");

  uploader._ajax({
    url: uploader.settings.host + "/" + uploader.settings.key,
    method: "GET",
    params: {
      uploadId: uploader._uploadId,
    },
    headers: {
      "x-amz-date": date,
      "Authorization": authorization
    },
    success: function(response) {
      var xhr = this;

      if (xhr.status == 200) {

        var xml = response.target.responseXML;
        var invalidParts = [];
        var parts = xml.getElementsByTagName("Part");
        var totalParts = Object.keys(uploader._chunks).length;

        for (var i = 0; i < parts.length; i++) {
          var part = parts[i];

          var number = parseInt(part.getElementsByTagName("PartNumber")[0].textContent, 10);
          var eTag = part.getElementsByTagName("ETag")[0].textContent;
          var size = parseInt(part.getElementsByTagName("Size")[0].textContent, 10);

          var uploadedChunk = uploader._chunks[number];
          var expectedSize = uploadedChunk.endRange - uploadedChunk.startRange;

          if (!uploadedChunk || eTag != uploader._eTags[number] || size != expectedSize) {
            invalidParts.push(number);
          }
        }

        if (totalParts != parts.length) {
          uploader._log("Some chunks are missing. Attempting to re-upload them.");
          uploader._handleMissingChunks(parts);
        } else if (invalidParts.length > 0) {
          uploader._log("Some chunks are invalid. Attempting to re-upload them.");
          uploader._handleInvalidChunks(invalidParts);
        } else {
          uploader._log("All chunks have been uploaded");
          uploader._completeUpload();
        }

      } else {
        uploader._log("Chunk verification has failed. Deferring to error handler");
        xhr._data.error();
      }

    },
    error: function(response) {
      if (uploader._retryAvailable(attempts)) {
        attempts += 1;
        uploader._log("Retrying chunk verification");
        setTimeout(function() {
          uploader._notifyUploadRetry(attempts);
          uploader._verifyAllChunksUploaded(attempts);
        }, 2000 * attempts)
      } else {
        var errorCode = 6;
        uploader._notifyUploadError(errorCode, uploader.errors[errorCode]);
        uploader._setFailed();
        uploader._log("Uploader error!", uploader.errors[errorCode]);
      }
    }
  });
}

// Iterates over the list of invalid chunks and calls _retryChunk.
BasicS3Uploader.prototype._handleInvalidChunks = function(invalidParts) {
  var uploader = this;
  for (var i = 0; i < invalidParts.length; i++) {
    var chunkNumber = invalidParts[i];
    uploader._retryChunk(chunkNumber);
  }
}

// Determines if S3 is missing any chunks that were sent, then retries uploading
// the missing chunks via _retryChunk.
BasicS3Uploader.prototype._handleMissingChunks = function(chunksFromS3) {
  var uploader = this;
  var chunkNumbersFromS3 = [];

  // The part numbers that S3 reported
  for (var i = 0; i < chunksFromS3.length; i++) {
    var chunk = chunksFromS3[i];
    chunkNumbersFromS3.push(chunk.getElementsByTagName("PartNumber")[0].textContent);
  }

  // Send the missing parts
  for (var chunkNumber in uploader._chunks) {
    if (chunkNumbersFromS3.indexOf(chunkNumber) == -1) {
      uploader._retryChunk(chunkNumber);
    }
  }
}

// Attempts to retry a chunk upload, if a retry is available.
BasicS3Uploader.prototype._retryChunk = function(chunkNumber) {
  var uploader = this;
  var chunkAttempts = uploader._chunks[chunkNumber].attempts || 0;

  if (uploader._retryAvailable(chunkAttempts)) {
    chunkAttempts += 1;
    uploader._chunks[chunkNumber].attempts = chunkAttempts;
    uploader._uploadChunk(chunkNumber, chunkAttempts);
  } else {
    var errorCode = 7;
    uploader._notifyUploadError(errorCode, uploader.errors[errorCode]);
    uploader._setFailed();
    uploader._log("Uploader error! Cannot retry chunk " + chunkNumber, uploader.errors[errorCode]);
  }
}

// Completes the multipart upload, effectively assembling all chunks together
// into one file.
BasicS3Uploader.prototype._completeUpload = function(retries) {
  var uploader = this;
  var attempts = retries || 0;
  var signature = uploader._completeSignature.signature;

  uploader._log("About to complete the upload");

  var authorization = "AWS " + uploader.settings.awsAccessKey + ":" + signature;
  var body = "<CompleteMultipartUpload>";

  for (chunkNumber in uploader._eTags) {
    body += "<Part>";
    body += "<PartNumber>" + chunkNumber + "</PartNumber>";
    body += "<ETag>" + uploader._eTags[chunkNumber] + "</ETag>";
    body += "</Part>";
  }

  body += "</CompleteMultipartUpload>";

  //Hack: Firefox requires the data in the form of a blob
  if(navigator.userAgent.indexOf("Firefox") !== -1) {
    body = new Blob([body]);
  }

  uploader._ajax({
    url: uploader.settings.host + "/" + uploader.settings.key,
    method: "POST",
    body: body,
    params: {
      uploadId: uploader._uploadId
    },
    headers: {
      "x-amz-date": uploader._completeSignature.date,
      "Authorization": authorization,
      "Content-Type": uploader.settings.contentType,
      "Content-Disposition": "attachment; filename=" + uploader.file.name
    },
    success: function(response) {
      var xhr = this;
      if (xhr.status == 200) {
        var xml = response.target.responseXML;
        var location = xml.getElementsByTagName('Location')[0].textContent;
        if (location) {
          uploader._log("The upload has completed!");
          uploader._notifyUploadComplete(location);
          uploader._setComplete();
        }
      } else {
        uploader._log("Unable to complete the uploader. Deferring to error handler");
        xhr._data.error();
      }
    },
    error: function(response) {
      if (uploader._retryAvailable(attempts)) {
        attempts += 1;
        uploader._log("Attempting to retry upload completion");
        setTimeout(function() {
          uploader._notifyUploadRetry(attempts);
          uploader._completeUpload(attempts);
        }, 2000 * attempts)
      } else {
        var errorCode = 8;
        uploader._notifyUploadError(errorCode, uploader.errors[errorCode]);
        uploader._setFailed();
        uploader._log("Uploader error!", uploader.errors[errorCode]);
      }
    }
  });
  
}

// Returns true if attemts is less than maxRetries. Note that the first attempt
// (a non-retry attempt) is not counted.
BasicS3Uploader.prototype._retryAvailable = function(attempts) {
  var uploader = this;
  if (uploader._isCancelled() || uploader._isFailed()) {
    return false;
  }
  return (attempts + 1) < uploader.settings.maxRetries + 1;
}

// Returns true if we have an eTag for every chunk
BasicS3Uploader.prototype._allETagsAvailable = function() {
  var uploader = this;
  return Object.keys(uploader._eTags).length == Object.keys(uploader._chunks).length;
}

// State-related methods
BasicS3Uploader.prototype._setReady = function() {
  var uploader = this;
  uploader._status = "ready";
}

BasicS3Uploader.prototype._isReady = function() {
  var uploader = this;
  return uploader._status == "ready";
}

BasicS3Uploader.prototype._setUploading = function() {
  var uploader = this;
  uploader._status = "uploading";
}

BasicS3Uploader.prototype._isUploading = function() {
  var uploader = this;
  return uploader._status == "uploading";
}

BasicS3Uploader.prototype._setComplete = function() {
  var uploader = this;
  uploader._status = "complete";
}

BasicS3Uploader.prototype._isComplete = function() {
  var uploader = this;
  return uploader._status == "complete";
}

BasicS3Uploader.prototype._setCancelled = function() {
  var uploader = this;
  uploader._status = "cancelled";
}

BasicS3Uploader.prototype._isCancelled = function() {
  var uploader = this;
  return uploader._status == "cancelled";
}

BasicS3Uploader.prototype._setFailed = function() {
  var uploader = this;
  uploader._status = "failed";
}

BasicS3Uploader.prototype._isFailed = function() {
  var uploader = this;
  return uploader._status == "failed";
}

// Notification that the uploader is initialized. Calls the user-defined "onReady" 
// method.
BasicS3Uploader.prototype._notifyUploaderReady = function() {
  var uploader = this;
  uploader.settings.onReady.call(uploader);
}

// Notification that the uploader has started uploading chunks. Calls the user-defined
// onStart method.
BasicS3Uploader.prototype._notifyUploadStarted = function() {
  var uploader = this;
  uploader.settings.onStart.call(uploader);
}

// Notification for upload progress. Iterates over the chunkProgresses and tallies
// up the bytes loaded. Calls the user-defined onProgress method, sending in the
// total loaded and the total file size remaining. From this data, overall upload
// progress can be determined.
BasicS3Uploader.prototype._notifyUploadProgress = function() {
  var uploader = this;
  var loaded = 0;

  for (chunkNumber in uploader._chunkProgress) {
    loaded += uploader._chunkProgress[chunkNumber];
  }

  var total = uploader.file.size;

  uploader.settings.onProgress.call(uploader, loaded, total);
}

// Notifies when a chunk has finished uploading and calls the user-defined
// onChunkUploaded method.
BasicS3Uploader.prototype._notifyChunkUploaded = function(chunkNumber, totalChunks) {
  var uploader = this;
  uploader.settings.onChunkUploaded.call(uploader, chunkNumber, totalChunks);
}

// Notifies when the upload has finished and the parts have been assembled. Calls
// the user-defined onComplete method.
BasicS3Uploader.prototype._notifyUploadComplete = function(location) {
  var uploader = this;
  uploader.settings.onComplete.call(uploader, location);
}

// Notifies that an error has occurred with the uploader. Calls the user-defined
// onError method, sending in the error code and description
BasicS3Uploader.prototype._notifyUploadError = function(errorCode, description) {
  var uploader = this;
  uploader.settings.onError.call(uploader, errorCode, description);
}

// Notifies that a retry is being attempted. Calls the user-defined onRetry
// method, sending the attempt number.
BasicS3Uploader.prototype._notifyUploadRetry = function(attempt) {
  var uploader = this;
  uploader.settings.onRetry.call(uploader, attempt);
}

// Notifies that the upload has been cancelled. Calls the user-defined onCancel
// method.
BasicS3Uploader.prototype._notifyUploadCancelled = function() {
  var uploader = this;
  uploader.settings.onCancel.call(uploader);
}

BasicS3Uploader.prototype._log = function(msg, object) {
  msg = "[BasicS3Uploader] " + msg;
  if (this.settings.log) {
    if (object) {
      console.log(msg, object);
    } else {
      console.log(msg);
    }
  }
}

// A convenient and uniform way for creating and sending XHR requests.
BasicS3Uploader.prototype._ajax = function(data) {
  var uploader = this;
  var url = data.url;
  var method = data.method || "GET";
  var body = data.body;
  var params = data.params;
  var headers = data.headers || {};
  var customHeaders = data.customHeaders || {};

  var success = data.success || function(response) {};
  var error = data.error || function(response) {};
  var stateChange = data.stateChange || function(response) {};
  var progress = data.progress || function(response) {};

  var xhr = new XMLHttpRequest();
  xhr._data = data;

  xhr.addEventListener("error", error, true);
  xhr.addEventListener("timeout", error, true);
  xhr.addEventListener("load", success, true);
  xhr.addEventListener("readystatechange", stateChange);
  xhr.upload.addEventListener("progress", progress);

  if (params) {
    for (name in params) {
      if (url.indexOf('?') !== -1) {
        url += "&";
      } else {
        url += "?";
      }

      url += encodeURIComponent(name) + "=";
      url += encodeURIComponent(params[name]);
    }
  }

  xhr.open(method, url);

  for (var header in customHeaders) {
    xhr.setRequestHeader(header, customHeaders[header]);
  }

  for (var header in headers) {
    xhr.setRequestHeader(header, headers[header]);
  }

  if (body) {
    xhr.send(body);
  } else {
    xhr.send();
  }
  uploader._XHRs.push(xhr);
  return xhr;
}

// Using the FileReader API, this method attempts to open the file and read the
// first few bytes. This method accepts a callback and then calls it with the result
// of the check.
BasicS3Uploader.prototype._validateFileIsReadable = function(callback) {
  var uploader = this;
  var file = uploader.file;
  var blob = file.slice(0, 1024);
  var fr = new FileReader()

  fr.onloadend = function() {
    if (fr.error) {
      callback(false);
    } else {
      callback(true);
    }
  }

  fr.readAsBinaryString(blob);
}

BasicS3Uploader.prototype.errors = {
  // code: description
  0: "The file could not be uploaded because it exceeds the maximum file size allowed.",
  1: "The file could not be uploaded because it cannot be read",
  2: "Max number of retries have been met. Unable to get init signature!",
  3: "Max number of retries have been met. Unable to initiate an upload request!",
  4: "Max number of retries have been met. Unable to retrieve remaining signatures!",
  5: "Max number of retries have been met. Upload of chunk has failed!",
  6: "Max number of retries have been met. Unable to verify all chunks have uploaded!",
  7: "Max number of retries has been met. Cannot retry uploading chunk!",
  8: "Max number of retries have been met. Unable to complete multipart upload!"
  
}
