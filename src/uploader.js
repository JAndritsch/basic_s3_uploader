// Simple constructor. Accepts a file object and some settings.
bs3u.Uploader = function(file, settings) {
  var uploader            = this;
  uploader.file           = file;
  uploader._requests      = [];
  uploader._chunkRequests = {};
  uploader._chunkProgress = {};
  uploader.logger         = new bs3u.Logger(settings);
  uploader.READY          = 0;
  uploader.UPLOADING      = 1;
  uploader.COMPLETE       = 2;
  uploader.CANCELED       = 3;
  uploader.FAILED         = 4;
  uploader._configureUploader(settings);
  uploader._notifyUploaderReady();
};

// Configure the uploader using the provided settings or sensible defaults.
bs3u.Uploader.prototype._configureUploader = function(settings) {
  var uploader = this;

  uploader.settings                         = {};
  uploader._utils                           = new bs3u.Utils(uploader.settings);

  // The content type of the file
  uploader.settings.contentType             = settings.contentType || uploader.file.type;
  // Size of each part sent in the multipart request. AWS requires a chunk size of at least 5mb,
  // so it cannot be any lower than that.

  var minimumChunkSize = 1024 * 1024 * 6;
  var defaultChunkSize = 1024 * 1024 * 10;

  uploader.settings.chunkSize               = Math.max(settings.chunkSize || defaultChunkSize, minimumChunkSize);
  // If set to true, the upload will be performed using an AES256 encryption.
  uploader.settings.encrypted               = settings.encrypted || false;
  // Should any part of the upload process fail, it will automatically retry any AJAX call
  // as long as it's within the retry limit.
  uploader.settings.maxRetries              = settings.maxRetries || 5;
  // The maximum file size allowed for this upload. AWS currently does not support uploading files
  // larger than 5 terabytes.
  uploader.settings.maxFileSize             = settings.maxFileSize || 1024 * 1024 * 1024 * 1024 * 5; // 5TB
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
  // Where the init headers can be retrieved.
  uploader.settings.initHeadersPath         = settings.initHeadersPath || "/get_init_headers";
  // Where the chunk headers can be retrieved.
  uploader.settings.chunkHeadersPath        = settings.chunkHeadersPath || "/get_chunk_headers";
  // Where the list headers can be retrieved.
  uploader.settings.listHeadersPath         = settings.listHeadersPath || "/get_list_headers";
  // Where the complete headers can be retrieved.
  uploader.settings.completeHeadersPath     = settings.completeHeadersPath || "/get_complete_headers";
  // The name of your S3 bucket
  uploader.settings.bucket                  = settings.bucket || "your-bucket-name";
  // If not setting a host, set to true if uploading using ssl.
  uploader.settings.ssl                     = settings.ssl || false;
  if (uploader.settings.ssl) {
    uploader.settings.protocol = "https://";
  } else {
    uploader.settings.protocol = "http://";
  }
  // The region where your bucket is located. This is needed for signature generation.
  uploader.settings.region                  = settings.region || "your-region";

  // The host name is not required but can be explicitly set.
  uploader.settings.host                    = settings.host || uploader._utils.defaultHost();
  // If true, you will see logging output in your browser's web inspector.
  uploader.settings.log                     = settings.log || false;
  // Any custom headers that need to be set. Note that these headers are only used for
  // communication with your own application and are not sent to AWS.
  uploader.settings.customHeaders           = settings.customHeaders || {};
  // The maximum number of concurrent XHR requests for a given upload. Increasing this
  // number may result in faster uploads, however browsers tend to have their own concurrent
  // XHR limitation built in. This means anything greater than that number will not have
  // any effect on upload performance. To handle this, we're setting a cap at 5
  // concurrent XHRs.
  uploader.settings.maxConcurrentChunks     = Math.max(Math.min((settings.maxConcurrentChunks || 5), 5), 1);
  // The number of milliseconds to wait before attempting another retry. Note that this number scales with the
  // number of attempts. For example, the first retry will wait for 2 seconds before attempting, whereaas the
  // 3rd retry will wait for 6 seconds. Formala: (waitTime * attempts).
  uploader.settings.retryWaitTime           = settings.retryWaitTime || 2000;
  // If the host is specified and the host is for a CloudFront distribution, set
  // this flag to true. The uploader has to do some things a bit differently when
  // uploading against CloudFront.
  uploader.settings.usingCloudFront         = settings.usingCloudFront || false;

  // Generates a default key to use for the upload if none was provided.
  var defaultKey = "/" + uploader.settings.bucket + "/" + new Date().getTime() + "_" + uploader.file.name;
  // The key for this upload.
  uploader.settings.key = settings.key || defaultKey;

  // If set to true, any SHA256 encryption will be done through web workers. This
  // will greatly increase performance when requesting headers for each chunk
  // of the file.
  uploader.settings.useWebWorkers           = settings.useWebWorkers || false;

  // The following settings are not necessary unless you're using web workers:
  
  // The path where the the worker file is located.
  uploader.settings.workerFilePath          = settings.workerFilePath || "/basic_s3_worker.js";
  // The path where this file is located. This is needed because the worker imports this file.
  uploader.settings.uploaderFilePath        = settings.uploaderFilePath || "/basic_s3_uploader.js";

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
  uploader.settings.onRetry         = settings.onRetry || function(attempts, data) {};
  // Fires whenever an upload is cancelled.
  uploader.settings.onCancel        = settings.onCancel || function() {};

};

