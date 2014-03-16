describe("BasicS3Uploader", function() {

  describe("constructor", function() {
    var uploader, mockFile, mockSettings;

    beforeEach(function() {
      mockFile = {name: "testfile", size: 1000};
      mockSettings = {}

      spyOn(BasicS3Uploader.prototype, '_configureUploader').and.callThrough();
      spyOn(BasicS3Uploader.prototype, '_notifyUploaderReady').and.callThrough();
      spyOn(BasicS3Uploader.prototype, '_setReady').and.callThrough();

      uploader = new BasicS3Uploader(mockFile, mockSettings);
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
      expect(BasicS3Uploader.prototype._configureUploader).toHaveBeenCalled();
    });

    it("notifies that the uploader is ready", function() {
      expect(BasicS3Uploader.prototype._notifyUploaderReady).toHaveBeenCalled();
    });

    it("sets the uploader status to ready", function() {
      expect(BasicS3Uploader.prototype._setReady).toHaveBeenCalled();
    });

  });

  describe("_configureUploader", function() {
    var uploader, mockFile, mockSettings;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      mockSettings = {
        contentType: "video/quicktime",
        chunkSize: 1000,
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
        xhrRequestTimeout: 7000,
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
      uploader = new BasicS3Uploader(mockFile, mockSettings);

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
      expect(uploader.settings.xhrRequestTimeout).toEqual(mockSettings.xhrRequestTimeout);
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
      uploader = new BasicS3Uploader(mockFile, {});

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
      expect(uploader.settings.xhrRequestTimeout).toEqual(30000);
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
      uploader = new BasicS3Uploader(mockFile, mockSettings);

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

      uploader = new BasicS3Uploader(mockFile, mockSettings);
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

        uploader = new BasicS3Uploader(mockFile, mockSettings);
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

          uploader = new BasicS3Uploader(mockFile, mockSettings);
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

          uploader = new BasicS3Uploader(mockFile, mockSettings);
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
      uploader = new BasicS3Uploader(mockFile, mockSettings);
    });

    it("performs an ajax call to the provided init signature path", function() {
      spyOn(uploader, '_ajax');
      uploader._getInitSignature();
      expect(uploader._ajax).toHaveBeenCalled();

      ajaxSettings = uploader._ajax.calls.argsFor(0)[0];
      expect(ajaxSettings.url).toEqual(mockSettings.signatureBackend + mockSettings.initSignaturePath);
      expect(ajaxSettings.method).toEqual("GET");
      expect(ajaxSettings.customHeaders).toEqual(mockSettings.customHeaders);
      expect(ajaxSettings.params.key).toEqual(mockSettings.key);
      expect(ajaxSettings.params.filename).toEqual(mockFile.name);
      expect(ajaxSettings.params.filesize).toEqual(mockFile.size);
      expect(ajaxSettings.params.mime_type).toEqual(mockSettings.contentType);
      expect(ajaxSettings.params.bucket).toEqual(mockSettings.bucket);
      expect(ajaxSettings.params.acl).toEqual(mockSettings.acl);
      expect(ajaxSettings.params.encrypted).toEqual(mockSettings.encrypted);
    });

    it("pushes the xhr request into the _XHRs array", function() {
      spyOn(uploader, '_ajax').and.returnValue("XHR");
      expect(uploader._XHRs.length).toEqual(0);
      uploader._getInitSignature();
      expect(uploader._XHRs[0]).toEqual("XHR");
    });

    describe("a successful response", function() {
      var mockResponse;

      beforeEach(function() {
        mockResponse = {
          target: { responseText: "{\"signature\": \"init-signature\", \"date\": \"init-date\"}" }
        };

        spyOn(uploader, '_ajax').and.callFake(function(ajaxSettings) {
          ajaxSettings.status = 200;
          ajaxSettings.success(mockResponse);
        });

        spyOn(uploader, '_initiateUpload');

        uploader._getInitSignature();
      });

      it("stores the returned init signature and date on the uploader", function() {
        expect(uploader._initSignature).toEqual("init-signature");
        expect(uploader._date).toEqual("init-date");
      });

      it("continues to initiate the upload request", function() {
        expect(uploader._initiateUpload).toHaveBeenCalled();
      });

    });

    describe("a failed response", function() {

      beforeEach(function() {
        spyOn(uploader, '_ajax').and.callFake(function(ajaxSettings) {
          ajaxSettings.status = 400;
          ajaxSettings.error(null);
        });

      });

      describe("when there are retries available", function() {
        beforeEach(function() {
          spyOn(window, 'setTimeout').and.callFake(function(callback, interval) {
            callback();
          });

          spyOn(uploader, '_notifyUploadRetry');
          spyOn(uploader, '_getInitSignature').and.callThrough();

          uploader._getInitSignature();
        });

        it("notifies about the next retry attempt", function() {
          expect(uploader._notifyUploadRetry.calls.count()).toEqual(mockSettings.maxRetries);
        });

        it("retries the call, up to the maxRetries setting", function() {
          // 3 retries and 1 inital call
          expect(uploader._getInitSignature.calls.count()).toEqual(mockSettings.maxRetries + 1);
        });

      });

      describe("when no retries are available", function() {
        beforeEach(function() {
          spyOn(uploader, '_retryAvailable').and.returnValue(false);
          spyOn(uploader, '_notifyUploadError');
          spyOn(uploader, '_setFailed');
          spyOn(uploader, '_resetData');
          uploader._getInitSignature();
        });

        it("notifies that the upload has failed", function() {
          expect(uploader._notifyUploadError).toHaveBeenCalledWith(2, uploader.errors[2]);
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
      uploader = new BasicS3Uploader(mockFile, mockSettings);
    });

    it("adds the XHR object to the _XHRs array", function() {
      spyOn(uploader, '_ajax').and.returnValue("XHR");
      expect(uploader._XHRs.length).toEqual(0);
      uploader._initiateUpload();
      expect(uploader._XHRs[0]).toEqual("XHR");
    });

    describe("ajax settings", function() {
      var ajaxSettings;

      beforeEach(function() {
        spyOn(uploader, '_ajax');
        uploader._date = "today";
        uploader._initSignature = "init-signature";
      });

      it("properly configures the url, method, and headers for the call", function() {
        uploader._initiateUpload();
        ajaxSettings = uploader._ajax.calls.argsFor(0)[0];

        expect(ajaxSettings.url).toEqual("some-host/my-upload-key?uploads");
        expect(ajaxSettings.method).toEqual("POST");
        expect(ajaxSettings.headers['x-amz-date']).toEqual('today');
        expect(ajaxSettings.headers['x-amz-acl']).toEqual('private');
        expect(ajaxSettings.headers['Authorization']).toEqual('AWS my-access-key:init-signature');
        expect(ajaxSettings.headers['Content-Disposition']).toEqual('attachment; filename=myfile');
      });

      describe("non-encrypted upload", function() {
        it("does not set the encryption header", function() {
          uploader.settings.encrypted = false;
          uploader._initiateUpload();
          ajaxSettings = uploader._ajax.calls.argsFor(0)[0];
          expect(ajaxSettings.headers['x-amz-server-side-encryption']).toBeUndefined();
        });
      });

      describe("an encrypted upload", function() {
        it("sets the encryption header", function() {
          uploader.settings.encrypted = true;
          uploader._initiateUpload();
          ajaxSettings = uploader._ajax.calls.argsFor(0)[0];
          expect(ajaxSettings.headers['x-amz-server-side-encryption']).toEqual("AES256");
        });
      });

    });

    describe("a successful response", function() {
      var mockResponse, xml;

      beforeEach(function() {
        xml = new DOMParser().parseFromString("<SomeResponse><UploadId>the-upload-id</UploadId></SomeResponse>","text/xml");
        mockResponse = {
          target: {
            responseXML: xml
          }
        };
        spyOn(uploader, '_ajax').and.callFake(function(config) {
          config.status = 200;
          config.success(mockResponse);
        });
        spyOn(uploader, '_getRemainingSignatures').and.callFake(function(retries, callback) {
          callback();
        });
        spyOn(uploader, '_uploadChunks');
        uploader._initiateUpload();
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

    });

    describe("a failed response", function() {
      var mockResponse;

      beforeEach(function() {
        mockResponse = {};
        spyOn(uploader, '_ajax').and.callFake(function(config) {
          config.status = 400;
          config.error(null);
        });
      });

      describe("and retries are available", function() {
        beforeEach(function() {
          spyOn(window, 'setTimeout').and.callFake(function(callback, interval) {
            callback();
          });

          spyOn(uploader, '_notifyUploadRetry');
          spyOn(uploader, '_initiateUpload').and.callThrough();

          uploader._initiateUpload();
        });

        it("notifies about the next retry attempt", function() {
          expect(uploader._notifyUploadRetry.calls.count()).toEqual(mockSettings.maxRetries);
        });

        it("retries the call, up to the maxRetries setting", function() {
          // 3 retries and 1 inital call
          expect(uploader._initiateUpload.calls.count()).toEqual(mockSettings.maxRetries + 1);
        });
      });

      describe("and no retries are available", function() {
        beforeEach(function() {
          spyOn(uploader, '_retryAvailable').and.returnValue(false);
          spyOn(uploader, '_notifyUploadError');
          spyOn(uploader, '_setFailed');
          spyOn(uploader, '_resetData');
          uploader._initiateUpload();
        });

        it("notifies that the upload has failed", function() {
          expect(uploader._notifyUploadError).toHaveBeenCalledWith(3, uploader.errors[3]);
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
      uploader = new BasicS3Uploader(mockFile, mockSettings);
      uploader._uploadId = "upload-id";
      uploader._chunks = {
        1: "blah",
        2: "blah",
        3: "blah"
      };
    });

    it("adds the XHR object to the _XHRs array", function() {
      spyOn(uploader, '_ajax').and.returnValue("XHR");
      expect(uploader._XHRs.length).toEqual(0);
      uploader._getRemainingSignatures();
      expect(uploader._XHRs[0]).toEqual("XHR");
    });

    describe("ajax settings", function() {
      var ajaxSettings;

      beforeEach(function() {
        spyOn(uploader, '_ajax');
      });

      it("properly configures the url, method, params, and headers for the call", function() {
        uploader._getRemainingSignatures();
        ajaxSettings = uploader._ajax.calls.argsFor(0)[0];

        expect(ajaxSettings.url).toEqual("/signatures/remaining");
        expect(ajaxSettings.method).toEqual("GET");
        expect(ajaxSettings.params.upload_id).toEqual("upload-id");
        expect(ajaxSettings.params.total_chunks).toEqual(3);
        expect(ajaxSettings.params.mime_type).toEqual("video/quicktime");
        expect(ajaxSettings.params.bucket).toEqual("my-bucket");
        expect(ajaxSettings.params.key).toEqual("my-upload-key");
        expect(ajaxSettings.customHeaders['X-Custom-Header']).toEqual("Stuff");
      });

    });

    describe("a successful response", function() {
      var mockResponse, json, callback;

      beforeEach(function() {
        json = '{"chunk_signatures":{"1":{"signature":"signature","date":"date"},"2":{"signature":"signature","date":"date"},"3":{"signature":"signature","date":"date"}},"complete_signature":{"signature":"signature","date":"date"},"list_signature":{"signature":"signature","date":"date"}}';
        mockResponse = {
          target: {
            responseText: json
          }
        };
        spyOn(uploader, '_ajax').and.callFake(function(config) {
          config.status = 200;
          config.success(mockResponse);
        });
        callback = jasmine.createSpy();
        uploader._getRemainingSignatures(0, callback);
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

    describe("a failed response", function() {
      var mockResponse;

      beforeEach(function() {
        mockResponse = {};
        spyOn(uploader, '_ajax').and.callFake(function(config) {
          config.status = 400;
          config.error(null);
        });
      });

      describe("and retries are available", function() {
        beforeEach(function() {
          spyOn(window, 'setTimeout').and.callFake(function(callback, interval) {
            callback();
          });

          spyOn(uploader, '_notifyUploadRetry');
          spyOn(uploader, '_getRemainingSignatures').and.callThrough();

          uploader._getRemainingSignatures(0);
        });

        it("notifies about the next retry attempt", function() {
          expect(uploader._notifyUploadRetry.calls.count()).toEqual(mockSettings.maxRetries);
        });

        it("retries the call, up to the maxRetries setting", function() {
          // 3 retries and 1 inital call
          expect(uploader._getRemainingSignatures.calls.count()).toEqual(mockSettings.maxRetries + 1);
        });
      });

      describe("and no retries are available", function() {
        beforeEach(function() {
          spyOn(uploader, '_retryAvailable').and.returnValue(false);
          spyOn(uploader, '_notifyUploadError');
          spyOn(uploader, '_setFailed');
          spyOn(uploader, '_resetData');
          uploader._getRemainingSignatures(0);
        });

        it("notifies that the upload has failed", function() {
          expect(uploader._notifyUploadError).toHaveBeenCalledWith(4, uploader.errors[4]);
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

  describe("_uploadChunks", function() {
    var mockFile, uploader;

    beforeEach(function() {
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000 };
      uploader = new BasicS3Uploader(mockFile, {});
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
      uploader = new BasicS3Uploader(mockFile, {});
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
      mockFile = { name: "myfile", type: "video/quicktime", size: 1000, slice: function(start, end) {} };
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
      uploader = new BasicS3Uploader(mockFile, mockSettings);
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
        uploader._getRemainingSignatures();
        ajaxSettings = uploader._ajax.calls.argsFor(0)[0];
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

});
