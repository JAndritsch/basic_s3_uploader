describe("bs3u.UploadPartRequest", function() {
  var settings, callbacks, request, onSuccessSpy, uploadId, partNumber, part,
  mockFile, mockFileReader;

  beforeEach(function() {
    onSuccessSpy = jasmine.createSpy("onSuccess");
    settings = {
      signatureBackend: "/signatures",
      chunkHeadersPath: "/get_chunk_headers",
      key: "my-upload-key",
      contentType: "quicktime/mov",
      region: "us-east-1",
      host: "bucket.s3-us-east-1.amazonaws.com"
    };
    callbacks = {
      onSuccess: onSuccessSpy
    };
    uploadId = "some-upload-id";
    partNumber = 1;
    part = {
      startRange: 0,
      endRange: 1024
    };
    mockFileReader = {
      readAsArrayBuffer: function(blob) {
        this.result = "blob contents";
        this.onloadend();
      }
    };
    mockFile = {
      slice: function(start, end) {
        return "blob";
      }
    };
    spyOn(window, 'FileReader').and.returnValue(mockFileReader);

    request = new bs3u.UploadPartRequest(uploadId, partNumber, part, mockFile, settings, callbacks);
  });

  describe("constructor", function() {
    it("stores the uploadId", function() {
      expect(request.uploadId).toEqual(uploadId);
    });

    it("stores the partNumber", function() {
      expect(request.partNumber).toEqual(partNumber);
    });

    it("stores the file", function() {
      expect(request.file).toEqual(mockFile);
    });

    it("stores the part", function() {
      expect(request.part).toEqual(part);
    });

    it("inherits from bs3u.Request", function() {
      expect(request.start).toBeDefined();
    });
  });

  describe("getHeaders", function() {
    beforeEach(function() {
      spyOn(request, "_getHeaders");
    });

    it("properly configures the url, params, and payload for _getHeaders", function() {
      var expectedUrl = "/signatures/get_chunk_headers";
      var expectedParams = {
        key: "my-upload-key",
        content_type: "quicktime/mov",
        region: "us-east-1",
        upload_id: "some-upload-id",
        part_number: 1,
        host: "bucket.s3-us-east-1.amazonaws.com"
      };
      var expectedPayload = "blob contents";
      request.getHeaders();
      expect(request._getHeaders).toHaveBeenCalledWith(expectedUrl, expectedParams, expectedPayload);
    });
  });

  describe("callS3", function() {
    beforeEach(function() {
      spyOn(request, '_callS3');
    });

    it("properly configures the url, method, params, and payload for _callS3", function() {
      var expectedUrl = "bucket.s3-us-east-1.amazonaws.com/my-upload-key";
      var expectedMethod = "PUT";
      var expectedParams = {
        uploadId: uploadId,
        partNumber: partNumber
      };
      var expectedBody = "blob";
      request.callS3();
      expect(request._callS3).toHaveBeenCalledWith(expectedUrl, expectedMethod, expectedParams, expectedBody);
    });
  });

  describe("success", function() {
    it("extracts the eTag from the response headers and invokes the onSuccess callback with it", function() {
      var response = {
        target: {
          getResponseHeader: function(name) { return "some-eTag"; }
        }
      };
      request.success(response);
      expect(onSuccessSpy).toHaveBeenCalledWith("some-eTag");
    });

  });

});