// Start the upload, but only if the file is deemed "readable".
bs3u.Uploader.prototype.startUpload = function() {
  var uploader = this;

  uploader.logger.log("startUpload called");

  if (uploader._isUploading()) {
    uploader.logger.log("Uploader is already running.");
    return;
  }

  if (uploader.file.size > uploader.settings.maxFileSize) {
    var errorCode = 0;
    uploader._uploadFailed(errorCode);
    return;
  }

  uploader._utils.validateFileIsReadable(uploader.file, function(valid) {
    if (valid) {
      uploader._createChunks();
      uploader._notifyUploadStarted();
      uploader._initiateUpload();
    } else {
      var errorCode = 1;
      uploader._uploadFailed(errorCode);
    }
  });

};

// Cancels all XHR requests.
bs3u.Uploader.prototype.cancelUpload = function() {
  var uploader = this;
  var xhr;

  if (!uploader._isUploading()) {
    return;
  }

  uploader.logger.log("Aborting upload");
  uploader._abortAllRequests();
  uploader._notifyUploadCancelled();
};

// Slices up the file into chunks, storing the startRange and endRange of each chunk on the uploader
// so the blobs can be created when needed.
bs3u.Uploader.prototype._createChunks = function() {
  var uploader = this;
  var chunks = {};

  uploader.logger.log("Slicing up file into chunks");

  var chunkSize = Math.min(uploader.settings.chunkSize, uploader.file.size);
  var totalChunks = Math.ceil(uploader.file.size / chunkSize);

  var remainingSize, startRange, endRange, sizeOfChunk;

  for(var partNumber = 1; partNumber < totalChunks + 1; partNumber++) {
    remainingSize = remainingSize || uploader.file.size;
    startRange = startRange || 0;
    sizeOfChunk = sizeOfChunk || chunkSize * partNumber;

    endRange = (startRange + sizeOfChunk);

    chunks[partNumber] = {
      startRange: startRange,
      endRange: endRange,
      uploading: false,
      uploadComplete: false,
      eTag: null
    };

    startRange = (chunkSize * partNumber);
    remainingSize = remainingSize - sizeOfChunk;

    if (remainingSize < sizeOfChunk) {
      sizeOfChunk = remainingSize;
    }
  }
  uploader._chunks = chunks;
  uploader.logger.log("Total chunks to upload:", Object.keys(chunks).length);
};


bs3u.Uploader.prototype._initiateUpload = function() {
  var uploader = this;
  var initiateUploadRequest = new bs3u.InitiateUploadRequest(uploader.settings, {
    onSuccess: function(uploadId) {
      uploader._uploadId = uploadId;
      uploader._startBandwidthMonitor();
      uploader._startCompleteWatcher();
    },
    onRetry: function(response, attempts) {
      uploader.logger.log("Retrying to initiate upload, attempt number " + attempts);
      var data = {
        action: "initiateUpload",
        xhr: response
      };
      uploader._notifyUploadRetry(attempts, data);
    },
    onRetriesExhausted: function(response) {
      var errorCode = 2;
      uploader._uploadFailed(errorCode);
    }
  });

  uploader._requests.push(initiateUploadRequest);
  initiateUploadRequest.start();
};

