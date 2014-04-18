describe("bs3u.Uploader", function() {
  var mockAjaxClass;
  beforeEach(function() {
    mockAjaxClass = {};
    mockAjaxClass.send = function(data) {};
    mockAjaxClass.onSuccess = function(callback) {};
    mockAjaxClass.onError = function(callback) {};
    mockAjaxClass.onTimeout = function(callback) {};
    mockAjaxClass.xhr = {};
    spyOn(mockAjaxClass, 'send');
    spyOn(mockAjaxClass, 'onSuccess');
    spyOn(mockAjaxClass, 'onError');
    spyOn(mockAjaxClass, 'onTimeout');
    spyOn(bs3u, 'Ajax').and.returnValue(mockAjaxClass);
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

    it("creates a hash to hold all eTags", function() {
      expect(uploader._eTags).toEqual({});
    });

    it("creates a hash to hold chunk upload progress", function() {
      expect(uploader._chunkProgress).toEqual({});
    });

    it("sets _chunkUploadsInProgress to 0", function() {
      expect(uploader._chunkUploadsInProgress).toEqual(0);
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
        acl: "private",
        signatureBackend: "/",
        initSignaturePath: "initSignature",
        remainingSignaturesPath: "remainingSignatures",
        bucket: "my-bucket",
        host: "http://my-fake-host.com",
        awsAccessKey: "my-access-key",
        log: true,
        customHeaders: { "X-Test-Header": "True" },
        maxConcurrentChunks: 5,
        key: "my-key-for-this-upload",
        onReady: function() {},
        onStart: function() {},
        onProgress: function(loaded, total) {},
        onChunkUploaded: function(chunkNumber, totalChunks) {},
        onComplete: function(location) {},
        onError: function(code, message) {},
        onRetry: function(attempts, data) {},
        onCancel: function() {},
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
      expect(uploader.settings.maxFileSize).toEqual(mockSettings.maxFileSize);
      expect(uploader.settings.acl).toEqual(mockSettings.acl);
      expect(uploader.settings.signatureBackend).toEqual(mockSettings.signatureBackend);
      expect(uploader.settings.initSignaturePath).toEqual(mockSettings.initSignaturePath);
      expect(uploader.settings.remainingSignaturesPath).toEqual(mockSettings.remainingSignaturesPath);
      expect(uploader.settings.bucket).toEqual(mockSettings.bucket);
      expect(uploader.settings.host).toEqual(mockSettings.host);
      expect(uploader.settings.awsAccessKey).toEqual(mockSettings.awsAccessKey);
      expect(uploader.settings.log).toEqual(mockSettings.log);
      expect(uploader.settings.customHeaders).toEqual(mockSettings.customHeaders);
      expect(uploader.settings.maxConcurrentChunks).toEqual(mockSettings.maxConcurrentChunks);
      expect(uploader.settings.key).toEqual(mockSettings.key);
      expect(uploader.settings.onReady).toEqual(mockSettings.onReady);
      expect(uploader.settings.onStart).toEqual(mockSettings.onStart);
      expect(uploader.settings.onProgress).toEqual(mockSettings.onProgress);
      expect(uploader.settings.onChunkUploaded).toEqual(mockSettings.onChunkUploaded);
      expect(uploader.settings.onComplete).toEqual(mockSettings.onComplete);
      expect(uploader.settings.onError).toEqual(mockSettings.onError);
      expect(uploader.settings.onRetry).toEqual(mockSettings.onRetry);
      expect(uploader.settings.onCancel).toEqual(mockSettings.onCancel);
    });

    it("provides a default for every option if no value was provided", function() {
      uploader = new bs3u.Uploader(mockFile, {});

      expect(uploader.settings.contentType).toEqual(mockFile.type);
      expect(uploader.settings.chunkSize).toEqual(1024 * 1024 * 10);
      expect(uploader.settings.encrypted).toBeFalsy();
      expect(uploader.settings.maxRetries).toEqual(5);
      expect(uploader.settings.maxFileSize).toEqual(1024 * 1024 * 1024 * 5);
      expect(uploader.settings.acl).toEqual("public-read");
      expect(uploader.settings.signatureBackend).toEqual("");
      expect(uploader.settings.initSignaturePath).toEqual("/get_init_signature");
      expect(uploader.settings.remainingSignaturesPath).toEqual("/get_remaining_signatures");
      expect(uploader.settings.bucket).toEqual("your-bucket-name");
      expect(uploader.settings.host).toEqual("http://" + uploader.settings.bucket + "." + "s3.amazonaws.com");
      expect(uploader.settings.awsAccessKey).toEqual("YOUR_AWS_ACCESS_KEY_ID");
      expect(uploader.settings.log).toBeFalsy();
      expect(uploader.settings.customHeaders).toEqual({});
      expect(uploader.settings.maxConcurrentChunks).toEqual(5);
      expect(uploader.settings.key).toEqual("/" + uploader.settings.bucket + "/timestamp_" + uploader.file.name);
      expect(uploader.settings.onReady).toBeDefined();
      expect(uploader.settings.onStart).toBeDefined();
      expect(uploader.settings.onProgress).toBeDefined();
      expect(uploader.settings.onChunkUploaded).toBeDefined();
      expect(uploader.settings.onComplete).toBeDefined();
      expect(uploader.settings.onError).toBeDefined();
      expect(uploader.settings.onRetry).toBeDefined();
      expect(uploader.settings.onCancel).toBeDefined();
    });

  });

  describe("startUpload", function() {
    var uploader, mockSettings, mockFile;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {};
      uploader = new bs3u.Uploader(mockFile, mockSettings);

      spyOn(uploader, '_getInitSignature');
    });

    describe("when the uploader is already uploading", function() {
      beforeEach(function() {
        spyOn(uploader, '_isUploading').and.returnValue(true);

        uploader.startUpload();
      });

      it("does not get the init signature", function() {
        expect(uploader._getInitSignature).not.toHaveBeenCalled();
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
          spyOn(uploader, '_resetData');
          uploader.startUpload();
        });

        it("does not get the init signature", function() {
          expect(uploader._getInitSignature).not.toHaveBeenCalled();
        });

        it("notifies there was an upload error", function() {
          expect(uploader._notifyUploadError).toHaveBeenCalledWith(0, uploader.errors[0]);
        });

        it("sets the upload to a failed state", function() {
          expect(uploader._setFailed).toHaveBeenCalled();
        });

        it("resets the uploader's data", function() {
          expect(uploader._resetData).toHaveBeenCalled();
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
            spyOn(uploader, '_resetData');

            uploader.startUpload();
          });

          it("does not get the init signature", function() {
            expect(uploader._getInitSignature).not.toHaveBeenCalled();
          });

          it("notifies there was an upload error", function() {
            expect(uploader._notifyUploadError).toHaveBeenCalledWith(1, uploader.errors[1]);
          });

          it("sets the upload to a failed state", function() {
            expect(uploader._setFailed).toHaveBeenCalled();
          });

          it("resets the uploader's data", function() {
            expect(uploader._resetData).toHaveBeenCalled();
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

          it("calls to get the init signature", function() {
            expect(uploader._getInitSignature).toHaveBeenCalled();
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

      mockAjax1 = { abort: function() {} };
      mockAjax2 = { abort: function() {} };
      mockAjax3 = { abort: function() {} };

      spyOn(mockAjax1, 'abort');
      spyOn(mockAjax2, 'abort');
      spyOn(mockAjax3, 'abort');

      uploader = new bs3u.Uploader(mockFile, mockSettings);
      uploader._XHRs = [mockAjax1];
      uploader._chunkXHRs = {
        1: mockAjax2,
        2: mockAjax3,
      };
    });

    describe("when the uploader is not uploading", function() {
      beforeEach(function() {
        spyOn(uploader, '_isUploading').and.returnValue(false);

        uploader.cancelUpload();
      });

      it("does not abort any XHRs", function() {
        expect(mockAjax1.abort).not.toHaveBeenCalled();
        expect(mockAjax2.abort).not.toHaveBeenCalled();
        expect(mockAjax3.abort).not.toHaveBeenCalled();
      });
    });

    describe("when the uploader is uploading", function() {
      beforeEach(function() {
        spyOn(uploader, '_isUploading').and.returnValue(true);
        spyOn(uploader, '_notifyUploadCancelled');
        spyOn(uploader, '_setCancelled');
        spyOn(uploader, '_resetData');

        uploader.cancelUpload();
      });

      it("aborts any XHRs", function() {
        expect(mockAjax1.abort).toHaveBeenCalled();
        expect(mockAjax2.abort).toHaveBeenCalled();
        expect(mockAjax3.abort).toHaveBeenCalled();
      });

      it("notifies that the upload has been cancelled", function() {
        expect(uploader._notifyUploadCancelled).toHaveBeenCalled();
      });

      it("sets the uploader to a cancelled state", function() {
        expect(uploader._setCancelled).toHaveBeenCalled();
      });

      it("resets the uploader's data", function() {
        expect(uploader._resetData).toHaveBeenCalled();
      });

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

  describe("_getInitSignature", function() {
    var mockFile, mockSettings, uploader;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {
        signatureBackend: "/signatures",
        initSignaturePath: "/get_init_signature",
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
      uploader._getInitSignature();
      expect(bs3u.Ajax).toHaveBeenCalled();

      ajaxSettings = bs3u.Ajax.calls.argsFor(0)[0];

      expect(ajaxSettings.url).toEqual(mockSettings.signatureBackend + mockSettings.initSignaturePath);
      expect(ajaxSettings.method).toEqual("GET");
      expect(ajaxSettings.headers).toEqual(mockSettings.customHeaders);
      expect(ajaxSettings.params.key).toEqual(mockSettings.key);
      expect(ajaxSettings.params.filename).toEqual(mockFile.name);
      expect(ajaxSettings.params.filesize).toEqual(mockFile.size);
      expect(ajaxSettings.params.mime_type).toEqual(mockSettings.contentType);
      expect(ajaxSettings.params.bucket).toEqual(mockSettings.bucket);
      expect(ajaxSettings.params.acl).toEqual(mockSettings.acl);
      expect(ajaxSettings.params.encrypted).toEqual(mockSettings.encrypted);
    });

    it("registers the success callback", function() {
      spyOn(uploader, '_getInitSignatureSuccess');
      var attempts = 1;
      uploader._getInitSignature(attempts);
      var callback = mockAjaxClass.onSuccess.calls.argsFor(0)[0];
      var mockResponse = { status: 200 };
      callback(mockResponse);
      expect(uploader._getInitSignatureSuccess).toHaveBeenCalledWith(attempts, mockResponse);
    });

    it("registers the error callback", function() {
      spyOn(uploader, '_getInitSignatureError');
      var attempts = 1;
      uploader._getInitSignature(attempts);
      var callback = mockAjaxClass.onError.calls.argsFor(0)[0];
      var mockResponse = { status: 500 };
      callback(mockResponse);
      expect(uploader._getInitSignatureError).toHaveBeenCalledWith(attempts, mockResponse);
    });

    it("registers the timeout callback", function() {
      spyOn(uploader, '_getInitSignatureError');
      var attempts = 1;
      uploader._getInitSignature(attempts);
      var callback = mockAjaxClass.onTimeout.calls.argsFor(0)[0];
      var mockResponse = { status: 500 };
      callback(mockResponse);
      expect(uploader._getInitSignatureError).toHaveBeenCalledWith(attempts, mockResponse);
    });

    it("sends the request", function() {
      uploader._getInitSignature();
      expect(mockAjaxClass.send).toHaveBeenCalled();
    });

    it("pushes the xhr request into the _XHRs array", function() {
      uploader._getInitSignature();
      expect(uploader._XHRs[0]).toEqual(mockAjaxClass);
    });
  });

  describe("_getInitSignatureSuccess", function() {
    var uploader, mockFile, mockSettings, mockResponse, attempts;

    beforeEach(function() {
      attempts = 0;
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {
        signatureBackend: "/signatures",
        initSignaturePath: "/get_init_signature",
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
          status: 200,
          target: {
            responseText: "{\"signature\": \"init-signature\", \"date\": \"signature-date\"}"
          }
        };
        spyOn(uploader, '_initiateUpload');
        uploader._getInitSignatureSuccess(attempts, mockResponse);
      });

      it("parses and stores the init signature and date from the response body", function() {
        expect(uploader._initSignature).toEqual("init-signature");
        expect(uploader._date).toEqual("signature-date");
      });

      it("initiates the upload", function() {
        expect(uploader._initiateUpload).toHaveBeenCalled();
      });
    });

    describe("a non-200 response", function() {
      beforeEach(function() {
        mockResponse = {
          status: 500
        };
        spyOn(uploader, '_getInitSignatureError');
        uploader._getInitSignatureSuccess(attempts, mockResponse);
      });

      it("calls the error handler", function() {
        expect(uploader._getInitSignatureError).toHaveBeenCalledWith(attempts, mockResponse);
      });
    });
  });

  describe("_getInitSignatureError", function() {
    var uploader, mockFile, mockSettings, mockResponse, attempts;

    beforeEach(function() {
      attempts = 2;
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockResponse = {
        status: 500
      };
      mockSettings = {
        signatureBackend: "/signatures",
        initSignaturePath: "/get_init_signature",
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
        spyOn(uploader, '_getInitSignature');
        spyOn(uploader, '_retryAvailable').and.returnValue(true);
        uploader._getInitSignatureError(attempts, mockResponse);
      });

      it("notifies about the retry", function() {
        expect(uploader._notifyUploadRetry).toHaveBeenCalledWith(attempts + 1, jasmine.any(Object));
      });

      it("calls _getInitSignature with attempts incremented by 1", function() {
        expect(uploader._getInitSignature).toHaveBeenCalledWith(attempts + 1);
      });
    });

    describe("when no retries are available", function() {
      beforeEach(function() {
        spyOn(uploader, '_notifyUploadError');
        spyOn(uploader, '_setFailed');
        spyOn(uploader, '_resetData');
        spyOn(uploader, '_retryAvailable').and.returnValue(false);
        uploader._getInitSignatureError(attempts, mockResponse);
      });

      it("notifies about the upload error", function() {
        expect(uploader._notifyUploadError).toHaveBeenCalledWith(2, uploader.errors[2]);
      });

      it("sets the uploader to a failed state", function() {
        expect(uploader._setFailed).toHaveBeenCalled();
      });

      it("resets the uploader data", function() {
        expect(uploader._resetData).toHaveBeenCalled();
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
        awsAccessKey: 'my-access-key',

      };
      uploader = new bs3u.Uploader(mockFile, mockSettings);
    });

    it("adds the XHR object to the _XHRs array", function() {
      expect(uploader._XHRs.length).toEqual(0);
      uploader._initiateUpload();
      expect(uploader._XHRs[0]).toEqual(mockAjaxClass);
    });

    describe("ajax settings", function() {
      var ajaxSettings;

      beforeEach(function() {
        uploader._date = "today";
        uploader._initSignature = "init-signature";
      });

      it("properly configures the url, method, and headers for the call", function() {
        uploader._initiateUpload();
        ajaxSettings = bs3u.Ajax.calls.argsFor(0)[0];

        expect(ajaxSettings.url).toEqual("some-host/my-upload-key?uploads");
        expect(ajaxSettings.method).toEqual("POST");
        expect(ajaxSettings.headers['x-amz-date']).toEqual('today');
        expect(ajaxSettings.headers['x-amz-acl']).toEqual('private');
        expect(ajaxSettings.headers.Authorization).toEqual('AWS my-access-key:init-signature');
        expect(ajaxSettings.headers['Content-Disposition']).toEqual('attachment; filename=myfile');
      });

      describe("non-encrypted upload", function() {
        it("does not set the encryption header", function() {
          uploader.settings.encrypted = false;
          uploader._initiateUpload();
          ajaxSettings = bs3u.Ajax.calls.argsFor(0)[0];
          expect(ajaxSettings.headers['x-amz-server-side-encryption']).toBeUndefined();
        });
      });

      describe("an encrypted upload", function() {
        it("sets the encryption header", function() {
          uploader.settings.encrypted = true;
          uploader._initiateUpload();
          ajaxSettings = bs3u.Ajax.calls.argsFor(0)[0];
          expect(ajaxSettings.headers['x-amz-server-side-encryption']).toEqual("AES256");
        });
      });
    });

    it("registers the success callback", function() {
      spyOn(uploader, '_initiateUploadSuccess');
      var attempts = 1;
      uploader._initiateUpload(attempts);
      var callback = mockAjaxClass.onSuccess.calls.argsFor(0)[0];
      var mockResponse = { status: 200 };
      callback(mockResponse);
      expect(uploader._initiateUploadSuccess).toHaveBeenCalledWith(attempts, mockResponse);
    });

    it("registers the error callback", function() {
      spyOn(uploader, '_initiateUploadError');
      var attempts = 1;
      uploader._initiateUpload(attempts);
      var callback = mockAjaxClass.onError.calls.argsFor(0)[0];
      var mockResponse = { status: 500 };
      callback(mockResponse);
      expect(uploader._initiateUploadError).toHaveBeenCalledWith(attempts, mockResponse);
    });

    it("registers the timeout callback", function() {
      spyOn(uploader, '_initiateUploadError');
      var attempts = 1;
      uploader._initiateUpload(attempts);
      var callback = mockAjaxClass.onTimeout.calls.argsFor(0)[0];
      var mockResponse = { status: 500 };
      callback(mockResponse);
      expect(uploader._initiateUploadError).toHaveBeenCalledWith(attempts, mockResponse);
    });

    it("sends the ajax request", function() {
      uploader._initiateUpload();
      expect(mockAjaxClass.send).toHaveBeenCalled();
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
        awsAccessKey: 'my-access-key',

      };
      uploader = new bs3u.Uploader(mockFile, mockSettings);
    });

    describe("a 200 response", function() {
      var mockResponse, xml;

      beforeEach(function() {
        xml = new DOMParser().parseFromString("<SomeResponse><UploadId>the-upload-id</UploadId></SomeResponse>","text/xml");
        mockResponse = {
          status: 200,
          target: {
            responseXML: xml
          }
        };
        spyOn(uploader, '_getRemainingSignatures').and.callFake(function(retries, callback) {
          callback();
        });
        spyOn(uploader, '_uploadChunks');
        spyOn(uploader, '_startProgressWatcher');
        spyOn(uploader, '_startBandwidthMonitor');
        uploader._initiateUploadSuccess(attempts, mockResponse);
      });

      it("stores the uploadId from the response xml", function() {
        expect(uploader._uploadId).toEqual('the-upload-id');
      });

      it("fetches the remaining signatures", function() {
        expect(uploader._getRemainingSignatures).toHaveBeenCalled();
      });

      it("begins uploading chunks once the remaining signatures are present", function() {
        expect(uploader._uploadChunks).toHaveBeenCalled();
      });

      it("starts the progress watcher interval", function() {
        expect(uploader._startProgressWatcher).toHaveBeenCalled();
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
          status: 400
        };
        uploader._initiateUploadSuccess(attempts, mockResponse);
      });

      it("calls the error handler", function() {
        expect(uploader._initiateUploadError).toHaveBeenCalledWith(attempts, mockResponse);
      });
    });
  });

  describe("_initiateUploadError", function() {
    var uploader, mockFile, mockSettings, mockResponse, attempts;

    beforeEach(function() {
      attempts = 2;
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockResponse = {
        status: 500
      };
      mockSettings = {
        signatureBackend: "/signatures",
        initSignaturePath: "/get_init_signature",
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
        spyOn(uploader, '_initiateUpload');
        spyOn(uploader, '_retryAvailable').and.returnValue(true);
        uploader._initiateUploadError(attempts, mockResponse);
      });

      it("notifies about the retry", function() {
        expect(uploader._notifyUploadRetry).toHaveBeenCalledWith(attempts + 1, jasmine.any(Object));
      });

      it("calls _initiateUpload with attempts incremented by 1", function() {
        expect(uploader._initiateUpload).toHaveBeenCalledWith(attempts + 1);
      });
    });

    describe("when no retries are available", function() {
      beforeEach(function() {
        spyOn(uploader, '_notifyUploadError');
        spyOn(uploader, '_setFailed');
        spyOn(uploader, '_resetData');
        spyOn(uploader, '_retryAvailable').and.returnValue(false);
        uploader._initiateUploadError(attempts, mockResponse);
      });

      it("notifies about the upload error", function() {
        expect(uploader._notifyUploadError).toHaveBeenCalledWith(3, uploader.errors[3]);
      });

      it("sets the uploader to a failed state", function() {
        expect(uploader._setFailed).toHaveBeenCalled();
      });

      it("resets the uploader data", function() {
        expect(uploader._resetData).toHaveBeenCalled();
      });
    });
  });

  describe("_getRemainingSignatures", function() {
    var mockFile, mockSettings, uploader;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {
        host: 'some-host',
        key: "my-upload-key",
        acl: "private",
        encrypted: false,
        maxRetries: 3,
        awsAccessKey: 'my-access-key',
        customHeaders: { "X-Custom-Header": "Stuff" },
        contentType: "video/quicktime",
        bucket: "my-bucket",
        signatureBackend: "/signatures",
        remainingSignaturesPath: "/remaining"

      };
      uploader = new bs3u.Uploader(mockFile, mockSettings);
      uploader._uploadId = "upload-id";
      uploader._chunks = {
        1: "blah",
        2: "blah",
        3: "blah"
      };
    });

    it("adds the XHR object to the _XHRs array", function() {
      expect(uploader._XHRs.length).toEqual(0);
      uploader._getRemainingSignatures();
      expect(uploader._XHRs[0]).toEqual(mockAjaxClass);
    });

    it("properly configures the url, method, params, and headers for the call", function() {
      uploader._getRemainingSignatures();
      ajaxSettings = bs3u.Ajax.calls.argsFor(0)[0];

      expect(ajaxSettings.url).toEqual("/signatures/remaining");
      expect(ajaxSettings.method).toEqual("GET");
      expect(ajaxSettings.params.upload_id).toEqual("upload-id");
      expect(ajaxSettings.params.total_chunks).toEqual(3);
      expect(ajaxSettings.params.mime_type).toEqual("video/quicktime");
      expect(ajaxSettings.params.bucket).toEqual("my-bucket");
      expect(ajaxSettings.params.key).toEqual("my-upload-key");
      expect(ajaxSettings.headers['X-Custom-Header']).toEqual("Stuff");
    });

    it("registers the success callback", function() {
      spyOn(uploader, '_getRemainingSignaturesSuccess');
      var attempts = 1;
      var signatureCallback = function() {};
      uploader._getRemainingSignatures(attempts, signatureCallback);
      var callback = mockAjaxClass.onSuccess.calls.argsFor(0)[0];
      var mockResponse = { status: 200 };
      callback(mockResponse);
      expect(uploader._getRemainingSignaturesSuccess).toHaveBeenCalledWith(attempts, mockResponse, signatureCallback);
    });

    it("registers the error callback", function() {
      spyOn(uploader, '_getRemainingSignaturesError');
      var attempts = 1;
      var signatureCallback = function() {};
      uploader._getRemainingSignatures(attempts, signatureCallback);
      var callback = mockAjaxClass.onError.calls.argsFor(0)[0];
      var mockResponse = { status: 500 };
      callback(mockResponse);
      expect(uploader._getRemainingSignaturesError).toHaveBeenCalledWith(attempts, mockResponse, signatureCallback);
    });

    it("registers the timeout callback", function() {
      spyOn(uploader, '_getRemainingSignaturesError');
      var attempts = 1;
      var signatureCallback = function() {};
      uploader._getRemainingSignatures(attempts, signatureCallback);
      var callback = mockAjaxClass.onTimeout.calls.argsFor(0)[0];
      var mockResponse = { status: 500 };
      callback(mockResponse);
      expect(uploader._getRemainingSignaturesError).toHaveBeenCalledWith(attempts, mockResponse, signatureCallback);
    });
    
    it("sends the ajax request", function() {
      uploader._getRemainingSignatures();
      expect(mockAjaxClass.send).toHaveBeenCalled();
    });
  });

  describe("_getRemainingSignaturesSuccess", function() {
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
        awsAccessKey: 'my-access-key',
        customHeaders: { "X-Custom-Header": "Stuff" },
        contentType: "video/quicktime",
        bucket: "my-bucket",
        signatureBackend: "/signatures",
        remainingSignaturesPath: "/remaining"

      };
      uploader = new bs3u.Uploader(mockFile, mockSettings);
    });

    describe("a 200 response", function() {
      var mockResponse, json, callback;

      beforeEach(function() {
        json = '{"chunk_signatures":{"1":{"signature":"signature","date":"date"},"2":{"signature":"signature","date":"date"},"3":{"signature":"signature","date":"date"}},"complete_signature":{"signature":"signature","date":"date"},"list_signature":{"signature":"signature","date":"date"}}';
        mockResponse = {
          status: 200,
          target: {
            responseText: json
          }
        };
        callback = jasmine.createSpy();
        uploader._getRemainingSignaturesSuccess(attempts, mockResponse, callback);
      });

      it("stores the returned signatures", function() {
        expect(uploader._chunkSignatures[1].signature).toEqual("signature");
        expect(uploader._chunkSignatures[1].date).toEqual("date");
        expect(uploader._chunkSignatures[2].signature).toEqual("signature");
        expect(uploader._chunkSignatures[2].date).toEqual("date");
        expect(uploader._chunkSignatures[3].signature).toEqual("signature");
        expect(uploader._chunkSignatures[3].date).toEqual("date");
      });

      it("executes the provided callback, if defined", function() {
        expect(callback).toHaveBeenCalled();
      });

    });

    describe("a non-200 response", function() {
      var mockResponse, callback;

      beforeEach(function() {
        callback = function() {};
        mockResponse = {
          status: 400
        };
        spyOn(uploader, '_getRemainingSignaturesError');
        uploader._getRemainingSignaturesSuccess(attempts, mockResponse, callback);
      });

      it("calls the error handler", function() {
        expect(uploader._getRemainingSignaturesError).toHaveBeenCalledWith(attempts, mockResponse, callback);
      });
    });
  });

  describe("_getRemainingSignaturesError", function() {
    var uploader, mockFile, mockSettings, mockResponse, attempts,
    signatureCallback;

    beforeEach(function() {
      signatureCallback = function() {};
      attempts = 2;
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockResponse = {
        status: 500
      };
      mockSettings = {
        signatureBackend: "/signatures",
        initSignaturePath: "/get_init_signature",
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
        spyOn(uploader, '_getRemainingSignatures');
        spyOn(uploader, '_retryAvailable').and.returnValue(true);
        uploader._getRemainingSignaturesError(attempts, mockResponse, signatureCallback);
      });

      it("notifies about the retry", function() {
        expect(uploader._notifyUploadRetry).toHaveBeenCalledWith(attempts + 1, jasmine.any(Object));
      });

      it("calls _getRemainingSignatures with attempts incremented by 1", function() {
        expect(uploader._getRemainingSignatures).toHaveBeenCalledWith(attempts + 1, signatureCallback);
      });
    });

    describe("when no retries are available", function() {
      beforeEach(function() {
        spyOn(uploader, '_notifyUploadError');
        spyOn(uploader, '_setFailed');
        spyOn(uploader, '_resetData');
        spyOn(uploader, '_retryAvailable').and.returnValue(false);
        uploader._getRemainingSignaturesError(attempts, mockResponse, signatureCallback);
      });

      it("notifies about the upload error", function() {
        expect(uploader._notifyUploadError).toHaveBeenCalledWith(4, uploader.errors[4]);
      });

      it("sets the uploader to a failed state", function() {
        expect(uploader._setFailed).toHaveBeenCalled();
      });

      it("resets the uploader data", function() {
        expect(uploader._resetData).toHaveBeenCalled();
      });
    });
  });

  describe("_uploadChunks", function() {
    var mockFile, uploader;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      uploader = new bs3u.Uploader(mockFile, {});
      uploader._chunks = {
        1: { uploading: false, uploadComplete: false },
        2: { uploading: true, uploadComplete: false },
        3: { uploading: false, uploadComplete: true },
        4: { uploading: false, uploadComplete: false },
      };
      spyOn(uploader, '_uploadChunk');
    });

    describe("when there is an upload spot available", function() {
      beforeEach(function() {
        spyOn(uploader, '_uploadSpotAvailable').and.returnValue(true);
        uploader._uploadChunks();
      });

      it("uploads a chunk if its not already uploading and not already complete", function() {
        expect(uploader._uploadChunk.calls.count()).toEqual(2);
        expect(uploader._uploadChunk.calls.argsFor(0)[0]).toEqual(1);
        expect(uploader._uploadChunk.calls.argsFor(1)[0]).toEqual(4);
      });
    });

    describe("when there is not an upload spot available", function() {
      beforeEach(function() {
        spyOn(uploader, '_uploadSpotAvailable').and.returnValue(false);
        uploader._uploadChunks();
      });

      it("won't upload any chunks", function() {
        expect(uploader._uploadChunk.calls.count()).toEqual(0);
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
      uploader._chunkUploadsInProgress = 2;
      expect(uploader._uploadSpotAvailable()).toBeTruthy();
    });

    it("returns false if the number of concurrent uploads is equal to the max amount", function() {
      uploader._chunkUploadsInProgress = 3;
      expect(uploader._uploadSpotAvailable()).toBeFalsy();
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
        awsAccessKey: 'my-access-key',
        customHeaders: { "X-Custom-Header": "Stuff" },
        contentType: "video/quicktime",
        bucket: "my-bucket",
        signatureBackend: "/signatures",
        remainingSignaturesPath: "/remaining"

      };
      uploader = new bs3u.Uploader(mockFile, mockSettings);
      uploader._uploadId = "upload-id";
      uploader._chunks = {
        1: { startRange: 0, endRange: 1000, uploading: false, uploadComplete: false }
      };
      uploader._chunkSignatures = {
        1: { signature: 'chunk-signature', date: 'date' }
      };
    });

    it("adds the XHR object to the _chunkXHRs map", function() {
      spyOn(uploader, '_ajax').and.returnValue("XHR");
      expect(Object.keys(uploader._chunkXHRs).length).toEqual(0);
      uploader._uploadChunk(1);
      expect(uploader._chunkXHRs[1]).toEqual("XHR");
    });

    describe("ajax settings", function() {
      var ajaxSettings;

      beforeEach(function() {
        spyOn(uploader, '_ajax');
      });

      it("properly configures the url, method, params, and headers for the call", function() {
        uploader._uploadChunk(1);
        ajaxSettings = uploader._ajax.calls.argsFor(0)[0];
        expect(ajaxSettings.url).toEqual('some-host/my-upload-key');
        expect(ajaxSettings.method).toEqual('PUT');
        expect(ajaxSettings.body).toEqual('file-blob');
        expect(ajaxSettings.params.uploadId).toEqual('upload-id');
        expect(ajaxSettings.params.partNumber).toEqual(1);
        expect(ajaxSettings.headers['x-amz-date']).toEqual('date');
        expect(ajaxSettings.headers.Authorization).toEqual('AWS my-access-key:chunk-signature');
        expect(ajaxSettings.headers['Content-Disposition']).toEqual('attachment; filename=myfile');
        expect(ajaxSettings.headers['Content-Type']).toEqual('video/quicktime');
      });

    });

    describe("when progress is reported", function() {
      var mockXHR;
      beforeEach(function() {
        mockXHR = {};
        mockResponse = {
          loaded: 1000
        };
        spyOn(uploader, '_ajax').and.callFake(function(config) {
          config.status = 200;
          config.progress(mockResponse);
          return mockXHR;
        });
        spyOn(window, 'Date').and.returnValue({
          getTime: function() { return "timestamp"; }
        });
        spyOn(uploader, '_notifyUploadProgress');
        uploader._chunkXHRs = {
          1: mockXHR
        };
        uploader._uploadChunk(1);
      });

      it("stores the progress returned in the chunkProgress hash", function() {
        expect(uploader._chunkProgress[1]).toEqual(1000);
      });

      it("sets the lastProgressAt timestamp on the chunkXHR", function() {
        expect(uploader._chunkXHRs[1].lastProgressAt).toEqual("timestamp");
      });

      it("notfies that there was upload progress", function() {
        expect(uploader._notifyUploadProgress).toHaveBeenCalled();
      });
    });

    describe("a successful response", function() {
      var mocks;

      beforeEach(function() {
        mocks = {
          getResponseHeader: function(header) {}
        };
        mockResponse = "";
        spyOn(uploader, '_ajax').and.callFake(function(config) {
          config.status = 200;
          config.getResponseHeader = mocks.getResponseHeader;
          config.success(null);
        });
        spyOn(uploader, '_notifyChunkUploaded');
        spyOn(mocks, 'getResponseHeader').and.returnValue('eTag');

      });

      describe("handles the chunk status and stores data about the upload", function() {
        beforeEach(function() {
          spyOn(uploader, '_allETagsAvailable').and.returnValue(false);
          spyOn(uploader, '_uploadChunks');
          uploader._uploadChunk(1);
        });

        it("flags the chunk as no longer uploading and that the upload is complete", function() {
          expect(uploader._chunks[1].uploading).toBeFalsy();
          expect(uploader._chunks[1].uploadComplete).toBeTruthy();
        });

        it("deletes the chunk XHR object", function() {
          expect(uploader._chunkXHRs[1]).toBeUndefined();
        });

        it("decrements _chunkUploadsInProgress by 1", function() {
          expect(uploader._chunkUploadsInProgress).toEqual(0);
        });

        it("notifies that the chunk has uploaded", function() {
          var totalChunks = Object.keys(uploader._chunks).length;
          expect(uploader._notifyChunkUploaded).toHaveBeenCalledWith(1, totalChunks);
        });

        it("gets the eTag from the responseHeaders and stores it", function() {
          expect(mocks.getResponseHeader).toHaveBeenCalledWith("ETag");
          expect(uploader._eTags[1]).toEqual("eTag");
        });
      });

      describe("when all eTags are available", function() {
        beforeEach(function() {
          spyOn(uploader, '_allETagsAvailable').and.returnValue(true);
          spyOn(uploader, '_verifyAllChunksUploaded');
          uploader._uploadChunk(1);
        });

        it("calls to verify if all chunks have been uploaded", function() {
          expect(uploader._verifyAllChunksUploaded).toHaveBeenCalled();
        });
      });

      describe("when not all eTags are avaialble", function() {
        beforeEach(function() {
          spyOn(uploader, '_allETagsAvailable').and.returnValue(false);
          spyOn(uploader, '_uploadChunks');
          uploader._uploadChunk(1);
        });

        it("continues uploading the remaining chunks", function() {
          expect(uploader._uploadChunks).toHaveBeenCalled();
        });
      });

    });

    describe("a failed response", function() {
      var xhrAbortSpy;

      beforeEach(function() {
        xhrAbortSpy = jasmine.createSpy();
        uploader._chunkXHRs[1] = { abort: xhrAbortSpy };
        spyOn(uploader, '_ajax').and.callFake(function(config) {
          config.status = 400;
          config.error(null);
        });
        spyOn(window, 'setTimeout').and.callFake(function(callback, interval) {
          callback();
        });
        spyOn(uploader, '_notifyUploadRetry');
        spyOn(uploader, '_retryChunk');
        uploader._uploadChunk(1);
      });

      it("decrements the _chunkUploadsInProgress by one", function() {
        expect(uploader._chunkUploadsInProgress).toEqual(0);
      });

      it("sets uploading and uploadComplete to false for the chunk", function() {
        expect(uploader._chunks[1].uploading).toBeFalsy();
        expect(uploader._chunks[1].uploadComplete).toBeFalsy();
      });

      it("aborts the XHR for that chunk", function() {
        expect(xhrAbortSpy).toHaveBeenCalled();
      });

      it("deletes the XHR for that chunk", function() {
        expect(uploader._chunkXHRs[1]).toBeUndefined();
      });

      it("notfies that the chunk upload is going to retry another attempt", function() {
        expect(uploader._notifyUploadRetry).toHaveBeenCalled();
      });

      it("retries uploading the chunk", function() {
        expect(uploader._retryChunk).toHaveBeenCalledWith(1);
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
        encrypted: false,
        maxRetries: 3,
        awsAccessKey: 'my-access-key',
        customHeaders: { "X-Custom-Header": "Stuff" },
        contentType: "video/quicktime",
        bucket: "my-bucket",
        signatureBackend: "/signatures",
        remainingSignaturesPath: "/remaining"

      };
      uploader = new bs3u.Uploader(mockFile, mockSettings);
      uploader._uploadId = "upload-id";
      uploader._chunks = {
        1: { startRange: 0, endRange: 1000, uploading: false, uploadComplete: false },
        2: { startRange: 1000, endRange: 2000, uploading: false, uploadComplete: false }
      };
      uploader._listSignature = { signature: 'list-signature', date: 'date' };
      uploader._eTags = {
        1: '"chunk-1-eTag"',
        2: '"chunk-2-eTag"',
      };
    });

    it("adds the XHR object to the _chunkXHRs map", function() {
      spyOn(uploader, '_ajax').and.returnValue("XHR");
      expect(uploader._XHRs.length).toEqual(0);
      uploader._verifyAllChunksUploaded();
      expect(uploader._XHRs[0]).toEqual("XHR");
    });

    describe("ajax settings", function() {
      var ajaxSettings;

      beforeEach(function() {
        spyOn(uploader, '_ajax');
      });

      it("properly configures the url, method, params, and headers for the call", function() {
        uploader._verifyAllChunksUploaded();
        ajaxSettings = uploader._ajax.calls.argsFor(0)[0];
        expect(ajaxSettings.url).toEqual('some-host/my-upload-key');
        expect(ajaxSettings.method).toEqual('GET');
        expect(ajaxSettings.params.uploadId).toEqual('upload-id');
        expect(ajaxSettings.headers['x-amz-date']).toEqual('date');
        expect(ajaxSettings.headers.Authorization).toEqual('AWS my-access-key:list-signature');
      });

    });

    describe("a successful response", function() {
      describe('when the total parts uploaded does not equal the number of parts sent', function() {
        var mockResponse, xml, xmlString;

        // One part is missing from the response
        xmlString = "<Parts>";
        xmlString += "<Part><PartNumber>1</PartNumber><ETag>\"chunk-1-eTag\"</ETag><Size>1000</Size></Part>";
        xmlString += "</Parts>";
        xml = new DOMParser().parseFromString(xmlString, "text/xml");

        beforeEach(function() {
          mockResponse = {
            target: {
              responseXML: xml
            }
          };
          spyOn(uploader, '_ajax').and.callFake(function(config) {
            config.status = 200;
            config.success(mockResponse);
          });
          spyOn(uploader, '_handleMissingChunks');
          uploader._verifyAllChunksUploaded();
        });

        it("calls _handleMissingChunks with the list of parts returned from Amazon", function() {
          var parts = xml.getElementsByTagName("Part");
          expect(uploader._handleMissingChunks).toHaveBeenCalledWith(parts);
        });

      });

      describe('when there are invalid parts', function() {
        var mockResponse, xml, xmlString;

        // Part 1 has an invalid eTag, Part 2 has an invalid size
        xmlString = "<Parts>";
        xmlString += "<Part><PartNumber>1</PartNumber><ETag>\"invalid-eTag\"</ETag><Size>1000</Size></Part>";
        xmlString += "<Part><PartNumber>2</PartNumber><ETag>\"chunk-2-eTag\"</ETag><Size>0</Size></Part>";
        xmlString += "</Parts>";
        xml = new DOMParser().parseFromString(xmlString, "text/xml");

        beforeEach(function() {
          mockResponse = {
            target: {
              responseXML: xml
            }
          };
          spyOn(uploader, '_ajax').and.callFake(function(config) {
            config.status = 200;
            config.success(mockResponse);
          });
          spyOn(uploader, '_handleInvalidChunks');
          uploader._verifyAllChunksUploaded();
        });

        it("calls _handleInvalidChunks with the list of part numbers that are invalid", function() {
          var invalidChunks = [1, 2];
          expect(uploader._handleInvalidChunks).toHaveBeenCalledWith(invalidChunks);
        });

      });

      describe('when all parts have been uploaded and are valid', function() {
        var mockResponse, xml, xmlString;

        // All Parts are uploaded and valid
        xmlString = "<Parts>";
        xmlString += "<Part><PartNumber>1</PartNumber><ETag>\"chunk-1-eTag\"</ETag><Size>1000</Size></Part>";
        xmlString += "<Part><PartNumber>2</PartNumber><ETag>\"chunk-2-eTag\"</ETag><Size>1000</Size></Part>";
        xmlString += "</Parts>";
        xml = new DOMParser().parseFromString(xmlString, "text/xml");

        beforeEach(function() {
          mockResponse = {
            target: {
              responseXML: xml
            }
          };
          spyOn(uploader, '_ajax').and.callFake(function(config) {
            config.status = 200;
            config.success(mockResponse);
          });
          spyOn(uploader, '_completeUpload');
          uploader._verifyAllChunksUploaded();
        });

        it("calls _completeUpload", function() {
          expect(uploader._completeUpload).toHaveBeenCalled();
        });
      });

    });

    describe("a failed response", function() {

      beforeEach(function() {
        spyOn(uploader, '_ajax').and.callFake(function(config) {
          config.status = 400;
          config.error(null);
        });
        spyOn(window, 'setTimeout').and.callFake(function(callback, interval) {
          callback();
        });
      });

      describe("and retries are available", function() {
        beforeEach(function() {
          spyOn(uploader, '_notifyUploadRetry');
          spyOn(uploader, '_getRemainingSignatures').and.callFake(function(attempt, callback) {
            callback();
          });
          spyOn(uploader, '_verifyAllChunksUploaded').and.callThrough();

          uploader._verifyAllChunksUploaded();
        });

        it("notifies about the next retry attempt", function() {
          expect(uploader._notifyUploadRetry.calls.count()).toEqual(mockSettings.maxRetries);
        });

        it("refreshes upload signatures", function() {
          expect(uploader._getRemainingSignatures).toHaveBeenCalled();
        });

        it("retries the call, up to the maxRetries setting", function() {
          // 3 retries and 1 inital call
          expect(uploader._verifyAllChunksUploaded.calls.count()).toEqual(mockSettings.maxRetries + 1);
        });
      });

      describe("and no retries are available", function() {
        beforeEach(function() {
          spyOn(uploader, '_retryAvailable').and.returnValue(false);
          spyOn(uploader, '_notifyUploadError');
          spyOn(uploader, '_setFailed');
          spyOn(uploader, '_resetData');
          uploader._verifyAllChunksUploaded();
        });

        it("notifies that the upload has failed", function() {
          expect(uploader._notifyUploadError).toHaveBeenCalledWith(6, uploader.errors[6]);
        });

        it("sets the uploader to a failed state", function() {
          expect(uploader._setFailed).toHaveBeenCalled();
        });

        it("resets the uploader's data", function() {
          expect(uploader._resetData).toHaveBeenCalled();
        });
      });

    });
  });

  describe("_handleInvalidChunks", function() {
    var mockFile, mockSettings, uploader;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {};
      uploader = new bs3u.Uploader(mockFile, mockSettings);
      spyOn(uploader, '_retryChunk');

      uploader._handleInvalidChunks([1, 3, 5]);
    });

    it('calls _retryChunk for each invalid chunk number given', function() {
      expect(uploader._retryChunk.calls.count()).toEqual(3);
      expect(uploader._retryChunk.calls.argsFor(0)[0]).toEqual(1);
      expect(uploader._retryChunk.calls.argsFor(1)[0]).toEqual(3);
      expect(uploader._retryChunk.calls.argsFor(2)[0]).toEqual(5);
    });
  });

  describe("_handleMissingChunks", function() {
    var mockFile, mockSettings, uploader, xml, xmlString;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {};
      uploader = new bs3u.Uploader(mockFile, mockSettings);
      spyOn(uploader, '_retryChunk');

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

      uploader._handleMissingChunks(responseParts);
    });

    it("calls _retryChunk for each chunk that was not listed in Amazon's response", function() {
      expect(uploader._retryChunk.calls.count()).toEqual(2);
      expect(uploader._retryChunk.calls.argsFor(0)[0]).toEqual('2');
      expect(uploader._retryChunk.calls.argsFor(1)[0]).toEqual('4');
    });
  });

  describe("_retryChunk", function() {
    var mockFile, mockSettings, uploader;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {};
      uploader = new bs3u.Uploader(mockFile, mockSettings);
      uploader._chunks = {
        1: { startRange: 0, endRange: 1000, uploading: false, uploadComplete: true },
      };
    });

    describe('when there are retries available', function() {

      beforeEach(function() {
        spyOn(uploader, '_retryAvailable').and.returnValue(true);
      });

      describe('and an upload spot is available', function() {
        beforeEach(function() {
          spyOn(uploader, '_getRemainingSignatures').and.callFake(function(attempt, callback) {
            callback();
          });
          spyOn(uploader, '_uploadChunk');
          spyOn(uploader, '_uploadSpotAvailable').and.returnValue(true);
          uploader._retryChunk(1);
        });

        it("fetches new upload signatures", function() {
          expect(uploader._getRemainingSignatures).toHaveBeenCalled();
        });

        it("uploads the chunk", function() {
          expect(uploader._uploadChunk).toHaveBeenCalledWith(1, 1);
        });
      });
      
      describe("and there is not an upload spot available", function() {
        beforeEach(function() {
          spyOn(uploader, '_getRemainingSignatures').and.callFake(function(attempt, callback) {
            callback();
          });
          spyOn(uploader, '_uploadSpotAvailable').and.returnValue(false);
          spyOn(uploader, '_uploadChunk');
          uploader._retryChunk(1);
        });

        it("fetches new upload signatures", function() {
          expect(uploader._getRemainingSignatures).toHaveBeenCalled();
        });

        it("does not upload the chunk", function() {
          expect(uploader._uploadChunk).not.toHaveBeenCalled();
        });
      });
    });

    describe('when there are no retries available', function() {
      beforeEach(function() {
        spyOn(uploader, '_retryAvailable').and.returnValue(false);
        spyOn(uploader, '_notifyUploadError');
        spyOn(uploader, '_setFailed');
        spyOn(uploader, '_resetData');
        uploader._retryChunk(1);

      });

      it("notifies there was an upload error", function() {
        expect(uploader._notifyUploadError).toHaveBeenCalledWith(7, uploader.errors[7]);
      });

      it("sets the upload to a failed state", function() {
        expect(uploader._setFailed).toHaveBeenCalled();
      });

      it("resets the uploader's data", function() {
        expect(uploader._resetData).toHaveBeenCalled();
      });
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
        awsAccessKey: 'my-access-key',
        customHeaders: { "X-Custom-Header": "Stuff" },
        contentType: "video/quicktime",
        bucket: "my-bucket",
        signatureBackend: "/signatures",
        remainingSignaturesPath: "/remaining"

      };
      uploader = new bs3u.Uploader(mockFile, mockSettings);
      uploader._uploadId = "upload-id";
      uploader._chunks = {
        1: { startRange: 0, endRange: 1000, uploading: false, uploadComplete: false },
        2: { startRange: 1000, endRange: 2000, uploading: false, uploadComplete: false }
      };
      uploader._completeSignature = { signature: 'complete-signature', date: 'date' };
      uploader._eTags = {
        1: '"chunk-1-eTag"',
        2: '"chunk-2-eTag"',
      };
      spyOn(uploader, '_requiresFirefoxHack').and.returnValue(false);
    });

    it("adds the XHR object to the _chunkXHRs map", function() {
      spyOn(uploader, '_ajax').and.returnValue("XHR");
      expect(uploader._XHRs.length).toEqual(0);
      uploader._completeUpload();
      expect(uploader._XHRs[0]).toEqual("XHR");
    });

    describe("ajax settings", function() {
      var ajaxSettings;

      beforeEach(function() {
        spyOn(uploader, '_ajax');
      });

      it("properly configures the url, method, params, and headers for the call", function() {
        uploader._completeUpload();
        var body;

        body = "<CompleteMultipartUpload>";
        body +=   "<Part>";
        body +=     "<PartNumber>1</PartNumber>";
        body +=     "<ETag>\"chunk-1-eTag\"</ETag>";
        body +=   "</Part>";
        body +=   "<Part>";
        body +=     "<PartNumber>2</PartNumber>";
        body +=     "<ETag>\"chunk-2-eTag\"</ETag>";
        body +=   "</Part>";
        body += "</CompleteMultipartUpload>";

        ajaxSettings = uploader._ajax.calls.argsFor(0)[0];
        expect(ajaxSettings.url).toEqual('some-host/my-upload-key');
        expect(ajaxSettings.method).toEqual('POST');
        expect(ajaxSettings.params.uploadId).toEqual('upload-id');
        expect(ajaxSettings.headers['x-amz-date']).toEqual('date');
        expect(ajaxSettings.headers.Authorization).toEqual('AWS my-access-key:complete-signature');
        expect(ajaxSettings.headers['Content-Type']).toEqual('video/quicktime');
        expect(ajaxSettings.headers['Content-Disposition']).toEqual('attachment; filename=myfile');
        expect(ajaxSettings.body).toEqual(body);
      });

    });

    describe("a successful response", function() {
      var xml;
      beforeEach(function() {
        xml = new DOMParser().parseFromString("<SomeResponse><Location>the-upload-location</Location></SomeResponse>","text/xml");
        mockResponse = {
          target: {
            responseXML: xml
          }
        };
        spyOn(uploader, '_ajax').and.callFake(function(config) {
          config.status = 200;
          config.success(mockResponse);
        });
        spyOn(uploader, "_notifyUploadComplete");
        spyOn(uploader, "_setComplete");
        spyOn(uploader, "_resetData");
        uploader._completeUpload();
      });

      it("notifies that the upload is complete, passing in the location from the response xml", function() {
        expect(uploader._notifyUploadComplete).toHaveBeenCalledWith("the-upload-location");
      });

      it("sets the uploader to complete", function() {
        expect(uploader._setComplete).toHaveBeenCalled();
      });

      it("resets the uploader data", function() {
        expect(uploader._resetData).toHaveBeenCalled();
      });
    });

    describe("a failed response", function() {

      beforeEach(function() {
        spyOn(uploader, '_ajax').and.callFake(function(config) {
          config.status = 400;
          config.error(null);
        });
        spyOn(window, 'setTimeout').and.callFake(function(callback, interval) {
          callback();
        });
      });

      describe("and retries are available", function() {
        beforeEach(function() {
          spyOn(uploader, '_notifyUploadRetry');
          spyOn(uploader, '_getRemainingSignatures').and.callFake(function(attempt, callback) {
            callback();
          });
          spyOn(uploader, '_completeUpload').and.callThrough();

          uploader._completeUpload();
        });

        it("notifies about the next retry attempt", function() {
          expect(uploader._notifyUploadRetry.calls.count()).toEqual(mockSettings.maxRetries);
        });

        it("refreshes upload signatures", function() {
          expect(uploader._getRemainingSignatures).toHaveBeenCalled();
        });

        it("retries the call, up to the maxRetries setting", function() {
          // 3 retries and 1 inital call
          expect(uploader._completeUpload.calls.count()).toEqual(mockSettings.maxRetries + 1);
        });
      });

      describe("and no retries are available", function() {
        beforeEach(function() {
          spyOn(uploader, '_retryAvailable').and.returnValue(false);
          spyOn(uploader, '_notifyUploadError');
          spyOn(uploader, '_setFailed');
          spyOn(uploader, '_resetData');
          uploader._completeUpload();
        });

        it("notifies that the upload has failed", function() {
          expect(uploader._notifyUploadError).toHaveBeenCalledWith(8, uploader.errors[8]);
        });

        it("sets the uploader to a failed state", function() {
          expect(uploader._setFailed).toHaveBeenCalled();
        });

        it("resets the uploader's data", function() {
          expect(uploader._resetData).toHaveBeenCalled();
        });
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
        awsAccessKey: 'my-access-key',
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
        awsAccessKey: 'my-access-key',
        bucket: "my-bucket"
      };
      uploader = new bs3u.Uploader(mockFile, mockSettings);
      uploader._chunks = {
        1: {},
        2: {}
      };
    });

    it('returns true if each chunk has an eTag', function() {
      uploader._eTags = {
        1: '"chunk-1-eTag"',
        2: '"chunk-2-eTag"',
      };
      expect(uploader._allETagsAvailable()).toBeTruthy();
    });

    it('returns false if at least 1 eTag is missing', function() {
      uploader._eTags = {
        1: '"chunk-1-eTag"'
      };
      expect(uploader._allETagsAvailable()).toBeFalsy();
    });
  });

  describe("_resetData", function() {
    var mockFile, mockSettings, uploader;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {
        host: 'some-host',
        key: "my-upload-key",
        maxRetries: 3,
        awsAccessKey: 'my-access-key',
        bucket: "my-bucket"
      };
      uploader = new bs3u.Uploader(mockFile, mockSettings);
      uploader._XHRs = ["someXHR"];
      uploader._date = "someDate";
      uploader._eTags = {1: "etag"};
      uploader._uploadId = "upload-id";
      uploader._initSignature = "init-sig";
      uploader._listSignature = "list-sig";
      uploader._completeSignature = "complete-sig";
      uploader._chunkSignatures = {1: "chunk-sig"};
      uploader._chunkXHRs = {1: "chunkXHR"};
      uploader._chunkProgress = {1: "chunkProgress"};
      uploader._chunkUploadsInProgress = 2;
    });

    it('clears out any attributes that are no longer needed ', function() {
      uploader._resetData();
      expect(uploader._XHRs).toEqual([]);
      expect(uploader._date).toBeNull();
      expect(uploader._eTags).toEqual({});
      expect(uploader._uploadId).toBeNull();
      expect(uploader._initSignature).toBeNull();
      expect(uploader._listSignature).toBeNull();
      expect(uploader._completeSignature).toBeNull();
      expect(uploader._chunkSignatures).toEqual({});
      expect(uploader._chunkXHRs).toEqual({});
      expect(uploader._chunkProgress).toEqual({});
      expect(uploader._chunkUploadsInProgress).toEqual(0);
    });
  });

  describe("_startProgressWatcher", function() {
    var mockFile, mockSettings, uploader, chunkXHROne, chunkXHRTwo, chunkXHRThree,
    chunkOneAbortSpy, chunkTwoAbortSpy, chunkOneErrorSpy, chunkTwoErrorSpy, 
    chunkThreeErrorSpy;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {};
      uploader = new BasicS3Uploader(mockFile, mockSettings);
      chunkOneAbortSpy = jasmine.createSpy();
      chunkTwoAbortSpy = jasmine.createSpy();
      chunkThreeAbortSpy = jasmine.createSpy();
      chunkOneErrorSpy = jasmine.createSpy();
      chunkTwoErrorSpy = jasmine.createSpy();
      chunkThreeErrorSpy = jasmine.createSpy();

      chunkXHROne = {
        lastProgressAt: 80000,
        abort: chunkOneAbortSpy,
        _data: {
          error: chunkOneErrorSpy
        }
      };

      chunkXHRTwo = {
        lastProgressAt: 30000,
        abort: chunkTwoAbortSpy,
        _data: {
          error: chunkTwoErrorSpy
        }
      };

      chunkXHRThree = {
        lastProgressAt: 0,
        abort: chunkThreeAbortSpy,
        _data: {
          error: chunkThreeErrorSpy
        }
      };

      uploader._chunkXHRs = {
        1: chunkXHROne,
        2: chunkXHRTwo,
        3: chunkXHRThree,
      };

      uploader._chunks = {
        1: { uploading: true, uploadComplete: false },
        2: { uploading: true, uploadComplete: false },
        3: { uploading: false, uploadComplete: false },
      };
      spyOn(window, 'setInterval').and.callFake(function(callback, interval) {
        callback();
      });
      spyOn(window, 'clearInterval');
    });

    describe("when the uploader is not uploading", function() {
      beforeEach(function() {
        spyOn(uploader, '_isUploading').and.returnValue(false);
        uploader._startProgressWatcher();
      });

      it("clears the interval", function() {
        expect(window.clearInterval).toHaveBeenCalled();
      });
    });

    describe("when the uploader is uploading", function() {
      beforeEach(function() {
        spyOn(uploader, '_isUploading').and.returnValue(true);
        spyOn(window, 'Date').and.returnValue({
          getTime: function() { return 90000; }
        });
        uploader._startProgressWatcher();
      });

      it("stops any chunks that have not reported progress within 30 seconds", function() {
        expect(chunkOneAbortSpy).not.toHaveBeenCalled();
        expect(chunkTwoAbortSpy).toHaveBeenCalled();
      });

      it("triggers the error handler for chunks that have not reported progress within 30 seconds", function() {
        expect(chunkOneErrorSpy).not.toHaveBeenCalled();
        expect(chunkTwoErrorSpy).toHaveBeenCalled();
      });

      it("ignores chunks that are not uploading", function() {
        expect(chunkThreeAbortSpy).not.toHaveBeenCalled();
        expect(chunkThreeErrorSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe("_startBandwidthMonitor", function() {
    var mockFile, mockSettings, uploader, chunkOneXHR, chunkTwoXHR,
    chunkThreeXHR, chunkFourXHR;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {
        maxConcurrentChunks: 4
      };
      uploader = new BasicS3Uploader(mockFile, mockSettings);
      spyOn(window, 'Date').and.returnValue({
        getTime: function() { return "timestamp"; }
      });
      spyOn(window, 'setInterval').and.callFake(function(callback, interval) {
        callback();
      });
      spyOn(window, 'clearInterval');
      chunkOneXHR = jasmine.createSpy();
      chunkTwoXHR = jasmine.createSpy();
      chunkThreeXHR = jasmine.createSpy();
      chunkFourXHR = jasmine.createSpy();

      uploader._chunks = {
        1: { uploading: true },
        2: { uploading: true },
        3: { uploading: true },
        4: { uploading: true },
      };

      uploader._chunkXHRs = {
        1: { abort: chunkOneXHR },
        2: { abort: chunkTwoXHR },
        3: { abort: chunkThreeXHR },
        4: { abort: chunkFourXHR },
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
        spyOn(uploader, '_uploadChunks');
      });

      it("updates the maxConcurrentChunks setting to be the value determined most optimal", function() {
        spyOn(uploader, '_calculateOptimalConcurrentChunks').and.returnValue(1);
        uploader._startBandwidthMonitor();
        expect(uploader.settings.maxConcurrentChunks).toEqual(1);
      });

      describe("and the number of uploads in progress is lower than the optimal number of chunks", function() {
        beforeEach(function() {
          spyOn(uploader, '_calculateOptimalConcurrentChunks').and.returnValue(uploader.settings.maxConcurrentChunks);
          uploader._chunkUploadsInProgress = 2;
          uploader._startBandwidthMonitor();
        });

        it("calls uploadChunks to fill the free upload spots", function() {
          expect(uploader._uploadChunks).toHaveBeenCalled();
        });
      });

      describe("and the number of uploads in progress equals the optimal number of chunks", function() {
        beforeEach(function() {
          spyOn(uploader, '_calculateOptimalConcurrentChunks').and.returnValue(uploader.settings.maxConcurrentChunks);
          uploader._chunkUploadsInProgress = uploader.settings.maxConcurrentChunks;
          uploader._startBandwidthMonitor();
        });

        it("does not call uploadChunks", function() {
          expect(uploader._uploadChunks).not.toHaveBeenCalled();
        });
      });

      describe("and the number of uploads in progress is greater than the optimal number of chunks", function() {
        beforeEach(function() {
          spyOn(uploader, '_calculateOptimalConcurrentChunks').and.returnValue(2);
          spyOn(uploader, '_abortChunkUpload').and.callThrough();
          uploader._chunkUploadsInProgress = 4;
          uploader._startBandwidthMonitor();
        });

        it("aborts a chunk upload until the number of concurrent uplaods equals the optimal setting", function() {
          expect(chunkOneXHR).toHaveBeenCalled();
          expect(chunkTwoXHR).toHaveBeenCalled();
          expect(chunkThreeXHR).not.toHaveBeenCalled();
          expect(chunkFourXHR).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe("_abortChunkUpload", function() {
    var mockFile, mockSettings, uploader, abortSpy;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {};
      abortSpy = jasmine.createSpy();
      uploader = new BasicS3Uploader(mockFile, mockSettings);
      uploader._chunks = {
        1: { uploading: true, uploadComplete: true }
      };
      uploader._chunkXHRs = {
        1: { abort: abortSpy }
      };
      uploader._chunkUploadsInProgress = 1;
      uploader._abortChunkUpload(1);
    });

    it("aborts the chunk's XHR", function() {
      expect(abortSpy).toHaveBeenCalled();
    });

    it("sets the chunk's status to not uploading and not upload complete", function() {
      expect(uploader._chunks[1].uploading).toBeFalsy();
      expect(uploader._chunks[1].uploadComplete).toBeFalsy();
    });

    it("decrements the _chunkUploadsInProgress count by one", function() {
      expect(uploader._chunkUploadsInProgress).toEqual(0);
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
      uploader = new BasicS3Uploader(mockFile, mockSettings);
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

  describe("_calculateUploadProgress", function() {
    var mockFile, mockSettings, uploader;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {};
      uploader = new BasicS3Uploader(mockFile, mockSettings);
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
      uploader._setFailed();
    });

    it("sets the uploader status to 'failed'", function() {
      expect(uploader._status).toEqual('failed');
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
        readAsBinaryString: function() {
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
        spyOn(mockFileReader, 'readAsBinaryString');
      });

      it("slices the file into a 1024 byte blob", function() {
        uploader._validateFileIsReadable();
        expect(mockFile.slice).toHaveBeenCalledWith(0, 1024);
      });

      it("attempts to read a blob of the file", function() {
        uploader._validateFileIsReadable();
        expect(mockFileReader.readAsBinaryString).toHaveBeenCalledWith('blob');
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

});
