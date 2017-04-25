/*
* Copyright © 2014 Joel Andritsch <joel.andritsch@gmail.com>
* See LICENSE for copyright/licensing information.
*/

// Simple constructor. Accepts a file object and some settings.
bs3u.Uploader = function(file, settings) {
  var uploader = this;
  uploader.file = file;
  uploader._XHRs = [];
  uploader._chunkSignatureXHRs = {};
  uploader._chunkXHRs = {};
  uploader._chunkProgress = {};
  uploader._initHeaders = {};
  uploader._chunkHeaders = {};
  uploader._listHeaders = {};
  uploader._completeHeaders = {};
  uploader._configureUploader(settings);
  uploader._notifyUploaderReady();
  uploader._setReady();
};

// Configure the uploader using the provided settings or sensible defaults.
bs3u.Uploader.prototype._configureUploader = function(settings) {
  var uploader = this;

  uploader.settings = {};

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
  uploader.settings.host                    = settings.host || uploader._defaultHost();
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
  var defaultKey = new Date().getTime() + "_" + uploader.file.name;
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
  // Fires whenever the uploader logs data. This will only be invoked if logging
  // is enabled.
  uploader.settings.onLog           = settings.onLog || function(message, object) {};

};

// Start the upload, but only if the file is deemed "readable".
bs3u.Uploader.prototype.startUpload = function() {
  var uploader = this;

  uploader._log("startUpload called");

  if (uploader._isUploading()) {
    uploader._log("Uploader is already running.");
    return;
  }

  if (uploader.file.size > uploader.settings.maxFileSize) {
    var errorCode = 0;
    uploader._notifyUploadError(errorCode, uploader.errors[errorCode], {});
    uploader._setFailed();
    uploader._log("Uploader error: ", uploader.errors[errorCode]);
    return;
  }

  uploader._validateFileIsReadable(function(valid) {
    if (valid) {
      uploader._createChunks();
      uploader._notifyUploadStarted();
      uploader._setUploading();
      uploader._getInitHeaders();
    } else {
      var errorCode = 1;
      uploader._notifyUploadError(errorCode, uploader.errors[errorCode], {});
      uploader._setFailed();
      uploader._log("Uploader error: ", uploader.errors[errorCode]);
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

  uploader._log("Aborting upload");
  uploader._abortAllXHRs();
  uploader._notifyUploadCancelled();
  uploader._setCancelled();
};

// Stops all XHR requests
bs3u.Uploader.prototype._abortAllXHRs = function() {
  var uploader = this;

  uploader._log("Aborting all XHR requests");

  for (var index in uploader._XHRs) {
    uploader._XHRs[index].abort();
  }

  for (var chunk in uploader._chunkXHRs) {
    uploader._chunkXHRs[chunk].abort();
  }

  for (var chunkSignature in uploader._chunkSignatureXHRs) {
    uploader._chunkSignatureXHRs[chunkSignature].abort();
  }
};

// Slices up the file into chunks, storing the startRange and endRange of each chunk on the uploader
// so the blobs can be created when needed.
bs3u.Uploader.prototype._createChunks = function() {
  var uploader = this;
  var chunks = {};

  uploader._log("Slicing up file into chunks");

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
  uploader._log("Total chunks to upload:", Object.keys(chunks).length);
};

// Call to the provided signature backend to get the init headers.
// The response should contain all necessary headers to authenticate the request.
bs3u.Uploader.prototype._getInitHeaders = function(retries) {
  var uploader = this;
  var attempts = retries || 0;

  uploader._log("Getting the init headers");

  var success = function(encrypted) {
    var ajax = new bs3u.Ajax({
      url: uploader.settings.signatureBackend + uploader.settings.initHeadersPath,
      method: "GET",
      params: {
        key: uploader.settings.key,
        content_type: uploader.settings.contentType,
        acl: uploader.settings.acl,
        encrypted: uploader.settings.encrypted,
        payload: encrypted,
        region: uploader.settings.region,
        host: uploader.settings.host,
      },
      headers: uploader.settings.customHeaders,
    });

    ajax.onSuccess(function(response) {
      uploader._getInitHeadersSuccess(attempts, response, ajax);
    });

    ajax.onError(function(response) {
      uploader._getInitHeadersError(attempts, response, ajax);
    });

    ajax.onTimeout(function(response) {
      uploader._getInitHeadersError(attempts, response, ajax);
    });

    ajax.send();
    uploader._XHRs.push(ajax);
  };

  var failure = function(error) {
    uploader._getInitHeadersError(attempts, error, {});
  };

  uploader._encryptText("", success, failure);

};

// The success callback for getting init headers
bs3u.Uploader.prototype._getInitHeadersSuccess = function(attempts, response, ajax) {
  var uploader = this;
  if (response.target.status == 200) {
    uploader._log("Init headers retrieved");
    uploader._initHeaders = JSON.parse(response.target.responseText);
    uploader._initiateUpload();
  } else {
    uploader._log("Server returned a non-200. Deferring to error handler!");
    uploader._getInitHeadersError(attempts, response, ajax);
  }
};

// The error callback for getting a init headers
bs3u.Uploader.prototype._getInitHeadersError = function(attempts, response, ajax) {
  var uploader = this;
  var data = uploader._formatErrorForAction('getInitHeaders', response, ajax);
  if (uploader._retryAvailable(attempts)) {
    attempts += 1;
    uploader._log("Attempting to retry retrieval of init headers.");
    setTimeout(function() {
      uploader._notifyUploadRetry(attempts, data);
      uploader._getInitHeaders(attempts);
    }, uploader._timeToWaitBeforeNextRetry(attempts));
  } else {
    var errorCode = 2;
    uploader._notifyUploadError(errorCode, uploader.errors[errorCode], data);
    uploader._setFailed();
    uploader._log("Uploader error!", uploader.errors[errorCode]);
  }
};

// Initiate a new upload to S3 using the init signature. This will return an UploadId
// when successful.
bs3u.Uploader.prototype._initiateUpload = function(retries) {
  var uploader = this;
  var attempts = retries || 0;

  uploader._log("Initiating the upload");

  var ajax = new bs3u.Ajax({
    url: uploader.settings.host + "/" + uploader.settings.key + "?uploads",
    method: "POST",
    headers: uploader._initHeaders
  });

  ajax.onSuccess(function(response) {
    uploader._initiateUploadSuccess(attempts, response, ajax);
  });

  ajax.onError(function(response) {
    uploader._initiateUploadError(attempts, response, ajax);
  });

  ajax.onTimeout(function(response) {
    uploader._initiateUploadError(attempts, response, ajax);
  });

  ajax.send();
  uploader._XHRs.push(ajax);
};

// The success callback for initiating an upload
bs3u.Uploader.prototype._initiateUploadSuccess = function(attempts, response, ajax) {
  var uploader = this;
  if (response.target.status == 200) {
    uploader._log("Upload initiated.");
    var xml = response.target.responseXML;
    uploader._uploadId = xml.getElementsByTagName('UploadId')[0].textContent;
    uploader._startCompleteWatcher();
    uploader._startBandwidthMonitor();
  } else {
    uploader._log("Initiate upload error. Deferring to error handler.");
    uploader._initiateUploadError(attempts, response, ajax);
  }
};

// The error callback for initiating an upload
bs3u.Uploader.prototype._initiateUploadError = function(attempts, response, ajax) {
  var uploader = this;
  var data = uploader._formatErrorForAction('initiateUpload', response, ajax);
  if (uploader._retryAvailable(attempts)) {
    attempts += 1;
    uploader._log("Retrying to initiate the upload.");
    setTimeout(function() {
      uploader._notifyUploadRetry(attempts, data);
      uploader._getInitHeaders(attempts);
    }, uploader._timeToWaitBeforeNextRetry(attempts));
  } else {
    var errorCode = 3;
    uploader._notifyUploadError(errorCode, uploader.errors[errorCode], data);
    uploader._setFailed();
    uploader._log("Uploader error!", uploader.errors[errorCode]);
  }
};

// Iterate over all chunks and start all uploads simultaneously
bs3u.Uploader.prototype._uploadChunks = function() {
  var uploader = this;
  var totalChunks = Object.keys(uploader._chunks).length;

  for(var chunkNumber = 1; chunkNumber < totalChunks + 1; chunkNumber++) {
    var chunk = uploader._chunks[chunkNumber];
    if (!chunk.uploading && !chunk.uploadComplete && uploader._uploadSpotAvailable()) {
      chunk.uploading = true;
      chunk.uploadComplete = false;
      uploader._getChunkHeaders(chunkNumber);
    }
  }
};

// Call to the provided signature backend to get the chunk headers.
// The response should contain all necessary headers to authenticate the request.
bs3u.Uploader.prototype._getChunkHeaders = function(number, retries) {
  var uploader = this;
  var attempts = retries || 0;
  var chunk = uploader._chunks[number];

  uploader._log("Getting chunk " + number + " headers");

  var body = uploader.file.slice(chunk.startRange, chunk.endRange);
  var fileReader = new FileReader();

  fileReader.onloadend = function() {

    var success = function(encrypted) {

      // IMPORTANT! Forgetting to do this will result in the FileReader remaining
      // in memory with the entire contents of the file/data read.
      fileReader = undefined;

      if (!chunk.uploading) { return; }

      var ajax = new bs3u.Ajax({
        url: uploader.settings.signatureBackend + uploader.settings.chunkHeadersPath,
        method: "GET",
        params: {
          key: uploader.settings.key,
          content_type: uploader.settings.contentType,
          payload: encrypted,
          part_number: number,
          upload_id: uploader._uploadId,
          region: uploader.settings.region,
          host: uploader.settings.host,
        },
        headers: uploader.settings.customHeaders,
      });

      ajax.onSuccess(function(response) {
        uploader._getChunkHeadersSuccess(attempts, number, response, ajax);
      });

      ajax.onError(function(response) {
        uploader._getChunkHeadersError(attempts, number, response, ajax);
      });

      ajax.onTimeout(function(response) {
        uploader._getChunkHeadersError(attempts, number, response, ajax);
      });

      ajax.send();
      uploader._chunkSignatureXHRs[number] = ajax;
    };

    var failure = function(error) {
      uploader._getChunkHeadersError(attempts, number, error, {});
    };

    uploader._encryptText(fileReader.result, success, failure);

  };

  fileReader.readAsArrayBuffer(body);
};

bs3u.Uploader.prototype._getChunkHeadersSuccess = function(attempts, number, response, ajax) {
  var uploader = this;
  if (response.target.status == 200) {
    uploader._log("Chunk " + number + " headers retrieved");
    uploader._chunkHeaders[number] = JSON.parse(response.target.responseText);
    uploader._uploadChunk(number, attempts);
  } else {
    uploader._log("Server returned a non-200. Deferring to error handler!");
    uploader._getChunkHeadersError(attempts, number, response, ajax);
  }
};

bs3u.Uploader.prototype._getChunkHeadersError = function(attempts, number, response, ajax) {
  var uploader = this;
  var data = uploader._formatErrorForAction('getChunkHeaders', response, ajax);
  if (uploader._retryAvailable(attempts)) {
    attempts += 1;
    uploader._log("Attempting to retry retrieval of chunk " + number + " headers.");
    setTimeout(function() {
      uploader._notifyUploadRetry(attempts, data);
      uploader._getChunkHeaders(number, attempts);
    }, uploader._timeToWaitBeforeNextRetry(attempts));
  } else {
    var errorCode = 4;
    uploader._notifyUploadError(errorCode, uploader.errors[errorCode], data);
    uploader._setFailed();
    uploader._log("Uploader error!", uploader.errors[errorCode]);
  }
};

// This checks to see which chunks are uploading and returns true if there is room
// for another chunk upload.
bs3u.Uploader.prototype._uploadSpotAvailable = function() {
  var uploader = this;
  return uploader._chunkUploadsInProgress() < uploader.settings.maxConcurrentChunks;
};

// Uploads a single chunk to S3. Because multiple chunks can be uploading at
// the same time, the "success" callback for this request checks to see if all
// chunks have been uploaded. If they have, the uploader will try to complete
// the upload.
bs3u.Uploader.prototype._uploadChunk = function(number, retries) {
  var uploader = this;
  var attempts = retries || 0;

  var chunk = uploader._chunks[number];

  if (!chunk.uploading) { return; }

  var body = uploader.file.slice(chunk.startRange, chunk.endRange);

  uploader._log("Starting the XHR upload for chunk " + number);

  var ajax = new bs3u.Ajax({
    url: uploader.settings.host + "/" + uploader.settings.key,
    method: "PUT",
    params: {
      uploadId: uploader._uploadId,
      partNumber: number,
    },
    headers: uploader._chunkHeaders[number]
  });

  ajax.onProgress(function(response) {
    uploader._uploadChunkProgress(response, number);
  });

  ajax.onSuccess(function(response) {
    //Very important, keeps body from getting destroyed early and sending 0 bytes to AWS
    //See here for why https://code.google.com/p/chromium/issues/detail?id=167111
    uploader._log("Superfluous logging of body size to keep body from getting GCed", body.size);
    body = undefined;

    uploader._uploadChunkSuccess(attempts, response, number, ajax);
  });

  ajax.onError(function(response) {
    uploader._uploadChunkError(attempts, response, number, ajax);
  });

  ajax.onTimeout(function(response) {
    uploader._uploadChunkError(attempts, response, number, ajax);
  });

  ajax.send(body);
  uploader._chunkXHRs[number] = ajax;
};

// The progress callback for a single chunk
bs3u.Uploader.prototype._uploadChunkProgress = function(response, number) {
  var uploader = this;
  uploader._chunkProgress[number] = response.loaded;
  uploader._notifyUploadProgress();
};

// The success callback for uploading a single chunk
bs3u.Uploader.prototype._uploadChunkSuccess = function(attempts, response, number, ajax) {
  var uploader = this;
  var chunk = uploader._chunks[number];
  if (response.target.status == 200) {
    var totalChunks = Object.keys(uploader._chunks).length;
    chunk.uploading = false;
    chunk.uploadComplete = true;
    uploader._log("Chunk " + number +  " has finished uploading");
    uploader._notifyChunkUploaded(number, totalChunks);
    // Store the eTag on the chunk
    var eTag = response.target.getResponseHeader("ETag");
    if (eTag && eTag.length > 0) {
      chunk.eTag = eTag;
    } else {
      uploader._log("Upload of chunk " + number +  " has failed. The eTag was blank!");
      uploader._uploadChunkError(attempts, response, number, ajax);
    }
  } else {
    uploader._log("Upload of chunk " + number +  " has failed. Deferring to error handler");
    uploader._uploadChunkError(attempts, response, number, ajax);
  }
};

// The error callback for uploading a single chunk
bs3u.Uploader.prototype._uploadChunkError = function(attempts, response, number, ajax) {
  var uploader = this;

  uploader._log("XHR error for chunk " + number, response);
  var chunk = uploader._chunks[number];

  var data = uploader._formatErrorForAction('uploadChunk', response, ajax);
  data.chunkNumber = number;
  data.chunk = chunk;

  if (uploader._retryAvailable(attempts)) {
    attempts += 1;
    uploader._log("Retrying to upload chunk " + number);
    setTimeout(function() {
      uploader._notifyUploadRetry(attempts, data);
      uploader._getChunkHeaders(number, attempts);
    }, uploader._timeToWaitBeforeNextRetry(attempts));
  } else {
    var errorCode = 7;
    uploader._notifyUploadError(errorCode, uploader.errors[errorCode], data);
    uploader._setFailed();
    uploader._log("Uploader error! Cannot retry chunk " + number, uploader.errors[errorCode]);
  }
};

// Call to the provided signature backend to get the list headers.
// The response should contain all necessary headers to authenticate the request.
bs3u.Uploader.prototype._getListHeaders = function(retries) {
  var uploader = this;
  var attempts = retries || 0;

  uploader._log("Getting the list headers");

  var success = function(encrypted) {
    var ajax = new bs3u.Ajax({
      url: uploader.settings.signatureBackend + uploader.settings.listHeadersPath,
      method: "GET",
      params: {
        key: uploader.settings.key,
        content_type: uploader.settings.contentType,
        payload: encrypted,
        region: uploader.settings.region,
        upload_id: uploader._uploadId,
        host: uploader.settings.host,
      },
      headers: uploader.settings.customHeaders,
    });

    ajax.onSuccess(function(response) {
      uploader._getListHeadersSuccess(attempts, response, ajax);
    });

    ajax.onError(function(response) {
      uploader._getListHeadersError(attempts, response, ajax);
    });

    ajax.onTimeout(function(response) {
      uploader._getListHeadersError(attempts, response, ajax);
    });

    ajax.send();
    uploader._XHRs.push(ajax);
  };

  var failure = function(error) {
    uploader._getListHeadersError(attempts, error, {});
  };

  uploader._encryptText("", success, failure);

};

bs3u.Uploader.prototype._getListHeadersSuccess = function(attempts, response, ajax) {
  var uploader = this;
  if (response.target.status == 200) {
    uploader._log("list headers retrieved");
    uploader._listHeaders = JSON.parse(response.target.responseText);
    uploader._verifyAllChunksUploaded();
  } else {
    uploader._log("Server returned a non-200. Deferring to error handler!");
    uploader._getListHeadersError(attempts, response, ajax);
  }
};

bs3u.Uploader.prototype._getListHeadersError = function(attempts, response, ajax) {
  var uploader = this;
  var data = uploader._formatErrorForAction('getListHeaders', response, ajax);

  if (uploader._retryAvailable(attempts)) {
    attempts += 1;
    uploader._log("Attempting to retry retrieval of list headers.");
    setTimeout(function() {
      uploader._notifyUploadRetry(attempts, data);
      uploader._getListHeaders(attempts);
    }, uploader._timeToWaitBeforeNextRetry(attempts));
  } else {
    var errorCode = 9;
    uploader._notifyUploadError(errorCode, uploader.errors[errorCode], data);
    uploader._setFailed();
    uploader._log("Uploader error!", uploader.errors[errorCode]);
  }
};

// Calls the S3 "List chunks" API and compares the result to the chunks the uploader
// sent. If any chunk is invalid (missing eTag, invalid size, different number of chunks)
// then the uploader attempts to re-upload that chunk.
bs3u.Uploader.prototype._verifyAllChunksUploaded = function(retries) {
  var uploader = this;
  var attempts = retries || 0;

  uploader._log("Verifying all chunks have been uploaded");

  // CloudFront does not support the List Parts method, so we must go directly
  // to the bucket in order to verify everything was uploaded correctly.
  var host;
  if (uploader.settings.usingCloudFront) {
    host = uploader._defaultHost();
  } else {
    host = uploader.settings.host;
  }

  var ajax = new bs3u.Ajax({
    url: host + "/" + uploader.settings.key,
    method: "GET",
    params: {
      uploadId: uploader._uploadId,
    },
    headers: uploader._listHeaders
  });

  ajax.onSuccess(function(response) {
    uploader._verifyAllChunksUploadedSuccess(attempts, response, ajax);
  });

  ajax.onError(function(response) {
    uploader._verifyAllChunksUploadedError(attempts, response, ajax);
  });

  ajax.onTimeout(function(response) {
    uploader._verifyAllChunksUploadedError(attempts, response, ajax);
  });

  ajax.send();
  uploader._XHRs.push(ajax);
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
      uploader._log('About to add chunk ' + number + ' to the invalidParts.');
      invalidParts.push(number);
      // ensure that uploadComplete has the correct value (see _uploadChunks)
      uploadedChunk.uploadComplete = false;
      // invalidate the eTag to prevent extraneous calls to _verifyAllChunksUploaded
      uploadedChunk.eTag = null;
    }
  }

  return invalidParts;
};

bs3u.Uploader.prototype._verifyAllChunksUploadedSuccess = function(attempts, response, ajax) {
  var uploader = this;

  if (response.target.status == 200) {
    var xml = response.target.responseXML;
    var parts = xml.getElementsByTagName("Part");
    var totalParts = Object.keys(uploader._chunks).length;

    var invalidParts = uploader._collectInvalidChunks(parts);

    if (totalParts != parts.length) {
      uploader._log("Some chunks are missing. Attempting to re-upload them.");
      uploader._handleMissingChunks(parts);
    } else if (invalidParts.length > 0) {
      uploader._log("Some chunks are invalid. Attempting to re-upload them.");
      uploader._handleInvalidChunks(invalidParts);
    } else {
      uploader._log("All chunks have been uploaded");
      uploader._getCompleteHeaders();
    }

  } else {
    uploader._log("Chunk verification has failed. Deferring to error handler");
    uploader._verifyAllChunksUploadedError(attempts, response, ajax);
  }
};

// Call to the provided signature backend to get the complete headers.
// The response should contain all necessary headers to authenticate the request.
bs3u.Uploader.prototype._getCompleteHeaders = function(retries) {
  var uploader = this;
  var attempts = retries || 0;

  uploader._log("Getting the complete headers");

  var payload = uploader._generateCompletePayload();

  var success = function(encrypted) {
    var ajax = new bs3u.Ajax({
      url: uploader.settings.signatureBackend + uploader.settings.completeHeadersPath,
      method: "GET",
      params: {
        key: uploader.settings.key,
        content_type: uploader.settings.contentType,
        payload: encrypted,
        region: uploader.settings.region,
        upload_id: uploader._uploadId,
        host: uploader.settings.host,
      },
      headers: uploader.settings.customHeaders,
    });

    ajax.onSuccess(function(response) {
      uploader._getCompleteHeadersSuccess(attempts, response, ajax);
    });

    ajax.onError(function(response) {
      uploader._getCompleteHeadersError(attempts, response, ajax);
    });

    ajax.onTimeout(function(response) {
      uploader._getCompleteHeadersError(attempts, response, ajax);
    });

    ajax.send();
    uploader._XHRs.push(ajax);
  };

  var failure = function(error) {
    uploader._getCompleteHeadersError(attempts, error, {});
  };

  uploader._encryptText(payload, success, failure);
};

bs3u.Uploader.prototype._getCompleteHeadersSuccess = function(attempts, response, ajax) {
  var uploader = this;
  if (response.target.status == 200) {
    uploader._log("complete headers retrieved");
    uploader._completeHeaders = JSON.parse(response.target.responseText);
    uploader._completeUpload();
  } else {
    uploader._log("Server returned a non-200. Deferring to error handler!");
    uploader._getCompleteHeadersError(attempts, response, ajax);
  }
};

bs3u.Uploader.prototype._getCompleteHeadersError = function(attempts, response, ajax) {
  var uploader = this;
  var data = uploader._formatErrorForAction('getCompleteHeaders', response, ajax);

  if (uploader._retryAvailable(attempts)) {
    attempts += 1;
    uploader._log("Attempting to retry retrieval of complete headers.");
    setTimeout(function() {
      uploader._notifyUploadRetry(attempts, data);
      uploader._getCompleteHeaders(attempts);
    }, uploader._timeToWaitBeforeNextRetry(attempts));
  } else {
    var errorCode = 10;
    uploader._notifyUploadError(errorCode, uploader.errors[errorCode], data);
    uploader._setFailed();
    uploader._log("Uploader error!", uploader.errors[errorCode]);
  }
};

bs3u.Uploader.prototype._verifyAllChunksUploadedError = function(attempts, response, ajax) {
  var uploader = this;
  var data = uploader._formatErrorForAction('verifyAllChunksUploaded', response, ajax);

  if (uploader._retryAvailable(attempts)) {
    attempts += 1;
    uploader._log("Retrying chunk verification");
    setTimeout(function() {
      uploader._notifyUploadRetry(attempts, data);
      uploader._getListHeaders(attempts);
    }, uploader._timeToWaitBeforeNextRetry(attempts));
  } else {
    var errorCode = 6;
    uploader._notifyUploadError(errorCode, uploader.errors[errorCode], data);
    uploader._setFailed();
    uploader._log("Uploader error!", uploader.errors[errorCode]);
  }
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
  uploader._log("Resuming the complete watcher.");
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

  uploader._log("Resuming the complete watcher.");
  uploader._pauseCompleteWatcher = false;
};

bs3u.Uploader.prototype._generateCompletePayload = function() {
  var uploader = this;

  var body = "<CompleteMultipartUpload>";
  var totalChunks = Object.keys(uploader._chunks);
  var chunkNumber;
  // Order is important here, so iterating "the old fashioned way" to make sure
  // we maintain ascending order for this payload.
  for (var i = 0; i < totalChunks.length; i++) {
    chunkNumber = i + 1;
    body += "<Part>";
    body += "<PartNumber>" + chunkNumber + "</PartNumber>";
    body += "<ETag>" + uploader._chunks[chunkNumber].eTag + "</ETag>";
    body += "</Part>";
  }
  body += "</CompleteMultipartUpload>";
  return body;
};

// Completes the multipart upload, effectively assembling all chunks together
// into one file.
bs3u.Uploader.prototype._completeUpload = function(retries) {
  var uploader = this;
  var attempts = retries || 0;

  uploader._log("About to complete the upload");

  var body = uploader._generateCompletePayload();

  var ajax = new bs3u.Ajax({
    url: uploader.settings.host + "/" + uploader.settings.key,
    method: "POST",
    params: {
      uploadId: uploader._uploadId
    },
    headers: uploader._completeHeaders
  });

  ajax.onSuccess(function(response) {
    uploader._completeUploadSuccess(attempts, response, ajax);
  });

  ajax.onError(function(response) {
    uploader._completeUploadError(attempts, response, ajax);
  });

  ajax.onTimeout(function(response) {
    uploader._completeUploadError(attempts, response, ajax);
  });

  ajax.send(body);
  uploader._XHRs.push(ajax);
};

bs3u.Uploader.prototype._completeUploadSuccess = function(attempts, response, ajax) {
  var uploader = this;
  if (response.target.status == 200) {
    var xml = response.target.responseXML;
    var location = xml.getElementsByTagName('Location')[0].textContent;
    if (location) {
      uploader._log("The upload has completed!");
      uploader._notifyUploadComplete(location);
      uploader._setComplete();
      uploader._abortAllXHRs();
    }
  } else {
    uploader._log("Unable to complete the uploader. Deferring to error handler");
    uploader._completeUploadError(attempts, response, ajax);
  }
};

bs3u.Uploader.prototype._completeUploadError = function(attempts, response, ajax) {
  var uploader = this;
  var data = uploader._formatErrorForAction('completeUpload', response, ajax);

  if (uploader._retryAvailable(attempts)) {
    attempts += 1;
    uploader._log("Attempting to retry upload completion");
    setTimeout(function() {
      uploader._notifyUploadRetry(attempts, data);
      uploader._getCompleteHeaders(attempts);
    }, uploader._timeToWaitBeforeNextRetry(attempts));
  } else {
    var errorCode = 8;
    uploader._notifyUploadError(errorCode, uploader.errors[errorCode], data);
    uploader._setFailed();
    uploader._log("Uploader error!", uploader.errors[errorCode]);
  }
};

// Returns true if attemts is less than maxRetries. Note that the first attempt
// (a non-retry attempt) is not counted.
bs3u.Uploader.prototype._retryAvailable = function(attempts) {
  var uploader = this;
  if (uploader._isCancelled() || uploader._isFailed()) {
    return false;
  }
  return attempts < uploader.settings.maxRetries;
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
    if (chunk.uploading === true) {
      count += 1;
    }
  }

  return count;
};