// Uploads a single chunk to S3.
bs3u.Uploader.prototype._uploadChunk = function(number) {
  var uploader = this;
  var chunk = uploader._chunks[number];

  chunk.uploading = true;
  chunk.uploadComplete = false;

  var uploadPartRequest = new bs3u.UploadPartRequest(uploader._uploadId, number, chunk, uploader.file, uploader.settings, {
    onSuccess: function(eTag) {
      var totalChunks = Object.keys(uploader._chunks).length;
      chunk.uploading = false;
      chunk.uploadComplete = true;
      uploader.logger.log("Chunk " + number +  " has finished uploading");
      uploader._notifyChunkUploaded(number, totalChunks);
      chunk.eTag = eTag;
    },
    onProgress: function(response) {
      uploader._uploadChunkProgress(response, number);
    },
    onRetry: function(response, attempts) {
      uploader.logger.log("Chunk " + number + " retrying, attempt number " + attempts);
      var data = {
        action: "uploadChunk",
        xhr: response,
        chunkNumber: number,
        chunk: chunk,
      };
      uploader._notifyUploadRetry(attempts, data);
    },
    onRetriesExhausted: function(response) {
      var errorCode = 3;
      uploader._uploadFailed(errorCode);
    }
  });

  uploadPartRequest.start();
  uploader._chunkRequests[number] = uploadPartRequest;
};

// Calls the S3 "List chunks" API and compares the result to the chunks the uploader
// sent. If any chunk is invalid (missing eTag, invalid size, different number of chunks)
// then the uploader attempts to re-upload that chunk.
bs3u.Uploader.prototype._verifyAllChunksUploaded = function(retries) {
  var uploader = this;
  var listPartsRequest = new bs3u.ListPartsRequest(uploader._uploadId, uploader.settings, {
    onSuccess: function(parts) {
      var totalParts = Object.keys(uploader._chunks).length;
      var invalidParts = uploader._collectInvalidChunks(parts);
      if (totalParts != parts.length) {
        uploader.logger.log("Some chunks are missing. Attempting to re-upload them.");
        uploader._handleMissingChunks(parts);
      } else if (invalidParts.length > 0) {
        uploader.logger.log("Some chunks are invalid. Attempting to re-upload them.");
        uploader._handleInvalidChunks(invalidParts);
      } else {
        uploader.logger.log("All chunks have been uploaded");
        uploader._completeUpload();
      }
    },
    onRetry: function(response, attempts) {
      uploader.logger.log("Retrying to verify all chunks uploaded, attempt number " + attempts);
      var data = {
        action: "verifyAllChunksUploaded",
        xhr: response,
      };
      uploader._notifyUploadRetry(attempts, data);
    },
    onRetriesExhausted: function(response) {
      var errorCode = 4;
      uploader._uploadFailed(errorCode);
    }
  });
  uploader._requests.push(listPartsRequest);
  listPartsRequest.start();
};

// Completes the multipart upload, effectively assembling all chunks together
// into one file.
bs3u.Uploader.prototype._completeUpload = function() {
  var uploader = this;
  var completeUploadRequest = new bs3u.CompleteUploadRequest(uploader._uploadId, uploader._chunks, uploader.settings, {
    onSuccess: function(location) {
      uploader._notifyUploadComplete(location);
      uploader._abortAllRequests();
    },
    onRetry: function(response, attempts) {
      uploader.logger.log("Retrying to complete the uploaded, attempt number " + attempts);
      var data = {
        action: "completeUpload",
        xhr: response,
      };
      uploader._notifyUploadRetry(attempts, data);
    },
    onRetriesExhausted: function(response) {
      var errorCode = 5;
      uploader._uploadFailed(errorCode);
    }
  });
  completeUploadRequest.start();
  uploader._requests.push(completeUploadRequest);
};

// Iterate over all chunks and start all uploads simultaneously
bs3u.Uploader.prototype._uploadChunks = function() {
  var uploader = this;
  var totalChunks = Object.keys(uploader._chunks).length;

  for (var chunkNumber = 1; chunkNumber < totalChunks + 1; chunkNumber++) {
    var chunk = uploader._chunks[chunkNumber];
    if (uploader._canUploadChunk(chunk)) { uploader._uploadChunk(chunkNumber); }
  }
};

