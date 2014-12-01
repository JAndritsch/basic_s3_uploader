describe("bs3u.Signer", function() {
  var signer = new bs3u.Signer();

  describe("generateCanonicalRequest", function() {

    var method, url, headers, hashedPayload;

    beforeEach(function() {
      method = "PUT";
      url = "http://s3.amazonaws.com/examplebucket/file.mov?upload=things&awesome=true&test";
      hashedPayload = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b785";
      headers = {
        "host": "s3.amazonaws.com",
        "content-type": "quicktime/mov",
        "x-amz-date": "20130708T220855Z",
        "x-amz-content-sha256": hashedPayload
      };
    });

    it("generates a canonical request", function() {
      var result = signer.generateCanonicalRequest(method, url, headers, hashedPayload);
      // method
      var expected = "PUT\n";
      // uri path
      expected += "/examplebucket/file.mov\n";
      // query string (sorted)
      expected += "awesome=true&test=&upload=things\n";
      // headers
      expected += "content-type:quicktime/mov\n";
      expected += "host:s3.amazonaws.com\n";
      expected += "x-amz-content-sha256:" + hashedPayload + "\n";
      expected += "x-amz-date:20130708T220855Z\n\n";
      // signed headers (sorted)
      expected += "content-type;host;x-amz-content-sha256;x-amz-date\n";
      // hashed payload
      expected += hashedPayload;

      expect(result).toEqual(expected);
    });

  });

});