// Monitors chunk uploads and attempts to complete the upload
bs3u.Uploader.prototype._startCompleteWatcher = function() {
  var uploader = this;
  uploader._log("Starting the complete watcher interval");

  var id = setInterval(function() {
    if (!uploader._isUploading()) {
      uploader._log("Stopping the complete watcher interval");
      clearInterval(id);
      return;
    }

    if (uploader._pauseCompleteWatcher) {
      uploader._log("Complete watcher is paused. Waiting...");
      return;
    }

    if (uploader._allETagsAvailable()) {
      uploader._log("Pausing the complete watcher.");
      uploader._pauseCompleteWatcher = true;
      // get the list headers to verify the chunks are on the server
      uploader._getListHeaders();
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
  uploader._log("Starting bandwidth monitor");
  var initialMaxChunks = uploader.settings.maxConcurrentChunks;
  var monitorStartTime = new Date().getTime();
  var newConcurrentChunks;

  // calculate the number of possible concurrent chunks based on upload speed.
  var id = setInterval(function(){
    if (!uploader._isUploading()) {
      uploader._log("Stopping the bandwidth monitor");
      clearInterval(id);
      return;
    }

    newConcurrentChunks = uploader._calculateOptimalConcurrentChunks(monitorStartTime, initialMaxChunks);
    uploader._log("Optimal concurrent chunks for connection is ", newConcurrentChunks);
    uploader._log("Number of concurrent uploads in progress is ", uploader._chunkUploadsInProgress());
    uploader.settings.maxConcurrentChunks = newConcurrentChunks;

    if (newConcurrentChunks < uploader._chunkUploadsInProgress()) {
      uploader._log("There are more concurrent uploads than your connection can support. Stopping some XHRs.");
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
  uploader._log("Calculated average upload speed is " + speed + " KB/s");
  var chunkSize = uploader.settings.chunkSize;
  // Needed speed to upload a single chunk within the signature timeout
  var neededSpeed = (chunkSize / bs3u.constants.FIFTEEN_MINUTES);
  var count = parseInt((speed / neededSpeed), 10);

  return Math.max(Math.min(count, initialMaxChunks), 1);
};

bs3u.Uploader.prototype._abortChunkUpload = function(number) {
  var uploader = this;
  var chunkXHR = uploader._chunkXHRs[number];
  var signatureXHR = uploader._chunkSignatureXHRs[number];
  var chunk = uploader._chunks[number];

  uploader._log("Cancelling the upload for chunk ", number);
  // Stop the chunk XHR if it exists
  if (chunkXHR) {
    chunkXHR.abort();
  }

  // Stop the XHR to fetch a chunk signature if it exists
  if (signatureXHR) { signatureXHR.abort(); }

  // Flag the chunk as not uploading
  chunk.uploading = false;
  chunk.uploadComplete = false;
};

bs3u.Uploader.prototype._timeToWaitBeforeNextRetry = function(attempts) {
  var uploader = this;
  return uploader.settings.retryWaitTime * attempts;
};

bs3u.Uploader.prototype._calculateUploadProgress = function() {
  var uploader = this;
  var loaded = 0;
  for (var chunkNumber in uploader._chunkProgress) {
    loaded += uploader._chunkProgress[chunkNumber];
  }
  return loaded;
};

// State-related methods
bs3u.Uploader.prototype._setReady = function() {
  var uploader = this;
  uploader._status = "ready";
};

bs3u.Uploader.prototype._isReady = function() {
  var uploader = this;
  return uploader._status == "ready";
};

bs3u.Uploader.prototype._setUploading = function() {
  var uploader = this;
  uploader._status = "uploading";
};

bs3u.Uploader.prototype._isUploading = function() {
  var uploader = this;
  return uploader._status == "uploading";
};

bs3u.Uploader.prototype._setComplete = function() {
  var uploader = this;
  uploader._status = "complete";
};

bs3u.Uploader.prototype._isComplete = function() {
  var uploader = this;
  return uploader._status == "complete";
};

bs3u.Uploader.prototype._setCancelled = function() {
  var uploader = this;
  uploader._status = "cancelled";
};

bs3u.Uploader.prototype._isCancelled = function() {
  var uploader = this;
  return uploader._status == "cancelled";
};

bs3u.Uploader.prototype._setFailed = function() {
  var uploader = this;
  uploader._status = "failed";
  // stop any outstanding XHR requests
  uploader._abortAllXHRs();
};

bs3u.Uploader.prototype._isFailed = function() {
  var uploader = this;
  return uploader._status == "failed";
};

// Notification that the uploader is initialized. Calls the user-defined "onReady"
// method.
bs3u.Uploader.prototype._notifyUploaderReady = function() {
  var uploader = this;
  uploader.settings.onReady.call(uploader);
};

// Notification that the uploader has started uploading chunks. Calls the user-defined
// onStart method.
bs3u.Uploader.prototype._notifyUploadStarted = function() {
  var uploader = this;
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
  uploader.settings.onComplete.call(uploader, location);
};

// Notifies that an error has occurred with the uploader. Calls the user-defined
// onError method, sending in the error code and description
bs3u.Uploader.prototype._notifyUploadError = function(errorCode, description, data) {
  var uploader = this;
  // If the uploader has already been set to failed, this message has already been
  // sent so we will want to prevent duplicate publishes of this event.
  if (!uploader._isFailed()) {
    uploader.settings.onError.call(uploader, errorCode, description, data);
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
  uploader.settings.onCancel.call(uploader);
};

// Using the FileReader API, this method attempts to open the file and read the
// first few bytes. This method accepts a callback and then calls it with the result
// of the check.
bs3u.Uploader.prototype._validateFileIsReadable = function(callback) {
  var uploader = this;
  var file = uploader.file;
  var blob = file.slice(0, 1024);
  var fr = new FileReader();

  fr.onloadend = function() {
    if (fr.error) {
      callback(false);
    } else {
      callback(true);
    }
    fr = undefined;
  };

  try {
    fr.readAsArrayBuffer(blob);
  } catch(error) {
    callback(false);
  }
};

// Encrypts the provided text, either with the help from web workers or not,
// and then executes the provided callback with the encrypted text.
bs3u.Uploader.prototype._encryptText = function(value, success, error) {
  var uploader = this;
  if (uploader.settings.useWebWorkers) {
    var worker = new Worker(uploader.settings.workerFilePath);
    worker.onmessage = function(e) {
      success(e.data);
    };
    worker.onerror = function(e) {
      uploader._log("Worker error: ", e);
      error({ target: { status: 500, responseText: "There was a Worker error: " + e.message} });
    };
    worker.postMessage({
      text: value,
      uploaderFilePath: uploader.settings.uploaderFilePath
    });
  } else {
    success(uploader._sha256(value));
  }
};

bs3u.Uploader.prototype._sha256 = function(value) {
  return asmCrypto.SHA256.hex(value);
};

bs3u.Uploader.prototype._defaultHost = function() {
  var uploader = this;
  return uploader.settings.protocol + uploader.settings.bucket + "." + "s3-" + uploader.settings.region + ".amazonaws.com";
};

bs3u.Uploader.prototype._formatErrorForAction = function(action, response, ajax) {
  return {
    action: action,
    requestInfo: {
      headers: ajax.headers,
      url: ajax.url,
      method: ajax.method,
      body: ajax.body
    },
    responseInfo: {
      status: response.target.status,
      responseText: response.target.responseText,
    }
  };
};

bs3u.Uploader.prototype._log = function(msg, object) {
  if (!this.settings.log) { return; }
  msg = "[BasicS3Uploader] " + msg;
  this.settings.onLog(msg, object);

  if (console && console.debug) {
    if (object !== undefined) {
      console.debug(msg, object);
    } else {
      console.debug(msg);
    }
  }
};

bs3u.Uploader.prototype.errors = {
  // code: description
  0: "The file could not be uploaded because it exceeds the maximum file size allowed.",
  1: "The file could not be uploaded because it cannot be read",
  2: "Max number of retries have been met. Unable to get init headers!",
  3: "Max number of retries have been met. Unable to initiate an upload request!",
  4: "Max number of retries have been met. Unable to get chunk headers!",
  5: "Max number of retries have been met. Upload of chunk has failed!",
  6: "Max number of retries have been met. Unable to verify all chunks have uploaded!",
  7: "Max number of retries has been met. Cannot retry uploading chunk!",
  8: "Max number of retries have been met. Unable to complete multipart upload!",
  9: "Max number of retries have been met. Unable to get list headers!",
  10: "Max number of retries have been met. Unable to get complete headers!"
};

// For backwards compatibility
var BasicS3Uploader = bs3u.Uploader;
