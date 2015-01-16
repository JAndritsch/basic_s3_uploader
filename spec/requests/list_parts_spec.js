describe("bs3u.ListPartsRequest", function() {
  var settings, callbacks, request, onSuccessSpy, uploadId, partNumber, part,
  mockFile, mockFileReader;

  beforeEach(function() {
    onSuccessSpy = jasmine.createSpy("onSuccess");
    settings = {
      signatureBackend: "/signatures",
      listHeadersPath: "/get_list_headers",
      key: "my-upload-key",
      contentType: "quicktime/mov",
      region: "us-east-1",
      host: "bucket.s3-us-east-1.amazonaws.com",
      usingCloudFront: false
    };
    callbacks = {
      onSuccess: onSuccessSpy
    };
    uploadId = "some-upload-id";

    request = new bs3u.ListPartsRequest(uploadId, settings, callbacks);
  });

  describe("constructor", function() {
    it("stores the uplaodId", function() {
      expect(request.uploadId).toEqual(uploadId);
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
      var expectedUrl = "/signatures/get_list_headers";
      var expectedParams = {
        key: "my-upload-key",
        content_type: "quicktime/mov",
        region: "us-east-1",
        upload_id: uploadId,
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
      var expectedUrl = "bucket.s3-us-east-1.amazonaws.com/my-upload-key";
      var expectedMethod = "GET";
      var expectedParams = {
        uploadId: uploadId
      };
      var expectedBody = null;
      request.callS3();
      expect(request._callS3).toHaveBeenCalledWith(expectedUrl, expectedMethod, expectedParams, expectedBody);
    });
  });

  describe("success", function() {
    it("extracts the UploadId from the XML response and invokes the onSuccess callback with it", function() {
      var xmlString = '<ListPartsResponse><status>success</status><Parts><Part><PartNumber>1</PartNumber><ETag>"part-1-etag"</ETag></Part><Part><PartNumber>2</PartNumber><ETag>"part-2-etag"</ETag></Part></Parts></ListPartsResponse>';
      var parser = new DOMParser();
      var xml = parser.parseFromString(xmlString,"text/xml");
      var response = {
        target: {
          responseXML: xml
        }
      };
      request.success(response);
      expect(onSuccessSpy).toHaveBeenCalledWith(xml.getElementsByTagName("Part"));
    });

  });

});