bs3u.Uploader.prototype._canUploadChunk = function(chunk) {
  return !chunk.uploading && !chunk.uploadComplete && uploader._uploadSpotAvailable();
};

// This checks to see which chunks are uploading and returns true if there is room
// for another chunk upload.
bs3u.Uploader.prototype._uploadSpotAvailable = function() {
  var uploader = this;
  return uploader._chunkUploadsInProgress() < uploader.settings.maxConcurrentChunks;
};

bs3u.Uploader.prototype._abortAllRequests = function() {
  var uploader = this;

  uploader.logger.log("Aborting all requests");

  for (var index in uploader._requests) {
    uploader._requests[index].stop();
  }

  for (var chunk in uploader._chunkRequests) {
    uploader._chunkRequests[chunk].stop();
  }
};

bs3u.Uploader.prototype._abortChunkUpload = function(number) {
  var uploader = this;
  var chunk = uploader._chunks[number];
  var xhr = uploader._chunkRequests[number];

  if (xhr) {
    uploader.logger.log("Cancelling the upload for chunk ", number);
    xhr.stop();
    xhr.lastProgressAt = null;
    chunk.uploading = false;
    chunk.uploadComplete = false;
  }
};

// Since none of the XHR requests are configured with a timeout, we need to
// monitor each chunk upload request and evaluate if the request has bombed out
// (no progress reported in 30sec). When this happens, we can abort the chunk
// upload and mark it for a retry.
bs3u.Uploader.prototype._abortTimedOutRequests = function() {
  var uploader = this;
  var currentTime = new Date().getTime();
  var chunkProgressTime, ajax, chunk, readyState;

  for (var index in uploader._chunkRequests) {
    chunk = uploader._chunks[index];
    if (chunk.uploading && !chunk.uploadComplete) {

      ajax = uploader._chunkRequests[index];
      readyState = ajax.xhr.readyState;
      chunkProgressTime = ajax.lastProgressAt;

      if ((currentTime - chunkProgressTime) > 30000) {
        uploader.logger.log("No progress has been reported within 30 seconds for chunk " + index);
        uploader._abortChunkUpload(index);
      }
    }
  }
};

// The progress callback for a single chunk
bs3u.Uploader.prototype._uploadChunkProgress = function(response, number) {
  var uploader = this;
  uploader._chunkProgress[number] = response.loaded;
  uploader._chunkRequests[number].lastProgressAt = new Date().getTime();
  uploader._notifyUploadProgress();
};


bs3u.Uploader.prototype._collectInvalidChunks = function(parts) {
  var uploader = this;
  var invalidParts = [];

  for (var i = 0; i < parts.length; i++) {
    var part = parts[i];

    var number = parseInt(part.getElementsByTagName("PartNumber")[0].textContent, 10);
    var eTag = part.getElementsByTagName("ETag")[0].textContent;
    var size = parseInt(part.getElementsByTagName("Size")[0].textContent, 10);

    var uploadedChunk = uploader._chunks[number];
    var expectedSize = uploadedChunk.endRange - uploadedChunk.startRange;

    if (!uploadedChunk || eTag != uploadedChunk.eTag || size != expectedSize) {
      uploader.logger.log('About to add chunk ' + number + ' to the invalidParts.');
      invalidParts.push(number);
      // ensure that uploadComplete has the correct value (see _uploadChunks)
      uploadedChunk.uploadComplete = false;
      // invalidate the eTag to prevent extraneous calls to _verifyAllChunksUploaded
      uploadedChunk.eTag = null;
    }
  }

  return invalidParts;
};

// Iterates over the list of invalid chunks flags them for re upload
bs3u.Uploader.prototype._handleInvalidChunks = function(invalidParts) {
  var uploader = this;

  var chunkNumber;
  for (var index in invalidParts) {
    chunkNumber = invalidParts[index];
    uploader._chunks[chunkNumber].uploading = false;
    uploader._chunks[chunkNumber].uploadComplete = false;
  }
  // Re-enable the completeWatcher so it can pick up the failed chunks and retry
  // them.
  uploader._pauseCompleteWatcher = false;
};

