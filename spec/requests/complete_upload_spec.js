describe("bs3u.CompleteUploadRequest", function() {
  var settings, callbacks, request, onSuccessSpy, uploadId, parts;

  beforeEach(function() {
    onSuccessSpy = jasmine.createSpy("onSuccess");
    settings = {
      signatureBackend: "/signatures",
      completeHeadersPath: "/get_complete_headers",
      key: "my-upload-key",
      contentType: "quicktime/mov",
      region: "us-east-1",
      host: "bucket.s3-us-east-1.amazonaws.com"
    };
    callbacks = {
      onSuccess: onSuccessSpy
    };
    uploadId = "some-upload-id";
    parts = {
      1: { eTag: '"part-1-eTag"' },
      2: { eTag: '"part-2-eTag"' },
      3: { eTag: '"part-3-eTag"' }
    };
    request = new bs3u.CompleteUploadRequest(uploadId, parts, settings, callbacks);
  });

  describe("constructor", function() {
    it("stores the uploadId", function() {
      expect(request.uploadId).toEqual(uploadId);
    });

    it("stores the parts", function() {
      expect(request.parts).toEqual(parts);
    });

    it("inherits from bs3u.Request", function() {
      expect(request.start).toBeDefined();
    });
  });

  describe("getHeaders", function() {
    beforeEach(function() {
      spyOn(request, "_getHeaders");
      spyOn(request, '_generateCompletePayload').and.returnValue("complete payload");
    });

    it("properly configures the url, params, and payload for _getHeaders", function() {
      var expectedUrl = "/signatures/get_complete_headers";
      var expectedParams = {
        key: "my-upload-key",
        content_type: "quicktime/mov",
        region: "us-east-1",
        upload_id: uploadId,
        host: "bucket.s3-us-east-1.amazonaws.com"
      };
      var expectedPayload = "complete payload";
      request.getHeaders();
      expect(request._getHeaders).toHaveBeenCalledWith(expectedUrl, expectedParams, expectedPayload);
    });
  });

  describe("callS3", function() {
    beforeEach(function() {
      spyOn(request, '_callS3');
      spyOn(request, '_generateCompletePayload').and.returnValue("complete payload");
    });

    it("properly configures the url, method, params, and payload for _callS3", function() {
      var expectedUrl = "bucket.s3-us-east-1.amazonaws.com/my-upload-key";
      var expectedMethod = "POST";
      var expectedParams = {
        uploadId: uploadId
      };
      var expectedBody = "complete payload";
      request.callS3();
      expect(request._callS3).toHaveBeenCalledWith(expectedUrl, expectedMethod, expectedParams, expectedBody);
    });
  });

  describe("success", function() {
    it("extracts the Location from the XML response and invokes the onSuccess callback with it", function() {
      var xmlString = '<CompleteMultipartUploadResponse><status>success</status><Location>file was uploaded here</Location></CompleteMultipartUploadResponse>';
      var parser = new DOMParser();
      var xml = parser.parseFromString(xmlString,"text/xml");
      var response = {
        target: {
          responseXML: xml
        }
      };
      request.success(response);
      expect(onSuccessSpy).toHaveBeenCalledWith("file was uploaded here");
    });
  });

  describe("_generateCompletePayload", function() {
    it("generates the proper XML payload", function() {
      var expectedPayload = "<CompleteMultipartUpload>";
      expectedPayload += '<Part><PartNumber>1</PartNumber><ETag>"part-1-eTag"</ETag></Part>';
      expectedPayload += '<Part><PartNumber>2</PartNumber><ETag>"part-2-eTag"</ETag></Part>';
      expectedPayload += '<Part><PartNumber>3</PartNumber><ETag>"part-3-eTag"</ETag></Part>';
      expectedPayload += "</CompleteMultipartUpload>";
      expect(request._generateCompletePayload()).toEqual(expectedPayload);
    });
  });

});
