describe("bs3u.Uploader", function() {
  var mockAjax;
  beforeEach(function() {
    mockAjax = {};
    mockAjax.send = function(data) {};
    mockAjax.onSuccess = function(callback) {};
    mockAjax.onError = function(callback) {};
    mockAjax.onTimeout = function(callback) {};
    mockAjax.onProgress = function(callback) {};
    spyOn(mockAjax, 'send');
    spyOn(mockAjax, 'onSuccess');
    spyOn(mockAjax, 'onError');
    spyOn(mockAjax, 'onTimeout');
    spyOn(mockAjax, 'onProgress');
    spyOn(bs3u, 'Ajax').and.returnValue(mockAjax);
  });

  it("should also be referred to as BasicS3Uploader", function() {
    expect(bs3u.Uploader).toEqual(BasicS3Uploader);
  });

  describe("constructor", function() {
    var uploader, mockFile, mockSettings;

    beforeEach(function() {
      mockFile = {name: "testfile", size: 1000};
      mockSettings = {};

      spyOn(bs3u.Uploader.prototype, '_configureUploader').and.callThrough();
      spyOn(bs3u.Uploader.prototype, '_notifyUploaderReady').and.callThrough();
      spyOn(bs3u.Uploader.prototype, '_setReady').and.callThrough();

      uploader = new bs3u.Uploader(mockFile, mockSettings);
    });

    it("stores the provided file on the uploader", function() {
      expect(uploader.file).toEqual(mockFile);
    });

    it("creates a hash to hold all chunk XHR requests", function() {
      expect(uploader._chunkXHRs).toEqual({});
    });

    it("creates an array to hold all other XHR requests", function() {
      expect(uploader._XHRs).toEqual([]);
    });

    it("creates a hash to hold chunk upload progress", function() {
      expect(uploader._chunkProgress).toEqual({});
    });

    it("creates a hash to hold init headers", function() {
      expect(uploader._initHeaders).toEqual({});
    });

    it("creates a hash to hold chunk headers", function() {
      expect(uploader._chunkHeaders).toEqual({});
    });

    it("creates a hash to hold list headers", function() {
      expect(uploader._listHeaders).toEqual({});
    });

    it("creates a hash to hold complete headers", function() {
      expect(uploader._completeHeaders).toEqual({});
    });

    it("configures the uploader using the provided settings", function() {
      expect(bs3u.Uploader.prototype._configureUploader).toHaveBeenCalled();
    });

    it("notifies that the uploader is ready", function() {
      expect(bs3u.Uploader.prototype._notifyUploaderReady).toHaveBeenCalled();
    });

    it("sets the uploader status to ready", function() {
      expect(bs3u.Uploader.prototype._setReady).toHaveBeenCalled();
    });

  });

  describe("_configureUploader", function() {
    var uploader, mockFile, mockSettings;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {
        contentType: "video/quicktime",
        chunkSize: 1024 * 1024 * 7,
        encrypted: true,
        maxRetries: 5,
        maxFileSize: 10000,
        retryWaitTime: 3000,
        acl: "private",
        signatureBackend: "/",
        initHeadersPath: "initSignature",
        listHeadersPath: "listSignature",
        chunkHeadersPath: "chunkSignature",
        completeHeadersPath: "completeSignature",
        bucket: "my-bucket",
        region: "us-east-1",
        ssl: true,
        host: "http://my-fake-host.com",
        log: true,
        customHeaders: { "X-Test-Header": "True" },
        maxConcurrentChunks: 5,
        usingCloudFront: true,
        useWebWorkers: true,
        uploaderFilePath: "/path/to/uploader.js",
        workerFilePath: "/path/to/worker.js",
        key: "my-key-for-this-upload",
        onReady: function() {},
        onStart: function() {},
        onProgress: function(loaded, total) {},
        onChunkUploaded: function(chunkNumber, totalChunks) {},
        onComplete: function(location) {},
        onError: function(code, message) {},
        onRetry: function(attempts, data) {},
        onCancel: function() {},
        onLog: function(message, object) {},
      };

      spyOn(window, 'Date').and.returnValue({
        getTime: function() { return "timestamp"; }
      });

    });

    it("accepts settings from the user and merges them onto the uploader's settings", function() {
      uploader = new bs3u.Uploader(mockFile, mockSettings);

      expect(uploader.settings.contentType).toEqual(mockSettings.contentType);
      expect(uploader.settings.chunkSize).toEqual(mockSettings.chunkSize);
      expect(uploader.settings.encrypted).toEqual(mockSettings.encrypted);
      expect(uploader.settings.maxRetries).toEqual(mockSettings.maxRetries);
      expect(uploader.settings.retryWaitTime).toEqual(mockSettings.retryWaitTime);
      expect(uploader.settings.maxFileSize).toEqual(mockSettings.maxFileSize);
      expect(uploader.settings.acl).toEqual(mockSettings.acl);
      expect(uploader.settings.signatureBackend).toEqual(mockSettings.signatureBackend);
      expect(uploader.settings.initHeadersPath).toEqual(mockSettings.initHeadersPath);
      expect(uploader.settings.listHeadersPath).toEqual(mockSettings.listHeadersPath);
      expect(uploader.settings.chunkHeadersPath).toEqual(mockSettings.chunkHeadersPath);
      expect(uploader.settings.completeHeadersPath).toEqual(mockSettings.completeHeadersPath);
      expect(uploader.settings.bucket).toEqual(mockSettings.bucket);
      expect(uploader.settings.ssl).toEqual(mockSettings.ssl);
      expect(uploader.settings.host).toEqual(mockSettings.host);
      expect(uploader.settings.region).toEqual(mockSettings.region);
      expect(uploader.settings.log).toEqual(mockSettings.log);
      expect(uploader.settings.customHeaders).toEqual(mockSettings.customHeaders);
      expect(uploader.settings.maxConcurrentChunks).toEqual(mockSettings.maxConcurrentChunks);
      expect(uploader.settings.usingCloudFront).toEqual(mockSettings.usingCloudFront);
      expect(uploader.settings.useWebWorkers).toEqual(mockSettings.useWebWorkers);
      expect(uploader.settings.uploaderFilePath).toEqual(mockSettings.uploaderFilePath);
      expect(uploader.settings.workerFilePath).toEqual(mockSettings.workerFilePath);
      expect(uploader.settings.key).toEqual(mockSettings.key);
      expect(uploader.settings.onReady).toEqual(mockSettings.onReady);
      expect(uploader.settings.onStart).toEqual(mockSettings.onStart);
      expect(uploader.settings.onProgress).toEqual(mockSettings.onProgress);
      expect(uploader.settings.onChunkUploaded).toEqual(mockSettings.onChunkUploaded);
      expect(uploader.settings.onComplete).toEqual(mockSettings.onComplete);
      expect(uploader.settings.onError).toEqual(mockSettings.onError);
      expect(uploader.settings.onRetry).toEqual(mockSettings.onRetry);
      expect(uploader.settings.onCancel).toEqual(mockSettings.onCancel);
      expect(uploader.settings.onLog).toEqual(mockSettings.onLog);
    });

    it("provides a default for several options if no value was provided", function() {
      uploader = new bs3u.Uploader(mockFile, {});

      expect(uploader.settings.contentType).toEqual(mockFile.type);
      expect(uploader.settings.chunkSize).toEqual(1024 * 1024 * 10);
      expect(uploader.settings.encrypted).toBeFalsy();
      expect(uploader.settings.maxRetries).toEqual(5);
      expect(uploader.settings.maxFileSize).toEqual(1024 * 1024 * 1024 * 1024 * 5);
      expect(uploader.settings.acl).toEqual("public-read");
      expect(uploader.settings.signatureBackend).toEqual("");
      expect(uploader.settings.initHeadersPath).toEqual("/get_init_headers");
      expect(uploader.settings.listHeadersPath).toEqual("/get_list_headers");
      expect(uploader.settings.completeHeadersPath).toEqual("/get_complete_headers");
      expect(uploader.settings.chunkHeadersPath).toEqual("/get_chunk_headers");
      expect(uploader.settings.bucket).toEqual("your-bucket-name");
      expect(uploader.settings.ssl).toBeFalsy();
      expect(uploader.settings.region).toEqual("your-region");
      expect(uploader.settings.host).toEqual("http://" + uploader.settings.bucket + "." + "s3-" + uploader.settings.region + ".amazonaws.com");
      expect(uploader.settings.log).toBeFalsy();
      expect(uploader.settings.customHeaders).toEqual({});
      expect(uploader.settings.maxConcurrentChunks).toEqual(5);
      expect(uploader.settings.key).toEqual("timestamp_" + uploader.file.name);
      expect(uploader.settings.usingCloudFront).toBeFalsy();
      expect(uploader.settings.useWebWorkers).toBeFalsy();
      expect(uploader.settings.uploaderFilePath).toEqual("/basic_s3_uploader.js");
      expect(uploader.settings.workerFilePath).toEqual("/basic_s3_worker.js");
      expect(uploader.settings.retryWaitTime).toEqual(2000);
      expect(uploader.settings.onReady).toBeDefined();
      expect(uploader.settings.onStart).toBeDefined();
      expect(uploader.settings.onProgress).toBeDefined();
      expect(uploader.settings.onChunkUploaded).toBeDefined();
      expect(uploader.settings.onComplete).toBeDefined();
      expect(uploader.settings.onError).toBeDefined();
      expect(uploader.settings.onRetry).toBeDefined();
      expect(uploader.settings.onCancel).toBeDefined();
    });

    it("sets the protocol to http:// if settings.ssl is false", function() {
      uploader = new bs3u.Uploader(mockFile, {
        ssl: false
      });
      expect(uploader.settings.protocol).toEqual("http://");
    });

    it("sets the protocol to https:// if settings.ssl is true", function() {
      uploader = new bs3u.Uploader(mockFile, {
        ssl: true
      });
      expect(uploader.settings.protocol).toEqual("https://");
    });

  });

  describe("startUpload", function() {
    var uploader, mockSettings, mockFile;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {};
      uploader = new bs3u.Uploader(mockFile, mockSettings);

      spyOn(uploader, '_getInitHeaders');
    });

    describe("when the uploader is already uploading", function() {
      beforeEach(function() {
        spyOn(uploader, '_isUploading').and.returnValue(true);

        uploader.startUpload();
      });

      it("does not get the init headers", function() {
        expect(uploader._getInitHeaders).not.toHaveBeenCalled();
      });
    });

    describe("when the uploader is not uploading", function() {
      beforeEach(function() {
        spyOn(uploader, '_isUploading').and.returnValue(false);
      });

      describe("and the file exceeds the max file size", function() {

        beforeEach(function() {
          uploader.settings.maxFileSize = 100;
          spyOn(uploader, '_notifyUploadError');
          spyOn(uploader, '_setFailed');
          uploader.startUpload();
        });

        it("does not get the init headers", function() {
          expect(uploader._getInitHeaders).not.toHaveBeenCalled();
        });

        it("notifies there was an upload error", function() {
          expect(uploader._notifyUploadError).toHaveBeenCalledWith(0, uploader.errors[0], {});
        });

        it("sets the upload to a failed state", function() {
          expect(uploader._setFailed).toHaveBeenCalled();
        });
      });

      describe("and the file does not exceed the max file size", function() {
        beforeEach(function() {
          uploader.settings.maxFileSize = 9999;
        });

        describe("and the file is not readable", function() {
          beforeEach(function() {
            spyOn(uploader, '_validateFileIsReadable').and.callFake(function(isValidCallback) {
              var validFile = false;
              isValidCallback(validFile);
            });

            spyOn(uploader, '_notifyUploadError');
            spyOn(uploader, '_setFailed');

            uploader.startUpload();
          });

          it("does not get the init headers", function() {
            expect(uploader._getInitHeaders).not.toHaveBeenCalled();
          });

          it("notifies there was an upload error", function() {
            expect(uploader._notifyUploadError).toHaveBeenCalledWith(1, uploader.errors[1], {});
          });

          it("sets the upload to a failed state", function() {
            expect(uploader._setFailed).toHaveBeenCalled();
          });
        });

        describe("and the file is readable", function() {
          beforeEach(function() {
            spyOn(uploader, '_validateFileIsReadable').and.callFake(function(isValidCallback) {
              var validFile = true;
              isValidCallback(validFile);
            });

            spyOn(uploader, "_createChunks");
            spyOn(uploader, "_notifyUploadStarted");
            spyOn(uploader, "_setUploading");

            uploader.startUpload();
          });

          it("slices up the file into chunks", function() {
            expect(uploader._createChunks).toHaveBeenCalled();
          });

          it("notifies that the upload has started", function() {
            expect(uploader._notifyUploadStarted).toHaveBeenCalled();
          });

          it("sets the uploader to an uploading state", function() {
            expect(uploader._setUploading).toHaveBeenCalled();
          });

          it("calls to get the init headers", function() {
            expect(uploader._getInitHeaders).toHaveBeenCalled();
          });
        });

      });
    });

  });

  describe("cancelUpload", function() {
    var uploader, mockSettings, mockFile,
    mockAjax1, mockAjax2, mockAjax3;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {};
      uploader = new bs3u.Uploader(mockFile, mockSettings);
      spyOn(uploader, '_abortAllXHRs');
      spyOn(uploader, '_notifyUploadCancelled');
      spyOn(uploader, '_setCancelled');
    });

    describe("when the uploader is not uploading", function() {
      beforeEach(function() {
        spyOn(uploader, '_isUploading').and.returnValue(false);

        uploader.cancelUpload();
      });

      it("does not abort any XHRs", function() {
        expect(uploader._abortAllXHRs).not.toHaveBeenCalled();
      });

      it("does not notify that the upload has been cancelled", function() {
        expect(uploader._notifyUploadCancelled).not.toHaveBeenCalled();
      });

      it("does not set the uploader to a cancelled state", function() {
        expect(uploader._setCancelled).not.toHaveBeenCalled();
      });
    });

    describe("when the uploader is uploading", function() {
      beforeEach(function() {
        spyOn(uploader, '_isUploading').and.returnValue(true);

        uploader.cancelUpload();
      });

      it("aborts any XHRs", function() {
        expect(uploader._abortAllXHRs).toHaveBeenCalled();
      });

      it("notifies that the upload has been cancelled", function() {
        expect(uploader._notifyUploadCancelled).toHaveBeenCalled();
      });

      it("sets the uploader to a cancelled state", function() {
        expect(uploader._setCancelled).toHaveBeenCalled();
      });

    });

  });

  describe("_abortAllXHRs", function() {
    var mockFile, mockSettings, uploader, abortSpy;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {};
      abortSpy = jasmine.createSpy();
      uploader = new bs3u.Uploader(mockFile, mockSettings);
    });

    it("aborts any non-chunk XHR requests", function() {
      uploader._XHRs = [ { abort: abortSpy } ];
      uploader._abortAllXHRs();
      expect(abortSpy).toHaveBeenCalled();
    });

    it("aborts any chunk XHR requests", function() {
      uploader._chunkXHRs = { 1: { abort: abortSpy } };
      uploader._abortAllXHRs();
      expect(abortSpy).toHaveBeenCalled();
    });
  });

  describe("_createChunks", function() {
    var uploader, mockFile, fileSize, mockSettings, tenMB;

    describe("when the file can be split into even chunks", function() {
      var chunk1, chunk2, chunk3, chunk4, chunk5;

      beforeEach(function() {
        tenMB = 1024 * 1024 * 10;
        fileSize = tenMB * 5; // 50 megabyte file;
        mockFile = { name: "myfile", type: "video/quicktime", size: fileSize };
        mockSettings = { maxChunkSize: tenMB };

        uploader = new bs3u.Uploader(mockFile, mockSettings);
        uploader._createChunks();

        chunk1 = uploader._chunks[1];
        chunk2 = uploader._chunks[2];
        chunk3 = uploader._chunks[3];
        chunk4 = uploader._chunks[4];
        chunk5 = uploader._chunks[5];
      });

      it("slices up the file into chunks", function() {
        expect(Object.keys(uploader._chunks).length).toEqual(5);
      });

      it("correctly calculates the chunk's startRange and endRage", function() {
        expect(chunk1.startRange).toEqual(0);
        expect(chunk1.endRange).toEqual(tenMB);

        expect(chunk2.startRange).toEqual(chunk1.endRange);
        expect(chunk2.endRange).toEqual(tenMB + chunk1.endRange);

        expect(chunk3.startRange).toEqual(chunk2.endRange);
        expect(chunk3.endRange).toEqual(tenMB + chunk2.endRange);

        expect(chunk4.startRange).toEqual(chunk3.endRange);
        expect(chunk4.endRange).toEqual(tenMB + chunk3.endRange);

        expect(chunk5.startRange).toEqual(chunk4.endRange);
        expect(chunk5.endRange).toEqual(tenMB + chunk4.endRange);
      });

      it("sets the 'uploading' and 'uploadCoplete' flags on each chunk to false", function() {
        expect(chunk1.uploading).toBeFalsy();
        expect(chunk1.uploadComplete).toBeFalsy();

        expect(chunk2.uploading).toBeFalsy();
        expect(chunk2.uploadComplete).toBeFalsy();

        expect(chunk3.uploading).toBeFalsy();
        expect(chunk3.uploadComplete).toBeFalsy();

        expect(chunk4.uploading).toBeFalsy();
        expect(chunk4.uploadComplete).toBeFalsy();

        expect(chunk5.uploading).toBeFalsy();
        expect(chunk5.uploadComplete).toBeFalsy();
      });
    });

    describe("when the file size is not evenly divisible by the chunk size", function() {
      describe("and the file size is smaller than the chunk size", function() {
        var chunk1;

        beforeEach(function() {
          tenMB = 1024 * 1024 * 10;
          fileSize = (tenMB / 2);
          mockFile = { name: "myfile", type: "video/quicktime", size: fileSize };
          mockSettings = { maxChunkSize: tenMB };

          uploader = new bs3u.Uploader(mockFile, mockSettings);
          uploader._createChunks();

          chunk1 = uploader._chunks[1];
        });

        it("slices up the file into chunks", function() {
          expect(Object.keys(uploader._chunks).length).toEqual(1);
        });

        it("correctly calculates the chunk's startRange and endRage", function() {
          expect(chunk1.startRange).toEqual(0);
          expect(chunk1.endRange).toEqual(fileSize);
        });

        it("sets the 'uploading' and 'uploadCoplete' flags on each chunk to false", function() {
          expect(chunk1.uploading).toBeFalsy();
          expect(chunk1.uploadComplete).toBeFalsy();
        });
      });

      describe("and there are remaining bytes leftover", function() {
        var chunk1, chunk2, chunk3, chunk4, chunk5;

        beforeEach(function() {
          tenMB = 1024 * 1024 * 10;
          fileSize = tenMB * 5.5; // 65 megabyte file;
          mockFile = { name: "myfile", type: "video/quicktime", size: fileSize };
          mockSettings = { maxChunkSize: tenMB };

          uploader = new bs3u.Uploader(mockFile, mockSettings);
          uploader._createChunks();

          chunk1 = uploader._chunks[1];
          chunk2 = uploader._chunks[2];
          chunk3 = uploader._chunks[3];
          chunk4 = uploader._chunks[4];
          chunk5 = uploader._chunks[5];
          chunk6 = uploader._chunks[6];
        });

        it("slices up the file into chunks", function() {
          expect(Object.keys(uploader._chunks).length).toEqual(6);
        });

        it("correctly calculates the chunk's startRange and endRage", function() {
          expect(chunk1.startRange).toEqual(0);
          expect(chunk1.endRange).toEqual(tenMB);

          expect(chunk2.startRange).toEqual(chunk1.endRange);
          expect(chunk2.endRange).toEqual(tenMB + chunk1.endRange);

          expect(chunk3.startRange).toEqual(chunk2.endRange);
          expect(chunk3.endRange).toEqual(tenMB + chunk2.endRange);

          expect(chunk4.startRange).toEqual(chunk3.endRange);
          expect(chunk4.endRange).toEqual(tenMB + chunk3.endRange);

          expect(chunk5.startRange).toEqual(chunk4.endRange);
          expect(chunk5.endRange).toEqual(tenMB + chunk4.endRange);

          expect(chunk6.startRange).toEqual(chunk5.endRange);
          // 5 megabytes are left for this chunk
          expect(chunk6.endRange).toEqual((tenMB / 2) + chunk5.endRange);
        });

        it("sets the 'uploading' and 'uploadCoplete' flags on each chunk to false", function() {
          expect(chunk1.uploading).toBeFalsy();
          expect(chunk1.uploadComplete).toBeFalsy();

          expect(chunk2.uploading).toBeFalsy();
          expect(chunk2.uploadComplete).toBeFalsy();

          expect(chunk3.uploading).toBeFalsy();
          expect(chunk3.uploadComplete).toBeFalsy();

          expect(chunk4.uploading).toBeFalsy();
          expect(chunk4.uploadComplete).toBeFalsy();

          expect(chunk5.uploading).toBeFalsy();
          expect(chunk5.uploadComplete).toBeFalsy();

          expect(chunk6.uploading).toBeFalsy();
          expect(chunk6.uploadComplete).toBeFalsy();
        });
      });
    });

  });

  describe("_getInitHeaders", function() {
    var mockFile, mockSettings, uploader;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {
        signatureBackend: "/signatures",
        initHeadersPath: "/get_init_headers",
        region: "us-east-1",
        key: "my-upload-key",
        contentType: "video/quicktime",
        bucket: "some-bucket",
        acl: "private",
        encrypted: false,
        customHeaders: { "X-Derp": "Yes" },
        maxRetries: 3
      };
      uploader = new bs3u.Uploader(mockFile, mockSettings);
    });

    it("creates and configures a new Ajax request", function() {
      uploader._getInitHeaders();
      expect(bs3u.Ajax).toHaveBeenCalled();

      ajaxSettings = bs3u.Ajax.calls.argsFor(0)[0];

      expect(ajaxSettings.url).toEqual(mockSettings.signatureBackend + mockSettings.initHeadersPath);
      expect(ajaxSettings.method).toEqual("GET");
      expect(ajaxSettings.headers).toEqual(mockSettings.customHeaders);
      expect(ajaxSettings.params.key).toEqual(mockSettings.key);
      expect(ajaxSettings.params.content_type).toEqual(mockSettings.contentType);
      expect(ajaxSettings.params.payload).toEqual(uploader._sha256(""));
      expect(ajaxSettings.params.region).toEqual(mockSettings.region);
      expect(ajaxSettings.params.acl).toEqual(mockSettings.acl);
      expect(ajaxSettings.params.encrypted).toEqual(mockSettings.encrypted);
      expect(ajaxSettings.params.host).toEqual(uploader.settings.host);
    });

    it("registers the success callback", function() {
      spyOn(uploader, '_getInitHeadersSuccess');
      var attempts = 1;
      uploader._getInitHeaders(attempts);
      var callback = mockAjax.onSuccess.calls.argsFor(0)[0];
      var mockResponse = { target: { status: 200 } };
      callback(mockResponse);
      expect(uploader._getInitHeadersSuccess).toHaveBeenCalledWith(attempts, mockResponse, mockAjax);
    });

    it("registers the error callback", function() {
      spyOn(uploader, '_getInitHeadersError');
      var attempts = 1;
      uploader._getInitHeaders(attempts);
      var callback = mockAjax.onError.calls.argsFor(0)[0];
      var mockResponse = { target: { status: 500 } };
      callback(mockResponse);
      expect(uploader._getInitHeadersError).toHaveBeenCalledWith(attempts, mockResponse, mockAjax);
    });

    it("registers the timeout callback", function() {
      spyOn(uploader, '_getInitHeadersError');
      var attempts = 1;
      uploader._getInitHeaders(attempts);
      var callback = mockAjax.onTimeout.calls.argsFor(0)[0];
      var mockResponse = { target: { status: 500 } };
      callback(mockResponse);
      expect(uploader._getInitHeadersError).toHaveBeenCalledWith(attempts, mockResponse, mockAjax);
    });

    it("sends the request", function() {
      uploader._getInitHeaders();
      expect(mockAjax.send).toHaveBeenCalled();
    });

    it("pushes the xhr request into the _XHRs array", function() {
      uploader._getInitHeaders();
      expect(uploader._XHRs[0]).toEqual(mockAjax);
    });
  });

  describe("_getInitHeadersSuccess", function() {
    var uploader, mockFile, mockSettings, mockResponse, attempts;

    beforeEach(function() {
      attempts = 0;
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {
        signatureBackend: "/signatures",
        initHeadersPath: "/get_init_headers",
        key: "my-upload-key",
        contentType: "video/quicktime",
        bucket: "some-bucket",
        acl: "private",
        encrypted: false,
        customHeaders: { "X-Derp": "Yes" },
        maxRetries: 3
      };
      uploader = new bs3u.Uploader(mockFile, mockSettings);
    });

    describe("a 200 response", function() {
      beforeEach(function() {
        mockResponse = {
          target: {
            status: 200,
            responseText: "{\"Authorization\": \"auth-header\", \"x-amz-date\": \"date\"}"
          }
        };
        spyOn(uploader, '_initiateUpload');
        uploader._getInitHeadersSuccess(attempts, mockResponse, mockAjax);
      });

      it("parses and stores the init headers from the response body", function() {
        expect(uploader._initHeaders).toEqual(JSON.parse(mockResponse.target.responseText));
      });

      it("initiates the upload", function() {
        expect(uploader._initiateUpload).toHaveBeenCalled();
      });
    });

    describe("a non-200 response", function() {
      beforeEach(function() {
        mockResponse = {
          target: {
            status: 500
          }
        };
        spyOn(uploader, '_getInitHeadersError');
        uploader._getInitHeadersSuccess(attempts, mockResponse, mockAjax);
      });

      it("calls the error handler", function() {
        expect(uploader._getInitHeadersError).toHaveBeenCalledWith(attempts, mockResponse, mockAjax);
      });
    });
  });

  describe("_getInitHeadersError", function() {
    var uploader, mockFile, mockSettings, mockResponse, attempts;

    beforeEach(function() {
      attempts = 2;
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockResponse = {
        target: {
          status: 500
        }
      };
      mockSettings = {
        signatureBackend: "/signatures",
        initHeadersPath: "/get_init_headers",
        key: "my-upload-key",
        contentType: "video/quicktime",
        bucket: "some-bucket",
        acl: "private",
        encrypted: false,
        customHeaders: { "X-Derp": "Yes" },
        maxRetries: 3
      };
      spyOn(window, 'setTimeout').and.callFake(function(callback, time) {
        callback();
      });

      uploader = new bs3u.Uploader(mockFile, mockSettings);
    });

    describe("when a retry is available", function() {
      beforeEach(function() {
        spyOn(uploader, '_notifyUploadRetry');
        spyOn(uploader, '_getInitHeaders');
        spyOn(uploader, '_retryAvailable').and.returnValue(true);
        uploader._getInitHeadersError(attempts, mockResponse, mockAjax);
      });

      it("notifies about the retry", function() {
        expect(uploader._notifyUploadRetry).toHaveBeenCalledWith(
          attempts + 1,
          uploader._formatErrorForAction('getInitHeaders', mockResponse, mockAjax)
        );
      });

      it("calls _getInitHeaders with attempts incremented by 1", function() {
        expect(uploader._getInitHeaders).toHaveBeenCalledWith(attempts + 1);
      });
    });

    describe("when no retries are available", function() {
      beforeEach(function() {
        spyOn(uploader, '_notifyUploadError');
        spyOn(uploader, '_setFailed');
        spyOn(uploader, '_retryAvailable').and.returnValue(false);
        uploader._getInitHeadersError(attempts, mockResponse, mockAjax);
      });

      it("notifies about the upload error", function() {
        expect(uploader._notifyUploadError).toHaveBeenCalledWith(
          2,
          uploader.errors[2],
          uploader._formatErrorForAction('getInitHeaders', mockResponse, mockAjax)
        );
      });

      it("sets the uploader to a failed state", function() {
        expect(uploader._setFailed).toHaveBeenCalled();
      });
    });
  });

  describe("_initiateUpload", function() {
    var mockFile, mockSettings, uploader;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {
        host: 'some-host',
        key: "my-upload-key",
        acl: "private",
        encrypted: false,
        maxRetries: 3,
      };
      uploader = new bs3u.Uploader(mockFile, mockSettings);
    });

    it("adds the XHR object to the _XHRs array", function() {
      expect(uploader._XHRs.length).toEqual(0);
      uploader._initiateUpload();
      expect(uploader._XHRs[0]).toEqual(mockAjax);
    });

    describe("ajax settings", function() {
      var ajaxSettings;

      beforeEach(function() {
        uploader._initHeaders = { Authorization: "auth headers" };
      });

      it("properly configures the url, method, and headers for the call", function() {
        uploader._initiateUpload();
        ajaxSettings = bs3u.Ajax.calls.argsFor(0)[0];

        expect(ajaxSettings.url).toEqual("some-host/my-upload-key?uploads");
        expect(ajaxSettings.method).toEqual("POST");
        expect(ajaxSettings.headers).toEqual(uploader._initHeaders);
      });
    });

    it("registers the success callback", function() {
      spyOn(uploader, '_initiateUploadSuccess');
      var attempts = 1;
      uploader._initiateUpload(attempts);
      var callback = mockAjax.onSuccess.calls.argsFor(0)[0];
      var mockResponse = { target: { status: 200 } };
      callback(mockResponse);
      expect(uploader._initiateUploadSuccess).toHaveBeenCalledWith(attempts, mockResponse, mockAjax);
    });

    it("registers the error callback", function() {
      spyOn(uploader, '_initiateUploadError');
      var attempts = 1;
      uploader._initiateUpload(attempts);
      var callback = mockAjax.onError.calls.argsFor(0)[0];
      var mockResponse = { target: { status: 500 } };
      callback(mockResponse);
      expect(uploader._initiateUploadError).toHaveBeenCalledWith(attempts, mockResponse, mockAjax);
    });

    it("registers the timeout callback", function() {
      spyOn(uploader, '_initiateUploadError');
      var attempts = 1;
      uploader._initiateUpload(attempts);
      var callback = mockAjax.onTimeout.calls.argsFor(0)[0];
      var mockResponse = { target: { status: 500 } };
      callback(mockResponse);
      expect(uploader._initiateUploadError).toHaveBeenCalledWith(attempts, mockResponse, mockAjax);
    });

    it("sends the ajax request", function() {
      uploader._initiateUpload();
      expect(mockAjax.send).toHaveBeenCalled();
    });
  });

  describe("_initiateUploadSuccess", function() {
    var uploader, mockSettings, mockFile, attempts;

    beforeEach(function() {
      attempts = 1;
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {
        host: 'some-host',
        key: "my-upload-key",
        acl: "private",
        encrypted: false,
        maxRetries: 3,

      };
      uploader = new bs3u.Uploader(mockFile, mockSettings);
    });

    describe("a 200 response", function() {
      var mockResponse, xml;

      beforeEach(function() {
        xml = new DOMParser().parseFromString("<SomeResponse><UploadId>the-upload-id</UploadId></SomeResponse>","text/xml");
        mockResponse = {
          target: {
            status: 200,
            responseXML: xml
          }
        };
        spyOn(uploader, '_startCompleteWatcher');
        spyOn(uploader, '_startBandwidthMonitor');
        uploader._initiateUploadSuccess(attempts, mockResponse, mockAjax);
      });

      it("stores the uploadId from the response xml", function() {
        expect(uploader._uploadId).toEqual('the-upload-id');
      });

      it("starts the complete watcher interval", function() {
        expect(uploader._startCompleteWatcher).toHaveBeenCalled();
      });

      it("starts the bandwidth monitor interval", function() {
        expect(uploader._startBandwidthMonitor).toHaveBeenCalled();
      });
    });

    describe("a non-200 response", function() {
      var mockResponse;

      beforeEach(function() {
        spyOn(uploader, '_initiateUploadError');
        mockResponse = {
          target: {
            status: 400
          }
        };
        uploader._initiateUploadSuccess(attempts, mockResponse, mockAjax);
      });

      it("calls the error handler", function() {
        expect(uploader._initiateUploadError).toHaveBeenCalledWith(attempts, mockResponse, mockAjax);
      });
    });
  });

  describe("_initiateUploadError", function() {
    var uploader, mockFile, mockSettings, mockResponse, attempts;

    beforeEach(function() {
      attempts = 2;
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockResponse = {
        target: {
          status: 500
        }
      };
      mockSettings = {
        signatureBackend: "/signatures",
        initHeadersPath: "/get_init_headers",
        key: "my-upload-key",
        contentType: "video/quicktime",
        bucket: "some-bucket",
        acl: "private",
        encrypted: false,
        customHeaders: { "X-Derp": "Yes" },
        maxRetries: 3
      };
      spyOn(window, 'setTimeout').and.callFake(function(callback, time) {
        callback();
      });

      uploader = new bs3u.Uploader(mockFile, mockSettings);
    });

    describe("when a retry is available", function() {
      beforeEach(function() {
        spyOn(uploader, '_notifyUploadRetry');
        spyOn(uploader, '_getInitHeaders');
        spyOn(uploader, '_retryAvailable').and.returnValue(true);
        uploader._initiateUploadError(attempts, mockResponse, mockAjax);
      });

      it("notifies about the retry", function() {
        expect(uploader._notifyUploadRetry).toHaveBeenCalledWith(
          attempts + 1,
          uploader._formatErrorForAction('initiateUpload', mockResponse, mockAjax)
        );
      });

      it("calls _initiateUpload with attempts incremented by 1", function() {
        expect(uploader._getInitHeaders).toHaveBeenCalledWith(attempts + 1);
      });
    });

    describe("when no retries are available", function() {
      beforeEach(function() {
        spyOn(uploader, '_notifyUploadError');
        spyOn(uploader, '_setFailed');
        spyOn(uploader, '_retryAvailable').and.returnValue(false);
        uploader._initiateUploadError(attempts, mockResponse, mockAjax);
      });

      it("notifies about the upload error", function() {
        expect(uploader._notifyUploadError).toHaveBeenCalledWith(
          3,
          uploader.errors[3],
          uploader._formatErrorForAction('initiateUpload', mockResponse, mockAjax)
        );
      });

      it("sets the uploader to a failed state", function() {
        expect(uploader._setFailed).toHaveBeenCalled();
      });

    });
  });

  describe("_uploadChunks", function() {
    var mockFile, uploader;

    beforeEach(function() {
      mockFile = {
        name: "myfile",
        type: "video/quicktime",
        size: 1000,
      };
      uploader = new bs3u.Uploader(mockFile, {});
      uploader._chunks = {
        1: { uploading: false, uploadComplete: false },
        2: { uploading: true, uploadComplete: false },
        3: { uploading: false, uploadComplete: true },
        4: { uploading: false, uploadComplete: false },
      };
      spyOn(uploader, '_getChunkHeaders');
    });

    describe("when there is an upload spot available", function() {
      beforeEach(function() {
        spyOn(uploader, '_uploadSpotAvailable').and.returnValue(true);
        uploader._uploadChunks();
      });

      it("uploads a chunk if its not already uploading and not already complete", function() {
        expect(uploader._getChunkHeaders.calls.count()).toEqual(2);
        expect(uploader._getChunkHeaders.calls.argsFor(0)[0]).toEqual(1);
        expect(uploader._getChunkHeaders.calls.argsFor(1)[0]).toEqual(4);
      });

      it("sets 'uploading' to true and 'uploadComplete' to false for chunks that have started uploading", function() {
        expect(uploader._chunks[1].uploading).toBeTruthy();
        expect(uploader._chunks[1].uploadComplete).toBeFalsy();
        expect(uploader._chunks[4].uploading).toBeTruthy();
        expect(uploader._chunks[4].uploadComplete).toBeFalsy();
      });
    });

    describe("when there is not an upload spot available", function() {
      beforeEach(function() {
        spyOn(uploader, '_uploadSpotAvailable').and.returnValue(false);
        uploader._uploadChunks();
      });

      it("won't upload any chunks", function() {
        expect(uploader._getChunkHeaders.calls.count()).toEqual(0);
      });
    });

  });

  describe("_getChunkHeaders", function() {
    var mockFile, mockSettings, uploader, mockFileReader, chunkNumber;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {
        signatureBackend: "/signatures",
        chunkHeadersPath: "/get_chunk_headers",
        region: "us-east-1",
        key: "my-upload-key",
        contentType: "video/quicktime",
        bucket: "some-bucket",
        acl: "private",
        encrypted: false,
        customHeaders: { "X-Derp": "Yes" },
        maxRetries: 3
      };
      uploader = new bs3u.Uploader(mockFile, mockSettings);
      uploader._chunks = {
        1: { startRange: 0, endRange: 1024, uploading: true, uploadComplete: false },
        2: { startRange: 0, endRange: 1024, uploading: true, uploadComplete: false },
      };
      chunkNumber = 2;
      uploader.file = {
        slice: function(start, end) { return "sliced blob"; }
      };
      uploader._uploadId = "some-upload-id";
      mockFileReader = {
        result: "arrayBuffer",
        readAsArrayBuffer: function(body) {}
      };
      spyOn(mockFileReader, 'readAsArrayBuffer');
      spyOn(window, 'FileReader').and.returnValue(mockFileReader);
    });

    it("reads the contents of the chunk in order to generate a content SHA", function() {
      uploader._getChunkHeaders(chunkNumber);
      expect(mockFileReader.readAsArrayBuffer).toHaveBeenCalledWith("sliced blob");
    });

    describe("once the file has been read", function() {
      it("creates and configures a new Ajax request", function() {
        uploader._getChunkHeaders(chunkNumber);
        mockFileReader.onloadend();
        expect(bs3u.Ajax).toHaveBeenCalled();

        ajaxSettings = bs3u.Ajax.calls.argsFor(0)[0];

        expect(ajaxSettings.url).toEqual(mockSettings.signatureBackend + mockSettings.chunkHeadersPath);
        expect(ajaxSettings.method).toEqual("GET");
        expect(ajaxSettings.headers).toEqual(mockSettings.customHeaders);
        expect(ajaxSettings.params.key).toEqual(mockSettings.key);
        expect(ajaxSettings.params.content_type).toEqual(mockSettings.contentType);
        expect(ajaxSettings.params.payload).toEqual(uploader._sha256("arrayBuffer"));
        expect(ajaxSettings.params.region).toEqual(mockSettings.region);
        expect(ajaxSettings.params.host).toEqual(uploader.settings.host);
        expect(ajaxSettings.params.upload_id).toEqual(uploader._uploadId);
        expect(ajaxSettings.params.part_number).toEqual(2);
      });

      it("does nothing if the chunk is not uploading", function() {
        uploader._chunks[chunkNumber].uploading = false;
        uploader._getChunkHeaders(chunkNumber);
        mockFileReader.onloadend();
        expect(bs3u.Ajax).not.toHaveBeenCalled();
      });

      it("registers the success callback", function() {
        spyOn(uploader, '_getChunkHeadersSuccess');
        var attempts = 1;
        uploader._getChunkHeaders(chunkNumber, attempts);
        mockFileReader.onloadend();
        var callback = mockAjax.onSuccess.calls.argsFor(0)[0];
        var mockResponse = { target: { status: 200 } };
        callback(mockResponse);
        expect(uploader._getChunkHeadersSuccess).toHaveBeenCalledWith(attempts, chunkNumber, mockResponse, mockAjax);
      });

      it("registers the error callback", function() {
        spyOn(uploader, '_getChunkHeadersError');
        var attempts = 1;
        uploader._getChunkHeaders(chunkNumber, attempts);
        mockFileReader.onloadend();
        var callback = mockAjax.onError.calls.argsFor(0)[0];
        var mockResponse = { target: { status: 500 } };
        callback(mockResponse);
        expect(uploader._getChunkHeadersError).toHaveBeenCalledWith(attempts, chunkNumber, mockResponse, mockAjax);
      });

      it("registers the timeout callback", function() {
        spyOn(uploader, '_getChunkHeadersError');
        var attempts = 1;
        uploader._getChunkHeaders(chunkNumber, attempts);
        mockFileReader.onloadend();
        var callback = mockAjax.onTimeout.calls.argsFor(0)[0];
        var mockResponse = { target: { status: 500 } };
        callback(mockResponse);
        expect(uploader._getChunkHeadersError).toHaveBeenCalledWith(attempts, chunkNumber, mockResponse, mockAjax);
      });

      it("sends the request", function() {
        uploader._getChunkHeaders(chunkNumber);
        mockFileReader.onloadend();
        expect(mockAjax.send).toHaveBeenCalled();
      });

      it("pushes the xhr request into the _chunkSignatureXHRs hash", function() {
        uploader._getChunkHeaders(chunkNumber);
        mockFileReader.onloadend();
        expect(uploader._chunkSignatureXHRs[chunkNumber]).toEqual(mockAjax);
      });
    });
  });

  describe("_getChunkHeadersSuccess", function() {
    var uploader, mockFile, mockSettings, mockResponse, attempts, chunkNumber;

    beforeEach(function() {
      attempts = 0;
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {
        signatureBackend: "/signatures",
        chunkHeadersPath: "/get_chunk_headers",
        key: "my-upload-key",
        contentType: "video/quicktime",
        bucket: "some-bucket",
        acl: "private",
        encrypted: false,
        customHeaders: { "X-Derp": "Yes" },
        maxRetries: 3
      };
      uploader = new bs3u.Uploader(mockFile, mockSettings);
      chunkNumber = 3;
    });

    describe("a 200 response", function() {
      beforeEach(function() {
        mockResponse = {
          target: {
            status: 200,
            responseText: "{\"Authorization\": \"auth-header\", \"x-amz-date\": \"date\"}"
          }
        };
        spyOn(uploader, '_uploadChunk');
        uploader._getChunkHeadersSuccess(attempts, chunkNumber, mockResponse, mockAjax);
      });

      it("parses and stores the chunk headers from the response body", function() {
        expect(uploader._chunkHeaders[chunkNumber]).toEqual(JSON.parse(mockResponse.target.responseText));
      });

      it("uploads the chunk", function() {
        expect(uploader._uploadChunk).toHaveBeenCalled();
      });
    });

    describe("a non-200 response", function() {
      beforeEach(function() {
        mockResponse = {
          target: {
            status: 500
          }
        };
        spyOn(uploader, '_getChunkHeadersError');
        uploader._getChunkHeadersSuccess(attempts, chunkNumber, mockResponse, mockAjax);
      });

      it("calls the error handler", function() {
        expect(uploader._getChunkHeadersError).toHaveBeenCalledWith(attempts, chunkNumber, mockResponse, mockAjax);
      });
    });
  });

  describe("_uploadSpotAvailable", function() {
    var mockFile, uploader;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      uploader = new bs3u.Uploader(mockFile, {});
      uploader.settings.maxConcurrentChunks = 3;
    });

    it("returns true if the number of concurrent uploads is less than the max amount", function() {
      spyOn(uploader, '_chunkUploadsInProgress').and.returnValue(2);
      expect(uploader._uploadSpotAvailable()).toBeTruthy();
    });

    it("returns false if the number of concurrent uploads is equal to the max amount", function() {
      spyOn(uploader, '_chunkUploadsInProgress').and.returnValue(3);
      expect(uploader._uploadSpotAvailable()).toBeFalsy();
    });
  });

  describe("_getChunkHeadersError", function() {
    var uploader, mockFile, mockSettings, mockResponse, attempts, chunkNumber;

    beforeEach(function() {
      attempts = 2;
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockResponse = {
        target: {
          status: 500
        }
      };
      mockSettings = {
        signatureBackend: "/signatures",
        initHeadersPath: "/get_init_headers",
        key: "my-upload-key",
        contentType: "video/quicktime",
        bucket: "some-bucket",
        acl: "private",
        encrypted: false,
        customHeaders: { "X-Derp": "Yes" },
        maxRetries: 3
      };
      spyOn(window, 'setTimeout').and.callFake(function(callback, time) {
        callback();
      });
      uploader = new bs3u.Uploader(mockFile, mockSettings);
      chunkNumber = 2;
    });

    describe("when a retry is available", function() {
      beforeEach(function() {
        spyOn(uploader, '_notifyUploadRetry');
        spyOn(uploader, '_getChunkHeaders');
        spyOn(uploader, '_retryAvailable').and.returnValue(true);
        uploader._getChunkHeadersError(attempts, chunkNumber, mockResponse, mockAjax);
      });

      it("notifies about the retry", function() {
        expect(uploader._notifyUploadRetry).toHaveBeenCalledWith(
          attempts + 1,
          uploader._formatErrorForAction('getChunkHeaders', mockResponse, mockAjax)
        );
      });

      it("calls _getChunkHeaders with attempts incremented by 1", function() {
        expect(uploader._getChunkHeaders).toHaveBeenCalledWith(chunkNumber, attempts + 1);
      });
    });

    describe("when no retries are available", function() {
      beforeEach(function() {
        spyOn(uploader, '_notifyUploadError');
        spyOn(uploader, '_setFailed');
        spyOn(uploader, '_retryAvailable').and.returnValue(false);
        uploader._getChunkHeadersError(attempts, chunkNumber, mockResponse, mockAjax);
      });

      it("notifies about the upload error", function() {
        expect(uploader._notifyUploadError).toHaveBeenCalledWith(
          4,
          uploader.errors[4],
          uploader._formatErrorForAction('getChunkHeaders', mockResponse, mockAjax)
        );
      });

      it("sets the uploader to a failed state", function() {
        expect(uploader._setFailed).toHaveBeenCalled();
      });

    });
  });

  describe("_uploadChunk", function() {
    var mockFile, mockSettings, uploader;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000, slice: function(start, end) { return "file-blob"; } };
      mockSettings = {
        host: 'some-host',
        key: "my-upload-key",
        acl: "private",
        encrypted: false,
        maxRetries: 3,
        customHeaders: { "X-Custom-Header": "Stuff" },
        contentType: "video/quicktime",
        bucket: "my-bucket",
        signatureBackend: "/signatures",

      };
      uploader = new bs3u.Uploader(mockFile, mockSettings);
      uploader._uploadId = "upload-id";
      uploader._chunks = {
        1: { startRange: 0, endRange: 1000, uploading: true, uploadComplete: false }
      };
      uploader._chunkHeaders = {
        1: { Authorization: 'auth header'}
      };
    });

    it("properly configures the url, method, params, and headers for the call", function() {
      uploader._uploadChunk(1);
      var ajaxSettings = bs3u.Ajax.calls.argsFor(0)[0];
      expect(ajaxSettings.url).toEqual('some-host/my-upload-key');
      expect(ajaxSettings.method).toEqual('PUT');
      expect(ajaxSettings.params.uploadId).toEqual('upload-id');
      expect(ajaxSettings.params.partNumber).toEqual(1);
      expect(ajaxSettings.headers).toEqual(uploader._chunkHeaders[1]);
    });

    it("does nothing if the chunk is not set to upload", function() {
      uploader._chunks[1].uploading = false;
      uploader._uploadChunk(1);
      expect(bs3u.Ajax).not.toHaveBeenCalled();
    });

    it("registers the progress callback", function() {
      spyOn(uploader, '_uploadChunkProgress');
      var chunkNumber = 1;
      uploader._uploadChunk(chunkNumber);
      var callback = mockAjax.onProgress.calls.argsFor(0)[0];
      var mockResponse = { target: { status: 200 } };
      callback(mockResponse);
      expect(uploader._uploadChunkProgress).toHaveBeenCalledWith(mockResponse, chunkNumber);
    });

    it("registers the success callback", function() {
      spyOn(uploader, '_uploadChunkSuccess');
      var chunkNumber = 1;
      var attempts = 1;
      uploader._uploadChunk(chunkNumber, attempts);
      var callback = mockAjax.onSuccess.calls.argsFor(0)[0];
      var mockResponse = { target: { status: 200 } };
      callback(mockResponse);
      expect(uploader._uploadChunkSuccess).toHaveBeenCalledWith(attempts, mockResponse, chunkNumber, mockAjax);
    });

    it("registers the error callback", function() {
      spyOn(uploader, '_uploadChunkError');
      var chunkNumber = 1;
      var attempts = 1;
      uploader._uploadChunk(chunkNumber, attempts);
      var callback = mockAjax.onError.calls.argsFor(0)[0];
      var mockResponse = { target: { status: 200 } };
      callback(mockResponse);
      expect(uploader._uploadChunkError).toHaveBeenCalledWith(attempts, mockResponse, chunkNumber, mockAjax);
    });

    it("registers the timeout callback", function() {
      spyOn(uploader, '_uploadChunkError');
      var chunkNumber = 1;
      var attempts = 1;
      uploader._uploadChunk(chunkNumber, attempts);
      var callback = mockAjax.onTimeout.calls.argsFor(0)[0];
      var mockResponse = { target: { status: 200 } };
      callback(mockResponse);
      expect(uploader._uploadChunkError).toHaveBeenCalledWith(attempts, mockResponse, chunkNumber, mockAjax);
    });

    it("sends the request", function() {
      var chunkNumber = 1;
      var attempts = 1;
      uploader._uploadChunk(chunkNumber, attempts);
      expect(mockAjax.send).toHaveBeenCalledWith("file-blob");
    });

    it("adds the XHR object to the _chunkXHRs object", function() {
      expect(Object.keys(uploader._chunkXHRs).length).toEqual(0);
      uploader._uploadChunk(1);
      expect(uploader._chunkXHRs[1]).toEqual(mockAjax);
    });

  });

  describe("_uploadChunkProgress", function() {
    var mockFile, mockSettings, uploader, mockResponse;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000, slice: function(start, end) { return "file-blob"; } };
      mockSettings = {};
      uploader = new bs3u.Uploader(mockFile, mockSettings);
      uploader._chunks = {
        1: { startRange: 0, endRange: 1000, uploading: false, uploadComplete: false }
      };
      uploader._chunkXHRs = {
        1: {}
      };
      mockResponse = {
        loaded: 500
      };
      spyOn(uploader, '_notifyUploadProgress');
      spyOn(window, 'Date').and.returnValue({
        getTime: function() { return 1000; }
      });
      uploader._uploadChunkProgress(mockResponse, 1);
    });

    it("sets the chunk's progress from the response", function() {
      expect(uploader._chunkProgress[1]).toEqual(500);
    });

    it("notifies about upload progress", function() {
      expect(uploader._notifyUploadProgress).toHaveBeenCalled();
    });
  });

  describe("_uploadChunkSuccess", function() {
    var mockFile, mockSettings, uploader, mockResponse, attempts, chunkNumber;

    beforeEach(function() {
      attempts = 1;
      chunkNumber = 1;
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000, slice: function(start, end) { return "file-blob"; } };
      mockSettings = {};
      uploader = new bs3u.Uploader(mockFile, mockSettings);
      uploader._chunks = {
        1: { startRange: 0, endRange: 1000, uploading: true, uploadComplete: false },
        2: { startRange: 0, endRange: 1000, uploading: true, uploadComplete: false }
      };
      uploader._chunkXHRs[chunkNumber] = "chunkXHR";
    });

    describe("a 200 response", function() {
      beforeEach(function() {
        mockResponse = {
          target: {
            status: 200,
            getResponseHeader: function(header) { return "eTag"; }
          },
        };
        spyOn(uploader, '_notifyChunkUploaded');
      });

      it("updates the chunk statuses", function() {
        uploader._uploadChunkSuccess(attempts, mockResponse, chunkNumber, mockAjax);
        expect(uploader._chunks[chunkNumber].uploading).toBeFalsy();
        expect(uploader._chunks[chunkNumber].uploadComplete).toBeTruthy();
      });

      it("notifies the chunks has been uploaded", function() {
        uploader._uploadChunkSuccess(attempts, mockResponse, chunkNumber);
        var totalChunks = 2;
        expect(uploader._notifyChunkUploaded).toHaveBeenCalledWith(chunkNumber, totalChunks);
      });

      it("stores the eTag for the chunk", function() {
        uploader._uploadChunkSuccess(attempts, mockResponse, chunkNumber, mockAjax);
        expect(uploader._chunks[chunkNumber].eTag).toEqual("eTag");
      });

      it("invokes the error handler if the eTag response header was blank", function() {
        spyOn(uploader, '_uploadChunkError');
        mockResponse.target.getResponseHeader = function() { return null; };
        uploader._uploadChunkSuccess(attempts, mockResponse, chunkNumber, mockAjax);
        expect(uploader._uploadChunkError).toHaveBeenCalledWith(attempts, mockResponse, chunkNumber, mockAjax);
      });
    });

    describe("a non-200 response", function() {
      beforeEach(function() {
        mockResponse = {
          target: {
            status: 500
          }
        };
        spyOn(uploader, '_uploadChunkError');
        uploader._uploadChunkSuccess(attempts, mockResponse, chunkNumber, mockAjax);
      });

      it("calls the error handler", function() {
        expect(uploader._uploadChunkError).toHaveBeenCalledWith(attempts, mockResponse, chunkNumber, mockAjax);
      });
    });
  });

  describe("_uploadChunkError", function() {
    var uploader, mockSettings, mockFile, xhrAbortSpy, attempts, mockResponse, chunkNumber;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000, slice: function(start, end) { return "file-blob"; } };
      mockSettings = {};
      uploader = new bs3u.Uploader(mockFile, mockSettings);
      xhrAbortSpy = jasmine.createSpy();
      chunkNumber = 1;
      mockResponse = {
        target: {
          status: 500
        }
      };
      attempts = 1;
      uploader._chunkXHRs[chunkNumber] = { abort: xhrAbortSpy };
      spyOn(window, 'setTimeout').and.callFake(function(callback, interval) {
        callback();
      });
      spyOn(uploader, '_notifyUploadRetry');
      spyOn(uploader, '_notifyUploadError');
      spyOn(uploader, '_setFailed');
      spyOn(uploader, '_getChunkHeaders');
      uploader._chunks = {
        1: { uploading: true, uploadComplete: true }
      };
    });

    it("notfies that the chunk upload is going to retry another attempt", function() {
      uploader._uploadChunkError(attempts, mockResponse, chunkNumber, mockAjax);
      var data = uploader._formatErrorForAction('uploadChunk', mockResponse, mockAjax);
      data.chunkNumber = chunkNumber;
      data.chunk = uploader._chunks[chunkNumber];
      expect(uploader._notifyUploadRetry).toHaveBeenCalledWith(attempts + 1, data);
    });

    describe('when a retry is available', function() {
      beforeEach(function() {
        spyOn(uploader, '_retryAvailable').and.returnValue(true);
        uploader._uploadChunkError(attempts, mockResponse, chunkNumber, mockAjax);
      });

      it("retries uploading the chunk with the attempts count incremented by 1", function() {
        expect(uploader._getChunkHeaders).toHaveBeenCalledWith(chunkNumber, attempts + 1);
      });
    });

    describe('when no retries are available', function() {
      beforeEach(function() {
        spyOn(uploader, '_retryAvailable').and.returnValue(false);
        uploader._uploadChunkError(attempts, mockResponse, chunkNumber, mockAjax);
      });

      it('notifies the upload failed', function() {
        var data = uploader._formatErrorForAction('uploadChunk', mockResponse, mockAjax);
        data.chunkNumber = chunkNumber;
        data.chunk = uploader._chunks[chunkNumber];
        expect(uploader._notifyUploadError).toHaveBeenCalledWith(
          7,
          uploader.errors[7],
          data
        );
      });

      it('sets the upload as failed', function() {
        expect(uploader._setFailed).toHaveBeenCalled();
      });
    });

  });

  describe("_getListHeaders", function() {
    var mockFile, mockSettings, uploader;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {
        signatureBackend: "/signatures",
        listHeadersPath: "/get_list_headers",
        region: "us-east-1",
        key: "my-upload-key",
        contentType: "video/quicktime",
        bucket: "some-bucket",
        acl: "private",
        encrypted: false,
        customHeaders: { "X-Derp": "Yes" },
        maxRetries: 3
      };
      uploader = new bs3u.Uploader(mockFile, mockSettings);
      uploader._uploadId = "some-upload-id";
    });

    it("creates and configures a new Ajax request", function() {
      uploader._getListHeaders();
      expect(bs3u.Ajax).toHaveBeenCalled();

      ajaxSettings = bs3u.Ajax.calls.argsFor(0)[0];

      expect(ajaxSettings.url).toEqual(mockSettings.signatureBackend + mockSettings.listHeadersPath);
      expect(ajaxSettings.method).toEqual("GET");
      expect(ajaxSettings.headers).toEqual(mockSettings.customHeaders);
      expect(ajaxSettings.params.key).toEqual(mockSettings.key);
      expect(ajaxSettings.params.content_type).toEqual(mockSettings.contentType);
      expect(ajaxSettings.params.payload).toEqual(uploader._sha256(""));
      expect(ajaxSettings.params.region).toEqual(mockSettings.region);
      expect(ajaxSettings.params.host).toEqual(uploader.settings.host);
      expect(ajaxSettings.params.upload_id).toEqual(uploader._uploadId);
    });

    it("registers the success callback", function() {
      spyOn(uploader, '_getListHeadersSuccess');
      var attempts = 1;
      uploader._getListHeaders(attempts);
      var callback = mockAjax.onSuccess.calls.argsFor(0)[0];
      var mockResponse = { target: { status: 200 } };
      callback(mockResponse);
      expect(uploader._getListHeadersSuccess).toHaveBeenCalledWith(attempts, mockResponse, mockAjax);
    });

    it("registers the error callback", function() {
      spyOn(uploader, '_getListHeadersError');
      var attempts = 1;
      uploader._getListHeaders(attempts);
      var callback = mockAjax.onError.calls.argsFor(0)[0];
      var mockResponse = { target: { status: 500 } };
      callback(mockResponse);
      expect(uploader._getListHeadersError).toHaveBeenCalledWith(attempts, mockResponse, mockAjax);
    });

    it("registers the timeout callback", function() {
      spyOn(uploader, '_getListHeadersError');
      var attempts = 1;
      uploader._getListHeaders(attempts);
      var callback = mockAjax.onTimeout.calls.argsFor(0)[0];
      var mockResponse = { target: { status: 500 } };
      callback(mockResponse);
      expect(uploader._getListHeadersError).toHaveBeenCalledWith(attempts, mockResponse, mockAjax);
    });

    it("sends the request", function() {
      uploader._getListHeaders();
      expect(mockAjax.send).toHaveBeenCalled();
    });

    it("pushes the xhr request into the _XHRs array", function() {
      uploader._getListHeaders();
      expect(uploader._XHRs[0]).toEqual(mockAjax);
    });
  });

  describe("_getListHeadersSuccess", function() {
    var uploader, mockFile, mockSettings, mockResponse, attempts;

    beforeEach(function() {
      attempts = 0;
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {
        signatureBackend: "/signatures",
        listHeadersPath: "/get_list_headers",
        key: "my-upload-key",
        contentType: "video/quicktime",
        bucket: "some-bucket",
        acl: "private",
        encrypted: false,
        customHeaders: { "X-Derp": "Yes" },
        maxRetries: 3
      };
      uploader = new bs3u.Uploader(mockFile, mockSettings);
    });

    describe("a 200 response", function() {
      beforeEach(function() {
        mockResponse = {
          target: {
            status: 200,
            responseText: "{\"Authorization\": \"auth-header\", \"x-amz-date\": \"date\"}"
          }
        };
        spyOn(uploader, '_verifyAllChunksUploaded');
        uploader._getListHeadersSuccess(attempts, mockResponse, mockAjax);
      });

      it("parses and stores the list headers from the response body", function() {
        expect(uploader._listHeaders).toEqual(JSON.parse(mockResponse.target.responseText));
      });

      it("verifies that all chunks were uploaded", function() {
        expect(uploader._verifyAllChunksUploaded).toHaveBeenCalled();
      });
    });

    describe("a non-200 response", function() {
      beforeEach(function() {
        mockResponse = {
          target: {
            status: 500
          }
        };
        spyOn(uploader, '_getListHeadersError');
        uploader._getListHeadersSuccess(attempts, mockResponse, mockAjax);
      });

      it("calls the error handler", function() {
        expect(uploader._getListHeadersError).toHaveBeenCalledWith(attempts, mockResponse, mockAjax);
      });
    });
  });

  describe("_getListHeadersError", function() {
    var uploader, mockFile, mockSettings, mockResponse, attempts;

    beforeEach(function() {
      attempts = 2;
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockResponse = {
        target: {
          status: 500
        }
      };
      mockSettings = {
        signatureBackend: "/signatures",
        listHeadersPath: "/get_list_headers",
        key: "my-upload-key",
        contentType: "video/quicktime",
        bucket: "some-bucket",
        acl: "private",
        encrypted: false,
        customHeaders: { "X-Derp": "Yes" },
        maxRetries: 3
      };
      spyOn(window, 'setTimeout').and.callFake(function(callback, time) {
        callback();
      });

      uploader = new bs3u.Uploader(mockFile, mockSettings);
    });

    describe("when a retry is available", function() {
      beforeEach(function() {
        spyOn(uploader, '_notifyUploadRetry');
        spyOn(uploader, '_getListHeaders');
        spyOn(uploader, '_retryAvailable').and.returnValue(true);
        uploader._getListHeadersError(attempts, mockResponse, mockAjax);
      });

      it("notifies about the retry", function() {
        expect(uploader._notifyUploadRetry).toHaveBeenCalledWith(
          attempts + 1,
          uploader._formatErrorForAction('getListHeaders', mockResponse, mockAjax)
        );
      });

      it("calls _getListHeaders with attempts incremented by 1", function() {
        expect(uploader._getListHeaders).toHaveBeenCalledWith(attempts + 1);
      });
    });

    describe("when no retries are available", function() {
      beforeEach(function() {
        spyOn(uploader, '_notifyUploadError');
        spyOn(uploader, '_setFailed');
        spyOn(uploader, '_retryAvailable').and.returnValue(false);
        uploader._getListHeadersError(attempts, mockResponse, mockAjax);
      });

      it("notifies about the upload error", function() {
        expect(uploader._notifyUploadError).toHaveBeenCalledWith(
          9,
          uploader.errors[9],
          uploader._formatErrorForAction('getListHeaders', mockResponse, mockAjax)
        );
      });

      it("sets the uploader to a failed state", function() {
        expect(uploader._setFailed).toHaveBeenCalled();
      });

    });
  });

  describe("_verifyAllChunksUploaded", function() {
    var mockFile, mockSettings, uploader;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {
        host: 'some-host',
        key: "my-upload-key",
        acl: "private",
        region: "us-east-1",
        encrypted: false,
        maxRetries: 3,
        customHeaders: { "X-Custom-Header": "Stuff" },
        contentType: "video/quicktime",
        bucket: "my-bucket",
        signatureBackend: "/signatures",

      };
      uploader = new bs3u.Uploader(mockFile, mockSettings);
      uploader._uploadId = "upload-id";
      uploader._chunks = {
        1: { startRange: 0, endRange: 1000, uploading: false, uploadComplete: false },
        2: { startRange: 1000, endRange: 2000, uploading: false, uploadComplete: false }
      };
      uploader._listHeaders = { Authorization: "auth header" };
      uploader._eTags = {
        1: '"chunk-1-eTag"',
        2: '"chunk-2-eTag"',
      };
    });


    it("properly configures the url, method, params, and headers for the call", function() {
      uploader._verifyAllChunksUploaded();
      var ajaxSettings = bs3u.Ajax.calls.argsFor(0)[0];
      expect(ajaxSettings.url).toEqual('some-host/my-upload-key');
      expect(ajaxSettings.method).toEqual('GET');
      expect(ajaxSettings.params.uploadId).toEqual('upload-id');
      expect(ajaxSettings.headers).toEqual(uploader._listHeaders);
    });

    it("specially configures the url when the host provided is to a CloudFront distribution", function() {
      uploader.settings.protocol = "https://";
      uploader.settings.usingCloudFront = true;
      uploader._verifyAllChunksUploaded();
      var ajaxSettings = bs3u.Ajax.calls.argsFor(0)[0];
      expect(ajaxSettings.url).toEqual('https://my-bucket.s3-us-east-1.amazonaws.com/my-upload-key');
    });

    it("adds the XHR object to the _XHRs list", function() {
      expect(uploader._XHRs.length).toEqual(0);
      uploader._verifyAllChunksUploaded();
      expect(uploader._XHRs[0]).toEqual(mockAjax);
    });

    it("registers the success callback", function() {
      spyOn(uploader, '_verifyAllChunksUploadedSuccess');
      var attempts = 1;
      uploader._verifyAllChunksUploaded(attempts);
      var callback = mockAjax.onSuccess.calls.argsFor(0)[0];
      var mockResponse = { target: { status: 200 } };
      callback(mockResponse);
      expect(uploader._verifyAllChunksUploadedSuccess).toHaveBeenCalledWith(attempts, mockResponse, mockAjax);
    });

    it("registers the error callback", function() {
      spyOn(uploader, '_verifyAllChunksUploadedError');
      var attempts = 1;
      uploader._verifyAllChunksUploaded(attempts);
      var callback = mockAjax.onError.calls.argsFor(0)[0];
      var mockResponse = { target: { status: 200 } };
      callback(mockResponse);
      expect(uploader._verifyAllChunksUploadedError).toHaveBeenCalledWith(attempts, mockResponse, mockAjax);
    });

    it("registers the timeout callback", function() {
      spyOn(uploader, '_verifyAllChunksUploadedError');
      var attempts = 1;
      uploader._verifyAllChunksUploaded(attempts);
      var callback = mockAjax.onTimeout.calls.argsFor(0)[0];
      var mockResponse = { target: { status: 200 } };
      callback(mockResponse);
      expect(uploader._verifyAllChunksUploadedError).toHaveBeenCalledWith(attempts, mockResponse, mockAjax);
    });

    it("sends the request", function() {
      var attempts = 1;
      uploader._verifyAllChunksUploaded(attempts);
      expect(mockAjax.send).toHaveBeenCalled();
    });
  });

  describe("_collectInvalidChunks", function() {
    var mockFile, mockSettings, uploader, xml, xmlString, partsFromS3, invalidParts;

    xmlString = "<Parts>";
    xmlString += "<Part><PartNumber>1</PartNumber><ETag>\"invalid-eTag\"</ETag><Size>1000</Size></Part>";
    xmlString += "<Part><PartNumber>2</PartNumber><ETag>\"chunk-2-eTag\"</ETag><Size>0</Size></Part>";
    xmlString += "<Part><PartNumber>3</PartNumber><ETag>\"chunk-3-eTag\"</ETag><Size>1000</Size></Part>";
    xmlString += "</Parts>";
    xml = new DOMParser().parseFromString(xmlString, "text/xml");
    partsFromS3 = xml.getElementsByTagName("Part");

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {
        host: 'some-host',
        key: "my-upload-key",
        acl: "private",
        encrypted: false,
        maxRetries: 3,
        customHeaders: { "X-Custom-Header": "Stuff" },
        contentType: "video/quicktime",
        bucket: "my-bucket",
        signatureBackend: "/signatures",
      };

      uploader = new bs3u.Uploader(mockFile, mockSettings);
      uploader._chunks = {
        1: { startRange: 0, endRange: 1000, eTag: '"chunk-1-eTag"', uploadComplete: true },
        2: { startRange: 1000, endRange: 2000, eTag: '"chunk-2-eTag"', uploadComplete: true },
        3: { startRange: 2000, endRange: 3000, eTag: '"chunk-3-eTag"', uploadComplete: true }
      };
      invalidParts = uploader._collectInvalidChunks(partsFromS3);
    });

    it("returns an array of part numbers that have an invalid size or etag", function() {
      expect(invalidParts.length).toEqual(2);
      expect(invalidParts[0]).toEqual(1);
      expect(invalidParts[1]).toEqual(2);
    });

    it("sets the eTag to null for any invalid chunks", function() {
      expect(uploader._chunks[1].eTag).toBeNull();
      expect(uploader._chunks[2].eTag).toBeNull();
    });

    it("sets the 'uploadComplete' status to 'false' for any invalid chunks", function() {
      expect(uploader._chunks[1].uploadComplete).toBeFalsy();
      expect(uploader._chunks[2].uploadComplete).toBeFalsy();
    });
  });

  describe("_verifyAllChunksUploadedSuccess", function() {
    var mockFile, mockSettings, uploader;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {
        host: 'some-host',
        key: "my-upload-key",
        acl: "private",
        encrypted: false,
        maxRetries: 3,
        customHeaders: { "X-Custom-Header": "Stuff" },
        contentType: "video/quicktime",
        bucket: "my-bucket",
        signatureBackend: "/signatures",

      };
      uploader = new bs3u.Uploader(mockFile, mockSettings);
      uploader._chunks = {
        1: { startRange: 0, endRange: 1000, uploading: false, uploadComplete: false, eTag: '"chunk-1-eTag"' },
        2: { startRange: 1000, endRange: 2000, uploading: false, uploadComplete: false, eTag: '"chunk-2-eTag"' }
      };
      uploader._listHeaders = { Authorization: "auth header" };
    });

    describe("a 200 response", function() {
      describe('when the total parts uploaded does not equal the number of parts sent', function() {
        var mockResponse, xml, xmlString, attempts;

        // One part is missing from the response
        xmlString = "<Parts>";
        xmlString += "<Part><PartNumber>1</PartNumber><ETag>\"chunk-1-eTag\"</ETag><Size>1000</Size></Part>";
        xmlString += "</Parts>";
        xml = new DOMParser().parseFromString(xmlString, "text/xml");
        attempts = 1;

        beforeEach(function() {
          mockResponse = {
            target: {
              status: 200,
              responseXML: xml
            }
          };
          spyOn(uploader, '_handleMissingChunks');
          uploader._verifyAllChunksUploadedSuccess(attempts, mockResponse, mockAjax);
        });

        it("calls _handleMissingChunks with the list of parts returned from Amazon", function() {
          var parts = xml.getElementsByTagName("Part");
          expect(uploader._handleMissingChunks).toHaveBeenCalledWith(parts);
        });
      });

      describe('when there are invalid parts', function() {
        var mockResponse, xml, xmlString, attempts;

        // Part 1 has an invalid eTag, Part 2 has an invalid size
        xmlString = "<Parts>";
        xmlString += "<Part><PartNumber>1</PartNumber><ETag>\"invalid-eTag\"</ETag><Size>1000</Size></Part>";
        xmlString += "<Part><PartNumber>2</PartNumber><ETag>\"chunk-2-eTag\"</ETag><Size>0</Size></Part>";
        xmlString += "</Parts>";
        xml = new DOMParser().parseFromString(xmlString, "text/xml");
        attempts = 1;

        beforeEach(function() {
          mockResponse = {
            target: {
              status: 200,
              responseXML: xml
            }
          };
          spyOn(uploader, '_handleInvalidChunks');
          uploader._verifyAllChunksUploadedSuccess(attempts, mockResponse, mockAjax);
        });

        it("calls _handleInvalidChunks with the list of part numbers that are invalid", function() {
          var invalidChunks = [1, 2];
          expect(uploader._handleInvalidChunks).toHaveBeenCalledWith(invalidChunks);
        });
      });

      describe('when all parts have been uploaded and are valid', function() {
        var mockResponse, xml, xmlString, attempts;

        // All Parts are uploaded and valid
        xmlString = "<Parts>";
        xmlString += "<Part><PartNumber>1</PartNumber><ETag>\"chunk-1-eTag\"</ETag><Size>1000</Size></Part>";
        xmlString += "<Part><PartNumber>2</PartNumber><ETag>\"chunk-2-eTag\"</ETag><Size>1000</Size></Part>";
        xmlString += "</Parts>";
        xml = new DOMParser().parseFromString(xmlString, "text/xml");
        attempts = 1;

        beforeEach(function() {
          mockResponse = {
            target: {
              status: 200,
              responseXML: xml
            }
          };
          spyOn(uploader, '_getCompleteHeaders');
          uploader._verifyAllChunksUploadedSuccess(attempts, mockResponse, mockAjax);
        });

        it("retrieves upload complete headers", function() {
          expect(uploader._getCompleteHeaders).toHaveBeenCalled();
        });
      });
    });

    describe("a non-200 response", function() {
      var mockResponse, attempts;

      beforeEach(function() {
        attempts = 1;
        mockResponse = {
          target: {
            status: 400
          }
        };
        spyOn(window, 'setTimeout').and.callFake(function(callback, interval) {
          callback();
        });
        spyOn(uploader, '_verifyAllChunksUploadedError');
        uploader._verifyAllChunksUploadedSuccess(attempts, mockResponse, mockAjax);
      });

      it("calls _verifyAllChunksUploadedError", function() {
        expect(uploader._verifyAllChunksUploadedError).toHaveBeenCalledWith(attempts, mockResponse, mockAjax);
      });
    });
  });

  describe("_verifyAllChunksUploadedError", function() {
    var mockFile, mockSettings, uploader, attempts, mockResponse;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {
        host: 'some-host',
        key: "my-upload-key",
        acl: "private",
        encrypted: false,
        maxRetries: 3,
        customHeaders: { "X-Custom-Header": "Stuff" },
        contentType: "video/quicktime",
        bucket: "my-bucket",
        signatureBackend: "/signatures",
      };
      uploader = new bs3u.Uploader(mockFile, mockSettings);
    });

    describe("and retries are available", function() {
      beforeEach(function() {
        spyOn(window, 'setTimeout').and.callFake(function(callback, time) {
          callback();
        });

        spyOn(uploader, '_retryAvailable').and.returnValue(true);
        spyOn(uploader, '_notifyUploadRetry');
        spyOn(uploader, '_getListHeaders');
        attempts = 1;
        mockResponse = {
          target: {
            status: 500
          }
        };
        uploader._verifyAllChunksUploadedError(attempts, mockResponse, mockAjax);
      });

      it("notifies about the next retry attempt", function() {
        expect(uploader._notifyUploadRetry).toHaveBeenCalledWith(
          attempts + 1,
          uploader._formatErrorForAction('verifyAllChunksUploaded', mockResponse, mockAjax)
        );
      });

      it("retries the call, increasing attempts by 1", function() {
        expect(uploader._getListHeaders).toHaveBeenCalledWith(attempts + 1);
      });
    });

    describe("and no retries are available", function() {
      beforeEach(function() {
        spyOn(uploader, '_retryAvailable').and.returnValue(false);
        spyOn(uploader, '_notifyUploadError');
        spyOn(uploader, '_setFailed');
        uploader._verifyAllChunksUploadedError(attempts, mockResponse, mockAjax);
      });

      it("notifies that the upload has failed", function() {
        expect(uploader._notifyUploadError).toHaveBeenCalledWith(
          6,
          uploader.errors[6],
          uploader._formatErrorForAction('verifyAllChunksUploaded', mockResponse, mockAjax)
        );
      });

      it("sets the uploader to a failed state", function() {
        expect(uploader._setFailed).toHaveBeenCalled();
      });

    });
  });

  describe("_getCompleteHeaders", function() {
    var mockFile, mockSettings, uploader;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {
        signatureBackend: "/signatures",
        completeHeadersPath: "/get_complete_headers",
        region: "us-east-1",
        key: "my-upload-key",
        contentType: "video/quicktime",
        bucket: "some-bucket",
        acl: "private",
        encrypted: false,
        customHeaders: { "X-Derp": "Yes" },
        maxRetries: 3
      };
      uploader = new bs3u.Uploader(mockFile, mockSettings);
      uploader._uploadId = "some-upload-id";
      uploader._chunks = {
        1: { startRange: 0, endRange: 1000, uploading: false, uploadComplete: false, eTag: '"chunk-1-eTag"' },
        2: { startRange: 1000, endRange: 2000, uploading: false, uploadComplete: false, eTag: '"chunk-2-eTag"' }
      };
    });

    it("creates and configures a new Ajax request", function() {
      uploader._getCompleteHeaders();
      expect(bs3u.Ajax).toHaveBeenCalled();

      ajaxSettings = bs3u.Ajax.calls.argsFor(0)[0];

      expect(ajaxSettings.url).toEqual(mockSettings.signatureBackend + mockSettings.completeHeadersPath);
      expect(ajaxSettings.method).toEqual("GET");
      expect(ajaxSettings.headers).toEqual(mockSettings.customHeaders);
      expect(ajaxSettings.params.key).toEqual(mockSettings.key);
      expect(ajaxSettings.params.content_type).toEqual(mockSettings.contentType);
      expect(ajaxSettings.params.payload).toEqual(uploader._sha256(uploader._generateCompletePayload()));
      expect(ajaxSettings.params.region).toEqual(mockSettings.region);
      expect(ajaxSettings.params.host).toEqual(uploader.settings.host);
      expect(ajaxSettings.params.upload_id).toEqual(uploader._uploadId);
    });

    it("registers the success callback", function() {
      spyOn(uploader, '_getCompleteHeadersSuccess');
      var attempts = 1;
      uploader._getCompleteHeaders(attempts);
      var callback = mockAjax.onSuccess.calls.argsFor(0)[0];
      var mockResponse = { target: { status: 200 } };
      callback(mockResponse);
      expect(uploader._getCompleteHeadersSuccess).toHaveBeenCalledWith(attempts, mockResponse, mockAjax);
    });

    it("registers the error callback", function() {
      spyOn(uploader, '_getCompleteHeadersError');
      var attempts = 1;
      uploader._getCompleteHeaders(attempts);
      var callback = mockAjax.onError.calls.argsFor(0)[0];
      var mockResponse = { target: { status: 500 } };
      callback(mockResponse);
      expect(uploader._getCompleteHeadersError).toHaveBeenCalledWith(attempts, mockResponse, mockAjax);
    });

    it("registers the timeout callback", function() {
      spyOn(uploader, '_getCompleteHeadersError');
      var attempts = 1;
      uploader._getCompleteHeaders(attempts);
      var callback = mockAjax.onTimeout.calls.argsFor(0)[0];
      var mockResponse = { target: { status: 500 } };
      callback(mockResponse);
      expect(uploader._getCompleteHeadersError).toHaveBeenCalledWith(attempts, mockResponse, mockAjax);
    });

    it("sends the request", function() {
      uploader._getCompleteHeaders();
      expect(mockAjax.send).toHaveBeenCalled();
    });

    it("pushes the xhr request into the _XHRs array", function() {
      uploader._getCompleteHeaders();
      expect(uploader._XHRs[0]).toEqual(mockAjax);
    });
  });

  describe("_getCompleteHeadersSuccess", function() {
    var uploader, mockFile, mockSettings, mockResponse, attempts;

    beforeEach(function() {
      attempts = 0;
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {
        signatureBackend: "/signatures",
        completeHeadersPath: "/get_complete_headers",
        key: "my-upload-key",
        contentType: "video/quicktime",
        bucket: "some-bucket",
        acl: "private",
        encrypted: false,
        customHeaders: { "X-Derp": "Yes" },
        maxRetries: 3
      };
      uploader = new bs3u.Uploader(mockFile, mockSettings);
    });

    describe("a 200 response", function() {
      beforeEach(function() {
        mockResponse = {
          target: {
            status: 200,
            responseText: "{\"Authorization\": \"auth-header\", \"x-amz-date\": \"date\"}"
          }
        };
        spyOn(uploader, '_completeUpload');
        uploader._getCompleteHeadersSuccess(attempts, mockResponse, mockAjax);
      });

      it("parses and stores the complete headers from the response body", function() {
        expect(uploader._completeHeaders).toEqual(JSON.parse(mockResponse.target.responseText));
      });

      it("completes the upload", function() {
        expect(uploader._completeUpload).toHaveBeenCalled();
      });
    });

    describe("a non-200 response", function() {
      beforeEach(function() {
        mockResponse = {
          target: {
            status: 500
          }
        };
        spyOn(uploader, '_getCompleteHeadersError');
        uploader._getCompleteHeadersSuccess(attempts, mockResponse, mockAjax);
      });

      it("calls the error handler", function() {
        expect(uploader._getCompleteHeadersError).toHaveBeenCalledWith(attempts, mockResponse, mockAjax);
      });
    });
  });

  describe("_getCompleteHeadersError", function() {
    var uploader, mockFile, mockSettings, mockResponse, attempts;

    beforeEach(function() {
      attempts = 2;
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockResponse = {
        target: {
          status: 500
        }
      };
      mockSettings = {
        signatureBackend: "/signatures",
        listHeadersPath: "/get_list_headers",
        key: "my-upload-key",
        contentType: "video/quicktime",
        bucket: "some-bucket",
        acl: "private",
        encrypted: false,
        customHeaders: { "X-Derp": "Yes" },
        maxRetries: 3
      };
      spyOn(window, 'setTimeout').and.callFake(function(callback, time) {
        callback();
      });

      uploader = new bs3u.Uploader(mockFile, mockSettings);
    });

    describe("when a retry is available", function() {
      beforeEach(function() {
        spyOn(uploader, '_notifyUploadRetry');
        spyOn(uploader, '_getCompleteHeaders');
        spyOn(uploader, '_retryAvailable').and.returnValue(true);
        uploader._getCompleteHeadersError(attempts, mockResponse, mockAjax);
      });

      it("notifies about the retry", function() {
        expect(uploader._notifyUploadRetry).toHaveBeenCalledWith(
          attempts + 1,
          uploader._formatErrorForAction('getCompleteHeaders', mockResponse, mockAjax)
        );
      });

      it("calls _getCompleteHeaders with attempts incremented by 1", function() {
        expect(uploader._getCompleteHeaders).toHaveBeenCalledWith(attempts + 1);
      });
    });

    describe("when no retries are available", function() {
      beforeEach(function() {
        spyOn(uploader, '_notifyUploadError');
        spyOn(uploader, '_setFailed');
        spyOn(uploader, '_retryAvailable').and.returnValue(false);
        uploader._getCompleteHeadersError(attempts, mockResponse, mockAjax);
      });

      it("notifies about the upload error", function() {
        expect(uploader._notifyUploadError).toHaveBeenCalledWith(
          10,
          uploader.errors[10],
          uploader._formatErrorForAction('getCompleteHeaders', mockResponse, mockAjax)
        );
      });

      it("sets the uploader to a failed state", function() {
        expect(uploader._setFailed).toHaveBeenCalled();
      });

    });
  });

  describe("_handleInvalidChunks", function() {
    var mockFile, mockSettings, uploader;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {};
      uploader = new bs3u.Uploader(mockFile, mockSettings);
      spyOn(window, 'setTimeout').and.callFake(function(callback, delay) {
        callback();
      });
      spyOn(uploader, '_uploadSpotAvailable').and.returnValue(true);

      uploader._chunks = {
        1: { uploading: true, uploadComplete: true }, // not consistent, but just proving it gets set to false correctly
        2: { uploading: true, uploadComplete: false },
        3: { uploading: true, uploadComplete: false },
        4: { uploading: true, uploadComplete: true },
        5: { uploading: true, uploadComplete: false },
      };
      uploader._pauseCompleteWatcher = true;
      uploader._handleInvalidChunks([1, 3, 5]);
    });

    it('flags each invalid chunk for a retry', function() {
      expect(uploader._chunks[1].uploading).toBeFalsy();
      expect(uploader._chunks[1].uploadComplete).toBeFalsy();

      expect(uploader._chunks[2].uploading).toBeTruthy();
      expect(uploader._chunks[2].uploadComplete).toBeFalsy();

      expect(uploader._chunks[3].uploading).toBeFalsy();
      expect(uploader._chunks[3].uploadComplete).toBeFalsy();

      expect(uploader._chunks[4].uploading).toBeTruthy();
      expect(uploader._chunks[4].uploadComplete).toBeTruthy();

      expect(uploader._chunks[5].uploading).toBeFalsy();
      expect(uploader._chunks[5].uploadComplete).toBeFalsy();
    });

    it("sets _pauseCompleteWatcher to false", function() {
      expect(uploader._pauseCompleteWatcher).toBeFalsy();
    });
  });

  describe("_handleMissingChunks", function() {
    var mockFile, mockSettings, uploader, xml, xmlString;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {};
      uploader = new bs3u.Uploader(mockFile, mockSettings);

      // The uploader has kept track of 4 chunks
      uploader._chunks = {
        1: { startRange: 0, endRange: 1000, uploading: false, uploadComplete: true },
        2: { startRange: 1000, endRange: 2000, uploading: false, uploadComplete: true },
        3: { startRange: 2000, endRange: 3000, uploading: false, uploadComplete: true },
        4: { startRange: 3000, endRange: 4000, uploading: false, uploadComplete: true }
      };

      // But Amazon reported only getting 2 of them
      xmlString = "<Parts>";
      xmlString += "<Part><PartNumber>1</PartNumber><ETag>\"chunk-1-eTag\"</ETag><Size>1000</Size></Part>";
      xmlString += "<Part><PartNumber>3</PartNumber><ETag>\"chunk-3-eTag\"</ETag><Size>1000</Size></Part>";
      xmlString += "</Parts>";
      xml = new DOMParser().parseFromString(xmlString, "text/xml");

      var responseParts = xml.getElementsByTagName("Part");

      uploader._pauseCompleteWatcher = true;
      uploader._handleMissingChunks(responseParts);
    });

    it("flags each chunk that was not listed in Amazon's response for a retry", function() {
      expect(uploader._chunks[1].uploading).toBeFalsy();
      expect(uploader._chunks[1].uploadComplete).toBeTruthy();

      expect(uploader._chunks[2].uploading).toBeFalsy();
      expect(uploader._chunks[2].uploadComplete).toBeFalsy();

      expect(uploader._chunks[3].uploading).toBeFalsy();
      expect(uploader._chunks[3].uploadComplete).toBeTruthy();

      expect(uploader._chunks[4].uploading).toBeFalsy();
      expect(uploader._chunks[4].uploadComplete).toBeFalsy();
    });

    it("sets _pauseCompleteWatcher to false", function() {
      expect(uploader._pauseCompleteWatcher).toBeFalsy();
    });
  });

  describe("_generateCompletePayload", function() {
    var mockFile, mockSettings, uploader;

    beforeEach(function() {
      mockSettings = {};
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      uploader = new bs3u.Uploader(mockFile, mockSettings);
      uploader._chunks = {
        1: { startRange: 0, endRange: 1000, uploading: false, uploadComplete: false, eTag: '"chunk-1-eTag"' },
        2: { startRange: 1000, endRange: 2000, uploading: false, uploadComplete: false, eTag: '"chunk-2-eTag"' }
      };
    });

    it("generates the proper XML payload for the complete upload request", function() {
      var result = uploader._generateCompletePayload();
      var expected;
      expected = "<CompleteMultipartUpload>";
      expected +=   "<Part>";
      expected +=     "<PartNumber>1</PartNumber>";
      expected +=     "<ETag>\"chunk-1-eTag\"</ETag>";
      expected +=   "</Part>";
      expected +=   "<Part>";
      expected +=     "<PartNumber>2</PartNumber>";
      expected +=     "<ETag>\"chunk-2-eTag\"</ETag>";
      expected +=   "</Part>";
      expected += "</CompleteMultipartUpload>";
      expect(result).toEqual(expected);
    });

    it("orders chunks properly", function() {
      uploader._chunks = {
        2: { startRange: 1000, endRange: 2000, uploading: false, uploadComplete: false, eTag: '"chunk-2-eTag"' },
        3: { startRange: 2000, endRange: 3000, uploading: false, uploadComplete: false, eTag: '"chunk-3-eTag"' },
        1: { startRange: 0, endRange: 1000, uploading: false, uploadComplete: false, eTag: '"chunk-1-eTag"' }
      };
      var result = uploader._generateCompletePayload();
      var expected;
      expected = "<CompleteMultipartUpload>";
      expected +=   "<Part>";
      expected +=     "<PartNumber>1</PartNumber>";
      expected +=     "<ETag>\"chunk-1-eTag\"</ETag>";
      expected +=   "</Part>";
      expected +=   "<Part>";
      expected +=     "<PartNumber>2</PartNumber>";
      expected +=     "<ETag>\"chunk-2-eTag\"</ETag>";
      expected +=   "</Part>";
      expected +=   "<Part>";
      expected +=     "<PartNumber>3</PartNumber>";
      expected +=     "<ETag>\"chunk-3-eTag\"</ETag>";
      expected +=   "</Part>";
      expected += "</CompleteMultipartUpload>";
      expect(result).toEqual(expected);
    });
  });

  describe("_completeUpload", function() {
    var mockFile, mockSettings, uploader;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {
        host: 'some-host',
        key: "my-upload-key",
        acl: "private",
        encrypted: false,
        maxRetries: 3,
        customHeaders: { "X-Custom-Header": "Stuff" },
        contentType: "video/quicktime",
        bucket: "my-bucket",
        signatureBackend: "/signatures",
      };
      uploader = new bs3u.Uploader(mockFile, mockSettings);
      uploader._uploadId = "upload-id";
      uploader._chunks = {
        1: { startRange: 0, endRange: 1000, uploading: false, uploadComplete: false, eTag: '"chunk-1-eTag"' },
        2: { startRange: 1000, endRange: 2000, uploading: false, uploadComplete: false, eTag: '"chunk-2-eTag"' }
      };
      uploader._completeHeaders = { Authroization: "auth header" };
      spyOn(uploader, '_generateCompletePayload').and.returnValue("payload");
    });

    it("adds the XHR object to the _XHRs array", function() {
      expect(uploader._XHRs.length).toEqual(0);
      uploader._completeUpload();
      expect(uploader._XHRs[0]).toEqual(mockAjax);
    });

    it("properly configures the url, method, and headers for the call", function() {
      uploader._completeUpload();
      ajaxSettings = bs3u.Ajax.calls.argsFor(0)[0];
      expect(ajaxSettings.url).toEqual('some-host/my-upload-key');
      expect(ajaxSettings.method).toEqual('POST');
      expect(ajaxSettings.params.uploadId).toEqual('upload-id');
      expect(ajaxSettings.headers).toEqual(uploader._completeHeaders);
    });

    it("registers the success callback", function() {
      spyOn(uploader, '_completeUploadSuccess');
      var attempts = 1;
      uploader._completeUpload(attempts);
      var callback = mockAjax.onSuccess.calls.argsFor(0)[0];
      var mockResponse = { target: { status: 200 } };
      callback(mockResponse);
      expect(uploader._completeUploadSuccess).toHaveBeenCalledWith(attempts, mockResponse, mockAjax);
    });

    it("registers the error callback", function() {
      spyOn(uploader, '_completeUploadError');
      var attempts = 1;
      uploader._completeUpload(attempts);
      var callback = mockAjax.onError.calls.argsFor(0)[0];
      var mockResponse = { target: { status: 500 } };
      callback(mockResponse);
      expect(uploader._completeUploadError).toHaveBeenCalledWith(attempts, mockResponse, mockAjax);
    });

    it("registers the timeout callback", function() {
      spyOn(uploader, '_completeUploadError');
      var attempts = 1;
      uploader._completeUpload(attempts);
      var callback = mockAjax.onTimeout.calls.argsFor(0)[0];
      var mockResponse = { target: { status: 500 } };
      callback(mockResponse);
      expect(uploader._completeUploadError).toHaveBeenCalledWith(attempts, mockResponse, mockAjax);
    });

    it("sends the ajax request", function() {
      uploader._completeUpload();
      expect(mockAjax.send).toHaveBeenCalledWith("payload");
    });
  });

  describe("_completeUploadSuccess", function() {
    var mockFile, mockSettings, uploader;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {
        host: 'some-host',
        key: "my-upload-key",
        acl: "private",
        encrypted: false,
        maxRetries: 3,
        customHeaders: { "X-Custom-Header": "Stuff" },
        contentType: "video/quicktime",
        bucket: "my-bucket",
        signatureBackend: "/signatures",
      };
      uploader = new bs3u.Uploader(mockFile, mockSettings);
      uploader._uploadId = "upload-id";
      uploader._chunks = {
        1: { startRange: 0, endRange: 1000, uploading: false, uploadComplete: false },
        2: { startRange: 1000, endRange: 2000, uploading: false, uploadComplete: false }
      };
      uploader._completeHeaders = { Authorization: "auth header" };
      uploader._eTags = {
        1: '"chunk-1-eTag"',
        2: '"chunk-2-eTag"',
      };
    });

    describe("a 200 response", function() {
      var xml, attempts;

      beforeEach(function() {
        attempts = 1;
        xml = new DOMParser().parseFromString("<SomeResponse><Location>the-upload-location</Location></SomeResponse>","text/xml");
        mockResponse = {
          target: {
            status: 200,
            responseXML: xml
          }
        };
        spyOn(uploader, "_notifyUploadComplete");
        spyOn(uploader, "_setComplete");
        spyOn(uploader, "_abortAllXHRs");
        uploader._completeUploadSuccess(attempts, mockResponse, mockAjax);
      });

      it("notifies that the upload is complete, passing in the location from the response xml", function() {
        expect(uploader._notifyUploadComplete).toHaveBeenCalledWith("the-upload-location");
      });

      it("sets the uploader to complete", function() {
        expect(uploader._setComplete).toHaveBeenCalled();
      });

      it("aborts any outstanding XHR requests", function() {
        expect(uploader._abortAllXHRs).toHaveBeenCalled();
      });

    });

    describe("a non-200 response", function() {
      var xml, attempts;

      beforeEach(function() {
        attempts = 1;
        mockResponse = {
          target: {
            status: 400,
          }
        };
        spyOn(uploader, '_completeUploadError');
        uploader._completeUploadSuccess(attempts, mockResponse, mockAjax);
      });

      it("calls _completeUploadError", function() {
        expect(uploader._completeUploadError).toHaveBeenCalledWith(attempts, mockResponse, mockAjax);
      });
    });
  });

  describe("_completeUploadError", function() {
    var mockFile, mockSettings, uploader;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {
        host: 'some-host',
        key: "my-upload-key",
        acl: "private",
        encrypted: false,
        maxRetries: 3,
        customHeaders: { "X-Custom-Header": "Stuff" },
        contentType: "video/quicktime",
        bucket: "my-bucket",
        signatureBackend: "/signatures",
      };
      uploader = new bs3u.Uploader(mockFile, mockSettings);
      uploader._uploadId = "upload-id";
      uploader._chunks = {
        1: { startRange: 0, endRange: 1000, uploading: false, uploadComplete: false },
        2: { startRange: 1000, endRange: 2000, uploading: false, uploadComplete: false }
      };
      uploader._completeHeaders = { Authorization: "auth header" };
      uploader._eTags = {
        1: '"chunk-1-eTag"',
        2: '"chunk-2-eTag"',
      };
      spyOn(window, 'setTimeout').and.callFake(function(callback, interval) {
        callback();
      });
    });

    describe("and retries are available", function() {
      var attempts, mockResponse;

      beforeEach(function() {
        attempts = 1;
        mockResponse = {
          target: {
            status: 400
          }
        };
        spyOn(uploader, '_notifyUploadRetry');
        spyOn(uploader, '_getCompleteHeaders');
        uploader._completeUploadError(attempts, mockResponse, mockAjax);
      });

      it("notifies about the next retry attempt", function() {
        expect(uploader._notifyUploadRetry).toHaveBeenCalledWith(
          attempts + 1,
          uploader._formatErrorForAction('completeUpload', mockResponse, mockAjax)
        );
      });

      it("retries the call with the attempt number incremented by 1", function() {
        expect(uploader._getCompleteHeaders).toHaveBeenCalledWith(attempts + 1);
      });
    });

    describe("and no retries are available", function() {
      var attempts, mockResponse;

      beforeEach(function() {
        attempts = 1;
        mockResponse = {
          target: {
            status: 400
          }
        };
        spyOn(uploader, '_retryAvailable').and.returnValue(false);
        spyOn(uploader, '_notifyUploadError');
        spyOn(uploader, '_setFailed');
        uploader._completeUploadError(attempts, mockResponse, mockAjax);
      });

      it("notifies that the upload has failed", function() {
        expect(uploader._notifyUploadError).toHaveBeenCalledWith(
          8,
          uploader.errors[8],
          uploader._formatErrorForAction('completeUpload', mockResponse, mockAjax)
        );
      });

      it("sets the uploader to a failed state", function() {
        expect(uploader._setFailed).toHaveBeenCalled();
      });

    });
  });

  describe("_retryAvailable", function() {
    var mockFile, mockSettings, uploader;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {
        host: 'some-host',
        key: "my-upload-key",
        maxRetries: 3,
        bucket: "my-bucket"
      };
      uploader = new bs3u.Uploader(mockFile, mockSettings);
    });

    it("returns false when the uploader has been cancelled", function() {
      spyOn(uploader, '_isCancelled').and.returnValue(true);
      expect(uploader._retryAvailable(0)).toBeFalsy();
    });

    it("returns false when the uploader has failed", function() {
      spyOn(uploader, '_isFailed').and.returnValue(true);
      expect(uploader._retryAvailable(0)).toBeFalsy();
    });

    it("returns false when the retry number will exceed or equal the maxRetries setting", function() {
      expect(uploader._retryAvailable(3)).toBeFalsy();
    });

    it("returns false when the retry number will be less than the maxRetries setting", function() {
      expect(uploader._retryAvailable(2)).toBeTruthy();
    });
  });

  describe("_allETagsAvailable", function() {
    var mockFile, mockSettings, uploader;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {
        host: 'some-host',
        key: "my-upload-key",
        maxRetries: 3,
        bucket: "my-bucket"
      };
      uploader = new bs3u.Uploader(mockFile, mockSettings);
    });

    it('returns true if each chunk has an eTag', function() {
      uploader._chunks = {
        1: { eTag: "chunk-1-etag" },
        2: { eTag: "chunk-2-etag" }
      };
      expect(uploader._allETagsAvailable()).toBeTruthy();
    });

    it('returns false if at least 1 eTag is null', function() {
      uploader._chunks = {
        1: { eTag: "chunk-1-etag" },
        2: { eTag: null },
        3: { eTag: "chunk-3-etag" }
      };
      expect(uploader._allETagsAvailable()).toBeFalsy();
    });

    it('returns false if at least 1 eTag is undefined', function() {
      uploader._chunks = {
        1: { eTag: "chunk-1-etag" },
        2: { eTag: undefined },
        3: { eTag: "chunk-3-etag" }
      };
      expect(uploader._allETagsAvailable()).toBeFalsy();
    });

    it('returns false if at least 1 eTag is empty', function() {
      uploader._chunks = {
        1: { eTag: "chunk-1-etag" },
        2: { eTag: "" },
        3: { eTag: "chunk-3-etag" }
      };
      expect(uploader._allETagsAvailable()).toBeFalsy();
    });
  });

  describe("_chunkUploadsInProgress", function() {
    var mockFile, mockSettings, uploader;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {
        host: 'some-host',
        key: "my-upload-key",
        maxRetries: 3,
        bucket: "my-bucket"
      };
      uploader = new bs3u.Uploader(mockFile, mockSettings);
      uploader._chunks = {
        1: { uploading: true, uploadComplete: false },
        2: { uploading: false, uploadComplete: false },
        3: { uploading: false, uploadComplete: true },
        4: { uploading: true, uploadComplete: false }
      };
    });

    it("returns the number of chunk uploads in progress", function() {
      expect(uploader._chunkUploadsInProgress()).toEqual(2);
    });

  });

  describe("_startCompleteWatcher", function() {
    var mockFile, mockSettings, uploader;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {};
      uploader = new bs3u.Uploader(mockFile, mockSettings);
      uploader._setUploading();
      spyOn(window, 'setInterval').and.callFake(function(callback, interval) {
        callback();
      });
      spyOn(uploader, '_abortChunkUpload');
      spyOn(window, 'clearInterval');
    });

    describe("when _pauseCompleteWatcher is set to true", function() {
      beforeEach(function() {
        uploader._pauseCompleteWatcher = true;
        spyOn(uploader, '_allETagsAvailable');
        uploader._startCompleteWatcher();
      });

      it("does nothing", function() {
        expect(uploader._allETagsAvailable).not.toHaveBeenCalled();
      });
    });

    describe("when _pauseCompleteWatcher is set to false", function() {
      beforeEach(function() {
        uploader._pauseCompleteWatcher = false;
      });

      describe("and all eTags are available", function() {
        beforeEach(function() {
          spyOn(uploader, '_allETagsAvailable').and.returnValue(true);
          spyOn(uploader, '_getListHeaders');
          uploader._startCompleteWatcher();
        });

        it("pauses the complete worker", function() {
          expect(uploader._pauseCompleteWatcher).toBeTruthy();
        });

        it("retrieves list headers", function() {
          expect(uploader._getListHeaders).toHaveBeenCalled();
        });
      });

      describe("but not all eTags are available", function() {
        beforeEach(function() {
          spyOn(uploader, '_allETagsAvailable').and.returnValue(false);
          spyOn(uploader, '_uploadChunks');
          uploader._startCompleteWatcher();
        });

        it("continues uploading the remaining chunks", function() {
          expect(uploader._uploadChunks).toHaveBeenCalled();
        });
      });

    });

    describe("when the uploader is not uploading", function() {
      beforeEach(function() {
        spyOn(uploader, '_isUploading').and.returnValue(false);
        uploader._startCompleteWatcher();
      });

      it("clears the interval", function() {
        expect(window.clearInterval).toHaveBeenCalled();
      });
    });

  });

  describe("_startBandwidthMonitor", function() {
    var mockFile, mockSettings, uploader;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {
        maxConcurrentChunks: 4
      };
      uploader = new bs3u.Uploader(mockFile, mockSettings);
      spyOn(window, 'Date').and.returnValue({
        getTime: function() { return "timestamp"; }
      });
      spyOn(window, 'setInterval').and.callFake(function(callback, interval) {
        callback();
      });
      spyOn(window, 'clearInterval');
      uploader._chunks = {
        1: { uploading: true, uploadComplete: false },
        2: { uploading: true, uploadComplete: false },
        3: { uploading: true, uploadComplete: false },
        4: { uploading: true, uploadComplete: false },
      };
    });

    describe("when the uploader is not uploading", function() {
      beforeEach(function() {
        spyOn(uploader, '_isUploading').and.returnValue(false);
        uploader._startBandwidthMonitor();
      });

      it("stops the interval", function() {
        expect(window.clearInterval).toHaveBeenCalled();
      });
    });

    describe("when the uploader is uploading", function() {
      beforeEach(function() {
        spyOn(uploader, '_isUploading').and.returnValue(true);
        spyOn(uploader, '_abortChunkUpload');
      });

      it("updates the maxConcurrentChunks setting to be the value determined most optimal", function() {
        spyOn(uploader, '_calculateOptimalConcurrentChunks').and.returnValue(1);
        uploader._startBandwidthMonitor();
        expect(uploader.settings.maxConcurrentChunks).toEqual(1);
      });

      describe("and the number of uploads in progress is greater than the optimal number of chunks", function() {
        beforeEach(function() {
          spyOn(uploader, '_calculateOptimalConcurrentChunks').and.returnValue(2);
          spyOn(uploader, '_chunkUploadsInProgress').and.returnValue(4);
          uploader._startBandwidthMonitor();
        });

        it("aborts a chunk upload until the number of concurrent uplaods equals the optimal setting", function() {
          expect(uploader._abortChunkUpload).toHaveBeenCalled();
        });
      });
    });
  });

  describe("_calculateOptimalConcurrentChunks", function() {
    var mockFile, mockSettings, uploader, bandwidthMonitorStartTime,
    initialMaxConcurrentChunks;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {
        chunkSize: 1024 * 1024 * 6,
      };
      initialMaxConcurrentChunks = 4;
      spyOn(window, 'Date').and.returnValue({
        getTime: function() { return 1000; }
      });
      uploader = new bs3u.Uploader(mockFile, mockSettings);
      bandwidthMonitorStartTime = 500;
    });

    // Keeping the time interval constant and only changing the number of bytes
    // uploaded within that time frame.
    it("returns the number of concurrent chunks possible for faster connections up to the maxConcurrentChunks setting", function() {
      spyOn(uploader, '_calculateUploadProgress').and.returnValue(50000);
      var result = uploader._calculateOptimalConcurrentChunks(bandwidthMonitorStartTime, initialMaxConcurrentChunks);
      expect(result).toEqual(4);
    });

    it("returns an optimal number of concurrent chunks for the connection", function() {
      spyOn(uploader, '_calculateUploadProgress').and.returnValue(10000);
      var result = uploader._calculateOptimalConcurrentChunks(bandwidthMonitorStartTime, initialMaxConcurrentChunks);
      expect(result).toEqual(2);
    });

    it("returns a minimum value of 1 concurrent chunk for slower connections", function() {
      spyOn(uploader, '_calculateUploadProgress').and.returnValue(5000);
      var result = uploader._calculateOptimalConcurrentChunks(bandwidthMonitorStartTime, initialMaxConcurrentChunks);
      expect(result).toEqual(1);
    });
  });

  describe("_abortChunkUpload", function() {
    var mockFile, mockSettings, uploader, abortSpy;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {};
      abortSpy = jasmine.createSpy();
      uploader = new bs3u.Uploader(mockFile, mockSettings);
      uploader._chunks = {
        1: { uploading: true, uploadComplete: true }
      };
      uploader._chunkXHRs = {
        1: { abort: abortSpy }
      };
      uploader._abortChunkUpload(1);
    });

    it("aborts the chunk's XHR", function() {
      expect(abortSpy).toHaveBeenCalled();
    });

    it("sets the uploading and uploadComplete statuses to false", function() {
      expect(uploader._chunks[1].uploding).toBeFalsy();
      expect(uploader._chunks[1].uplodComplete).toBeFalsy();
    });
  });

  describe("_calculateUploadProgress", function() {
    var mockFile, mockSettings, uploader;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {};
      uploader = new bs3u.Uploader(mockFile, mockSettings);
      uploader._chunkProgress = {
        1: 20,
        2: 30,
        3: 50
      };
    });

    it("iterates over the _chunkProgress map and returns the sum of their progress", function() {
      expect(uploader._calculateUploadProgress()).toEqual(100);
    });
  });

  describe("_setReady", function() {
    var mockFile, mockSettings, uploader;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {};
      uploader = new bs3u.Uploader(mockFile, mockSettings);
      uploader._setReady();
    });

    it("sets the uploader status to 'ready'", function() {
      expect(uploader._status).toEqual('ready');
    });
  });

  describe("_isReady", function() {
    var mockFile, mockSettings, uploader;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {};
      uploader = new bs3u.Uploader(mockFile, mockSettings);
    });

    it("returns true if the uploader status is 'ready'", function() {
      uploader._status = "something";
      expect(uploader._isReady()).toBeFalsy();
      uploader._status = "ready";
      expect(uploader._isReady()).toBeTruthy();
    });
  });

  describe("_setUploading", function() {
    var mockFile, mockSettings, uploader;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {};
      uploader = new bs3u.Uploader(mockFile, mockSettings);
      uploader._setUploading();
    });

    it("sets the uploader status to 'uploading'", function() {
      expect(uploader._status).toEqual('uploading');
    });
  });

  describe("_isUploading", function() {
    var mockFile, mockSettings, uploader;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {};
      uploader = new bs3u.Uploader(mockFile, mockSettings);
    });

    it("returns true if the uploader status is 'uploading'", function() {
      uploader._status = "something";
      expect(uploader._isUploading()).toBeFalsy();
      uploader._status = "uploading";
      expect(uploader._isUploading()).toBeTruthy();
    });
  });

  describe("_setComplete", function() {
    var mockFile, mockSettings, uploader;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {};
      uploader = new bs3u.Uploader(mockFile, mockSettings);
      uploader._setComplete();
    });

    it("sets the uploader status to 'complete'", function() {
      expect(uploader._status).toEqual('complete');
    });
  });

  describe("_isComplete", function() {
    var mockFile, mockSettings, uploader;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {};
      uploader = new bs3u.Uploader(mockFile, mockSettings);
    });

    it("returns true if the uploader status is 'uploading'", function() {
      uploader._status = "something";
      expect(uploader._isComplete()).toBeFalsy();
      uploader._status = "complete";
      expect(uploader._isComplete()).toBeTruthy();
    });
  });

  describe("_setCancelled", function() {
    var mockFile, mockSettings, uploader;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {};
      uploader = new bs3u.Uploader(mockFile, mockSettings);
      uploader._setCancelled();
    });

    it("sets the uploader status to 'cancelled'", function() {
      expect(uploader._status).toEqual('cancelled');
    });
  });

  describe("_isCancelled", function() {
    var mockFile, mockSettings, uploader;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {};
      uploader = new bs3u.Uploader(mockFile, mockSettings);
    });

    it("returns true if the uploader status is 'cancelled'", function() {
      uploader._status = "something";
      expect(uploader._isCancelled()).toBeFalsy();
      uploader._status = "cancelled";
      expect(uploader._isCancelled()).toBeTruthy();
    });
  });

  describe("_setFailed", function() {
    var mockFile, mockSettings, uploader;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {};
      uploader = new bs3u.Uploader(mockFile, mockSettings);
      spyOn(uploader, '_abortAllXHRs');
      uploader._setFailed();
    });

    it("sets the uploader status to 'failed'", function() {
      expect(uploader._status).toEqual('failed');
    });

    it("aborts all XHR requests", function() {
      expect(uploader._abortAllXHRs).toHaveBeenCalled();
    });
  });

  describe("_isFailed", function() {
    var mockFile, mockSettings, uploader;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {};
      uploader = new bs3u.Uploader(mockFile, mockSettings);
    });

    it("returns true if the uploader status is 'failed'", function() {
      uploader._status = "something";
      expect(uploader._isFailed()).toBeFalsy();
      uploader._status = "failed";
      expect(uploader._isFailed()).toBeTruthy();
    });
  });

  describe("_notifyUploaderReady", function() {
    var mockFile, mockSettings, uploader, spy;

    beforeEach(function() {
      spy = jasmine.createSpy();
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {
        onReady: spy
      };
      uploader = new bs3u.Uploader(mockFile, mockSettings);
    });

    it("calls the 'onReady' callback provided via upload settings", function() {
      uploader._notifyUploaderReady();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("_notifyUploadStarted", function() {
    var mockFile, mockSettings, uploader, spy;

    beforeEach(function() {
      spy = jasmine.createSpy();
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {
        onStart: spy
      };
      uploader = new bs3u.Uploader(mockFile, mockSettings);
    });

    it("calls the 'onStart' callback provided via upload settings", function() {
      uploader._notifyUploadStarted();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("_notifyUploadProgress", function() {
    var mockFile, mockSettings, uploader, spy;

    beforeEach(function() {
      spy = jasmine.createSpy();
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {
        onProgress: spy
      };
      uploader = new bs3u.Uploader(mockFile, mockSettings);
      uploader._chunkProgress = {
        1: 500
      };

    });

    it("calls the 'onProgress' callback provided via upload settings, passing in bytes loaded and total bytes", function() {
      uploader._notifyUploadProgress();
      expect(spy).toHaveBeenCalledWith(500, 1000);
    });
  });

  describe("_notifyChunkUploaded", function() {
    var mockFile, mockSettings, uploader, spy;

    beforeEach(function() {
      spy = jasmine.createSpy();
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {
        onChunkUploaded: spy
      };
      uploader = new bs3u.Uploader(mockFile, mockSettings);
    });

    it("calls the 'onChunkUploaded' callback provided via upload settings, passing in the chunk number and total chunks", function() {
      uploader._notifyChunkUploaded(1, 3);
      expect(spy).toHaveBeenCalledWith(1, 3);
    });
  });

  describe("_notifyUploadComplete", function() {
    var mockFile, mockSettings, uploader, spy;

    beforeEach(function() {
      spy = jasmine.createSpy();
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {
        onComplete: spy
      };
      uploader = new bs3u.Uploader(mockFile, mockSettings);
    });

    it("calls the 'onComplete' callback provided via upload settings, passing in the upload location", function() {
      uploader._notifyUploadComplete('some/location');
      expect(spy).toHaveBeenCalledWith('some/location');
    });
  });

  describe("_validateFileIsReadable", function() {
    var mockFile, mockSettings, uploader, mockFileReader, spy;

    beforeEach(function() {
      mockFileReader = {
        readAsArrayBuffer: function() {
          this.onloadend();
        }
      };
      spy = jasmine.createSpy();
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000, slice: function(start, end) { return "blob"; } };
      mockSettings = {};
      spyOn(window, 'FileReader').and.returnValue(mockFileReader);
      uploader = new bs3u.Uploader(mockFile, mockSettings);
    });

    describe("set up", function() {
      beforeEach(function() {
        spyOn(mockFile, 'slice').and.callThrough();
        spyOn(mockFileReader, 'readAsArrayBuffer');
      });

      it("slices the file into a 1024 byte blob", function() {
        uploader._validateFileIsReadable();
        expect(mockFile.slice).toHaveBeenCalledWith(0, 1024);
      });

      it("attempts to read a blob of the file", function() {
        uploader._validateFileIsReadable();
        expect(mockFileReader.readAsArrayBuffer).toHaveBeenCalledWith('blob');
      });
    });

    describe("when the file is deemed readable", function() {
      it("executes the provided callback, passing in false", function() {
        mockFileReader.error = "some error";
        uploader._validateFileIsReadable(spy);
        expect(spy).toHaveBeenCalledWith(false);
      });
    });

    describe("when the file cannot be read", function() {
      it("executes the provided callback, passing in true", function() {
        mockFileReader.error = undefined;
        uploader._validateFileIsReadable(spy);
        expect(spy).toHaveBeenCalledWith(true);
      });
    });
  });

  describe("_encryptText", function() {
    var mockFile, mockSettings, uploader, successCallback, errorCallback;

    beforeEach(function() {
      successCallback = jasmine.createSpy();
      errorCallback = jasmine.createSpy();
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {};
      uploader = new bs3u.Uploader(mockFile, mockSettings);
    });

    describe("when configured to use web workers", function() {
      var mockWorker;

      beforeEach(function() {
        uploader.settings.useWebWorkers = true;
        uploader.settings.uploaderFilePath = "/path/to/basic_s3_uploader.js";
        uploader.settings.workerFilePath = "/path/to/basic_s3_worker.js";

        mockWorker = {
          postMessage: function(data) {}
        };
        spyOn(window, 'Worker').and.returnValue(mockWorker);
        spyOn(mockWorker, 'postMessage');

        uploader._encryptText("some text", successCallback, errorCallback);
      });

      it("creates a web worker with the proper script", function() {
        expect(window.Worker).toHaveBeenCalledWith("/path/to/basic_s3_worker.js");
      });

      it("defines 'onmessage' on the worker to execute the success callback with the encrypted data", function() {
        var event = {
          data: "encrypted text!"
        };
        mockWorker.onmessage(event);
        expect(successCallback).toHaveBeenCalledWith("encrypted text!");
      });

      it("defines 'onerror' on the worker to execute the error callback with a custom response object", function() {
        var error = {
          message: "Oops, things broke!"
        };
        var expectedErrorObject = {
          target: {
            status: 500,
            responseText: "There was a Worker error: Oops, things broke!"
          }
        };
        mockWorker.onerror(error);
        expect(errorCallback).toHaveBeenCalledWith(expectedErrorObject);
      });

      it("executes 'postMessage' on the worker with proper data", function() {
        var expectedData = {
          text: "some text",
          uploaderFilePath: "/path/to/basic_s3_uploader.js"
        };
        expect(mockWorker.postMessage).toHaveBeenCalledWith(expectedData);
      });
    });

    describe("when not using web workers", function() {
      beforeEach(function() {
        uploader.settings.useWebWorkers = false;
        spyOn(uploader, "_sha256").and.returnValue("encrypted text!");
        uploader._encryptText("my text", successCallback, errorCallback);
      });

      it("passes the encrypted text directly to the provided success callback", function() {
        expect(successCallback).toHaveBeenCalledWith("encrypted text!");
      });
    });

  });

});