// Determines if S3 is missing any chunks that were sent, then flags them for
// a retry
bs3u.Uploader.prototype._handleMissingChunks = function(chunksFromS3) {
  var uploader = this;
  var chunkNumbersFromS3 = [];

  // The part numbers that S3 reported
  for (var i = 0; i < chunksFromS3.length; i++) {
    var chunk = chunksFromS3[i];
    chunkNumbersFromS3.push(chunk.getElementsByTagName("PartNumber")[0].textContent);
  }

  // Mark the missing parts as not uploaded so they will automatically retry
  for (var chunkNumber in uploader._chunks) {
    if (chunkNumbersFromS3.indexOf(chunkNumber) == -1) {
      uploader._chunks[chunkNumber].uploading = false;
      uploader._chunks[chunkNumber].uploadComplete = false;
    }
  }
  // Re-enable the completeWatcher so it can pick up the failed chunks and retry
  // them.
  uploader._pauseCompleteWatcher = false;
};

// Returns true if we have an eTag for every chunk
bs3u.Uploader.prototype._allETagsAvailable = function() {
  var uploader = this;
  for (var chunkNumber in uploader._chunks) {
    var chunk = uploader._chunks[chunkNumber];
    if (chunk.eTag === null || chunk.eTag === undefined || chunk.eTag.length < 1) {
      return false;
    }
  }
  return true;
};

// Returns the number of chunk uploads currently in progress
bs3u.Uploader.prototype._chunkUploadsInProgress = function() {
  var uploader = this;
  var count = 0;
  var chunk;

  for (var chunkNumber in uploader._chunks) {
    chunk = uploader._chunks[chunkNumber];
    if (chunk.uploading === true) { count += 1; }
  }

  return count;
};

// Monitors chunk uploads and attempts to complete the upload
bs3u.Uploader.prototype._startCompleteWatcher = function() {
  var uploader = this;
  uploader.logger.log("Starting the complete watcher interval");

  var id = setInterval(function() {
    if (!uploader._isUploading()) {
      uploader.logger.log("Stopping the complete watcher interval");
      clearInterval(id);
      return;
    }

    if (uploader._pauseCompleteWatcher) {
      return;
    }

    uploader._abortTimedOutRequests();

    if (uploader._allETagsAvailable()) {
      // temporarily shut down the watcher
      uploader._pauseCompleteWatcher = true;
      // verify all chunks uploaded
      uploader._verifyAllChunksUploaded();
    } else {
      // Continue uploading the remaining chunks
      uploader._uploadChunks();
    }

  }, 1000);
};

// This method will monitor the speed of the upload and reconfigure the number
// of concurrent uploads allowed. If the connection is attempting to upload more
// concurrent chunks than it can support, the number will scale down. If the uploader
// is under-utilizing the connection, the cap will increase and more concurrent
// chunks will be added from the "complete watcher".
bs3u.Uploader.prototype._startBandwidthMonitor = function() {
  var uploader = this;
  uploader.logger.log("Starting bandwidth monitor");
  var initialMaxChunks = uploader.settings.maxConcurrentChunks;
  var monitorStartTime = new Date().getTime();
  var newConcurrentChunks;

  // calculate the number of possible concurrent chunks based on upload speed.
  var id = setInterval(function(){
    if (!uploader._isUploading()) {
      uploader.logger.log("Stopping the bandwidth monitor");
      clearInterval(id);
      return;
    }

    newConcurrentChunks = uploader._calculateOptimalConcurrentChunks(monitorStartTime, initialMaxChunks);
    uploader.logger.log("Optimal concurrent chunks for connection is ", newConcurrentChunks);
    uploader.logger.log("Number of concurrent uploads in progress is ", uploader._chunkUploadsInProgress());
    uploader.settings.maxConcurrentChunks = newConcurrentChunks;

    if (newConcurrentChunks < uploader._chunkUploadsInProgress()) {
      uploader.logger.log("There are more concurrent uploads than your connection can support. Stopping some XHRs.");
      for (var number in uploader._chunks) {
        if (uploader._chunkUploadsInProgress() > newConcurrentChunks) {
          uploader._abortChunkUpload(number);
        }
      }
    }

  }, 10000);
};

bs3u.Uploader.prototype._calculateOptimalConcurrentChunks = function(time, initialMaxChunks) {
  var uploader = this;
  var loaded = uploader._calculateUploadProgress();
  var speed = parseInt(loaded / (new Date().getTime() - time), 10);
  var timeout = 900000; // 15 mins
  uploader.logger.log("Calculated average upload speed is " + speed + " KB/s");
  var chunkSize = uploader.settings.chunkSize;
  var neededSpeed = (chunkSize / timeout);
  var count = parseInt((speed / neededSpeed), 10);
  return Math.max(Math.min(count, initialMaxChunks), 1);
};

