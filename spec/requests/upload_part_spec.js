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

});
