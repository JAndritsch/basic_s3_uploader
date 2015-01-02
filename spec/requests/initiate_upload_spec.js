describe("bs3u.InitiateUploadRequest", function() {
  var settings, callbacks, request, onSuccessSpy;

  beforeEach(function() {
    onSuccessSpy = jasmine.createSpy("onSuccess");
    settings = {
      signatureBackend: "/signatures",
      initHeadersPath: "/get_init_headers",
      key: "my-upload-key",
      contentType: "quicktime/mov",
      acl: "private",
      encrypted: false,
      region: "us-east-1",
      host: "bucket.s3-us-east-1.amazonaws.com"
    };
    callbacks = {
      onSuccess: onSuccessSpy
    };
    request = new bs3u.InitiateUploadRequest(settings, callbacks);
  });

  describe("constructor", function() {
    it("inherits from bs3u.Request", function() {
      expect(request.start).toBeDefined();
    });
  });

  describe("getHeaders", function() {
    beforeEach(function() {
      spyOn(request, "_getHeaders");
    });

    it("properly configures the url, params, and payload for _getHeaders", function() {
      var expectedUrl = "/signatures/get_init_headers";
      var expectedParams = {
        key: "my-upload-key",
        content_type: "quicktime/mov",
        acl: "private",
        encrypted: false,
        region: "us-east-1",
        host: "bucket.s3-us-east-1.amazonaws.com"
      };
      var expectedPayload = "";
      request.getHeaders();
      expect(request._getHeaders).toHaveBeenCalledWith(expectedUrl, expectedParams, expectedPayload);
    });
  });

  describe("callS3", function() {
    beforeEach(function() {
      spyOn(request, '_callS3');
    });

    it("properly configures the url, method, params, and payload for _callS3", function() {
      var expectedUrl = "bucket.s3-us-east-1.amazonaws.com/my-upload-key?uploads";
      var expectedMethod = "POST";
      var expectedParams = {};
      var expectedBody = null;
      request.callS3();
      expect(request._callS3).toHaveBeenCalledWith(expectedUrl, expectedMethod, expectedParams, expectedBody);
    });
  });

  describe("success", function() {
    it("extracts the UploadId from the XML response and invokes the onSuccess callback with it", function() {
      var xmlString = "<InitiateMultipartUpload><status>success</status><UploadId>this-is-an-upload-id</UploadId></InitiateMultipartUpload>";
      var parser = new DOMParser();
      var xml = parser.parseFromString(xmlString,"text/xml");
      var response = {
        target: {
          responseXML: xml
        }
      };
      request.success(response);
      expect(onSuccessSpy).toHaveBeenCalledWith("this-is-an-upload-id");
    });

  });

});
