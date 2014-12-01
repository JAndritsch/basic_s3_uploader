describe("bs3u.Signer", function() {
  var config = {
    date: new Date(),
    awsAccessKey: "some-access-key",
    signature: "signature-from-server",
    region: "us-east-1",
    method: "PUT",
    url: "http://s3.amazonaws.com/examplebucket/file.mov?upload=things&awesome=true&test",
    payload: "",
    headers: {
      "host": "s3.amazonaws.com",
      "content-type": "quicktime/mov",
    }
  };

  var signer = new bs3u.Signer(config);

  describe("addAuthorizationHeader", function() {

    beforeEach(function() {
      spyOn(signer, '_scope').and.returnValue("scope");
      spyOn(signer, '_signRequest').and.returnValue("signedString");
    });

    it("generates and adds an Authorization header to the request headers", function() {
      var result = signer.addAuthorizationHeader();

      expected = "AWS4-HMAC-SHA256 Credential=some-access-key/";
      expected += "scope,";
      expected += "SignedHeaders=content-type;host;x-amz-content-sha256;x-amz-date,";
      expected += "Signature=signedString";

      expect(config.headers.Authorization).toEqual(expected);
    });
  });

  describe("generateCanonicalRequest", function() {

    var result = signer.generateCanonicalRequest();

    it("adds the x-amz-content-sha256 header to the headers", function() {
      var hashedPayload = signer._sha256(config.payload);
      expect(config.headers["x-amz-content-sha256"]).toEqual(hashedPayload);
    });

    it("adds the x-amz-date header to the headers", function() {
      var formattedDate = signer._formatDate(config.date);
      expect(config.headers["x-amz-date"]).toEqual(formattedDate);
    });

    it("generates a canonical request", function() {
      // method
      var expected = "PUT\n";
      // uri path
      expected += "/examplebucket/file.mov\n";
      // query string (sorted)
      expected += "awesome=true&test=&upload=things\n";
      // headers
      expected += "content-type:quicktime/mov\n";
      expected += "host:s3.amazonaws.com\n";
      expected += "x-amz-content-sha256:" + signer._sha256(signer.config.payload) + "\n";
      expected += "x-amz-date:" + signer._formatDate(signer.config.date) + "\n\n";
      // signed headers (sorted)
      expected += "content-type;host;x-amz-content-sha256;x-amz-date\n";
      // hashed payload
      expected += signer._sha256(signer.config.payload);
      expect(result).toEqual(expected);
    });

  });

  describe("generateStringToSign", function() {
    var canonicalRequest, hashedPayload;

    beforeEach(function() {
      hashedPayload = signer._sha256("");
      canonicalRequest = "PUT\n";
      canonicalRequest += "/examplebucket/file.mov\n";
      canonicalRequest += "awesome=true&test=&upload=things\n";
      canonicalRequest += "content-type:quicktime/mov\n";
      canonicalRequest += "host:s3.amazonaws.com\n";
      canonicalRequest += "x-amz-content-sha256:" + hashedPayload + "\n";
      canonicalRequest += "x-amz-date:20130708T220855Z\n\n";
      canonicalRequest += "content-type;host;x-amz-content-sha256;x-amz-date\n";
      canonicalRequest += hashedPayload;
    });

    it("generates a string to sign with the canonical request", function() {
      var result = signer.generateStringToSign(canonicalRequest);
      var expected = "AWS4-HMAC-SHA256\n";
      expected += signer._formatDate(config.date) + "\n";
      expected += signer._scope() + "\n";
      expected += signer._sha256(canonicalRequest);

      expect(result).toEqual(expected);
    });
  });

});
