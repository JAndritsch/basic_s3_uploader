describe("bs3u.Signer", function() {
  var date = new Date();

  var config = {
    date: date,
    region: "us-east-1"
  };

  var signer = new bs3u.Signer(config);

  describe("generateCanonicalRequest", function() {

    var method, url, headers, payload;

    beforeEach(function() {
      method = "PUT";
      url = "http://s3.amazonaws.com/examplebucket/file.mov?upload=things&awesome=true&test";
      payload = "";
      headers = {
        "host": "s3.amazonaws.com",
        "content-type": "quicktime/mov",
        "x-amz-date": signer.formatDate(date),
        "x-amz-content-sha256": signer._sha256(payload)
      };
    });

    it("generates a canonical request", function() {
      var result = signer.generateCanonicalRequest(method, url, headers, payload);
      // method
      var expected = "PUT\n";
      // uri path
      expected += "/examplebucket/file.mov\n";
      // query string (sorted)
      expected += "awesome=true&test=&upload=things\n";
      // headers
      expected += "content-type:quicktime/mov\n";
      expected += "host:s3.amazonaws.com\n";
      expected += "x-amz-content-sha256:" + signer._sha256(payload) + "\n";
      expected += "x-amz-date:" + signer.formatDate(date) + "\n\n";
      // signed headers (sorted)
      expected += "content-type;host;x-amz-content-sha256;x-amz-date\n";
      // hashed payload
      expected += signer._sha256(payload);
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
      expected += signer.formatDate(date) + "\n";
      expected += signer._scope() + "\n";
      expected += signer._sha256(canonicalRequest);

      console.log("result", result);
      expect(result).toEqual(expected);
    });
  });

});
