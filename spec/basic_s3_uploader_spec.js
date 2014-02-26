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

    it("creates an array to hold all XHR requests", function() {
      expect(uploader._XHRs).toBeDefined();
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

          it("does not get the init signature", function() {
            expect(uploader._getInitSignature).not.toHaveBeenCalled();
          });

          it("notifies there was an upload error", function() {
            expect(uploader._notifyUploadError).toHaveBeenCalledWith(1, uploader.errors[1]);
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
      uploader._XHRs = [mockAjax1, mockAjax2, mockAjax3];
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

      it("clears out the XHRs array", function() {
        expect(uploader._XHRs).toEqual([]);
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

});