bs3u.Uploader.prototype._calculateUploadProgress = function() {
  var uploader = this;
  var loaded = 0;
  for (var chunkNumber in uploader._chunkProgress) {
    loaded += uploader._chunkProgress[chunkNumber];
  }
  return loaded;
};

bs3u.Uploader.prototype._uploadFailed = function(errorCode) {
  var uploader = this;
  uploader._notifyUploadError(errorCode, uploader.errors[errorCode]);
  uploader.logger.log("Uploader error!", "errorMessage");
  uploader._abortAllRequests();
};

bs3u.Uploader.prototype._isUploading = function() {
  var uploader = this;
  return uploader._status == uploader.UPLOADING;
};

bs3u.Uploader.prototype._isFailed = function() {
  var uploader = this;
  return uploader._status == uploader.FAILED;
};

// Notification that the uploader is initialized. Calls the user-defined "onReady"
// method.
bs3u.Uploader.prototype._notifyUploaderReady = function() {
  var uploader = this;
  uploader._status = uploader.READY;
  uploader.settings.onReady.call(uploader);
};

// Notification that the uploader has started uploading chunks. Calls the user-defined
// onStart method.
bs3u.Uploader.prototype._notifyUploadStarted = function() {
  var uploader = this;
  uploader._status = uploader.UPLOADING;
  uploader.settings.onStart.call(uploader);
};

// Notification for upload progress. Iterates over the chunkProgresses and tallies
// up the bytes loaded. Calls the user-defined onProgress method, sending in the
// total loaded and the total file size remaining. From this data, overall upload
// progress can be determined.
bs3u.Uploader.prototype._notifyUploadProgress = function() {
  var uploader = this;

  var loaded = uploader._calculateUploadProgress();
  var total = uploader.file.size;
  uploader.settings.onProgress.call(uploader, loaded, total);
};

// Notifies when a chunk has finished uploading and calls the user-defined
// onChunkUploaded method.
bs3u.Uploader.prototype._notifyChunkUploaded = function(chunkNumber, totalChunks) {
  var uploader = this;
  uploader.settings.onChunkUploaded.call(uploader, chunkNumber, totalChunks);
};

// Notifies when the upload has finished and the parts have been assembled. Calls
// the user-defined onComplete method.
bs3u.Uploader.prototype._notifyUploadComplete = function(location) {
  var uploader = this;
  uploader._status = uploader.COMPLETE;
  uploader.settings.onComplete.call(uploader, location);
};

// Notifies that an error has occurred with the uploader. Calls the user-defined
// onError method, sending in the error code and description
bs3u.Uploader.prototype._notifyUploadError = function(errorCode, description) {
  var uploader = this;
  // If the uploader has already been set to failed, this message has already been
  // sent so we will want to prevent duplicate publishes of this event.
  if (!uploader._isFailed()) {
    uploader._status = uploader.FAILED;
    uploader.settings.onError.call(uploader, errorCode, description);
  }
};

// Notifies that a retry is being attempted. Calls the user-defined onRetry
// method, sending the attempt number.
bs3u.Uploader.prototype._notifyUploadRetry = function(attempt, data) {
  var uploader = this;
  uploader.settings.onRetry.call(uploader, attempt, data);
};

// Notifies that the upload has been cancelled. Calls the user-defined onCancel
// method.
bs3u.Uploader.prototype._notifyUploadCancelled = function() {
  var uploader = this;
  uploader._status = uploader.CANCELED;
  uploader.settings.onCancel.call(uploader);
};

bs3u.Uploader.prototype.errors = {
  // code: description
  0: "The file could not be uploaded because it exceeds the maximum file size allowed.",
  1: "The file could not be uploaded because it cannot be read.",
  2: "Max number of retries have been met. Unable to initiate an upload request!",
  3: "Max number of retries have been met. Upload of chunk has failed!",
  4: "Max number of retries have been met. Unable to verify all chunks have uploaded!",
  5: "Max number of retries have been met. Unable to complete multipart upload!",
};

var BasicS3Uploader = bs3u.Uploader;
