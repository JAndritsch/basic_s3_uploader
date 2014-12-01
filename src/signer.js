/* 
  Requires the following data:

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

*/
bs3u.Signer = function(config) {
  if (!config.date) { config.date = new Date(); }
  this.config = config;
  this.algorithm = "AWS4-HMAC-SHA256";
};

/* This is the main method to call. This will add the following headers to
your request headers:
  * x-amz-content-sha256
  * x-amz-date
  * Authorization
*/
bs3u.Signer.prototype.addAuthorizationHeader = function() {
  var signer = this;

  var canonicalRequest = signer.generateCanonicalRequest();
  var stringToSign = signer.generateStringToSign(canonicalRequest);
  var signedString = signer._signRequest(stringToSign);

  var authorization = signer.algorithm + " Credential=" + signer.config.awsAccessKey + "/";
  authorization += signer._scope() + ",";
  authorization += "SignedHeaders=" + signer._signedHeaders(signer.config.headers) + ",";
  authorization += "Signature=" + signedString;

  signer.config.headers.Authorization = authorization;
};

bs3u.Signer.prototype.generateCanonicalRequest = function() {
  var signer = this;
  var request = "";

  var hashedPayload = signer._sha256(signer.config.payload);

  // Add in these headers before generating the request
  signer.config.headers["x-amz-content-sha256"] = hashedPayload;
  signer.config.headers["x-amz-date"] = signer._formatDate(signer.config.date);

  request += signer.config.method + "\n";
  request += signer._canonicalURI(signer.config.url) + "\n";
  request += signer._canonicalQueryString(signer.config.url) + "\n";
  request += signer._canonicalHeaders(signer.config.headers) + "\n";
  request += signer._signedHeaders(signer.config.headers) + "\n";
  request += hashedPayload;

  return request;
};

bs3u.Signer.prototype.generateStringToSign = function(canonicalRequest) {
  var signer = this;

  var stringToSign = signer.algorithm + "\n";
  stringToSign += signer._formatDate(signer.config.date) + "\n";
  stringToSign += signer._scope() + "\n";
  stringToSign += signer._sha256(canonicalRequest);

  return stringToSign;
};

// PRIVATE

bs3u.Signer.prototype._signRequest = function(stringToSign) {
  var signer = this;
  return signer._hmacSha256(stringToSign, signer._hex(signer.config.signature));
};

bs3u.Signer.prototype._formatDate = function(date) {
  return date.toISOString().replace(/[:\-]|\.\d{3}/g, ''); 
};

bs3u.Signer.prototype._canonicalURI = function(url) {
  return new bs3u.URI(url).pathname();
};

bs3u.Signer.prototype._canonicalQueryString = function(url) {
  var queryString = new bs3u.URI(url).queryString().replace("?", "");
  var params = queryString.split("&");
  var paramsHash = {};
  var sortedQueryString = "";

  var parts;
  for (var i = 0; i < params.length; i++) {
    parts = params[i].split("=");
    paramsHash[parts[0]] = parts[1] || "";
  }

  var sortedNames = Object.keys(paramsHash).sort();

  var name;
  for (var x in sortedNames) {
    name = sortedNames[x]; 
    sortedQueryString += name + "=" + paramsHash[name] + "&";
  }

  return sortedQueryString.substring(0, sortedQueryString.length - 1);
};

bs3u.Signer.prototype._canonicalHeaders = function(headers) {
  var sortedNames = Object.keys(headers).sort();
  var canonicalHeadersString = "";
  var name;
  for (var i in sortedNames) {
    name = sortedNames[i];
    canonicalHeadersString += name + ":" + headers[name] + "\n";
  }
  return canonicalHeadersString;
};

bs3u.Signer.prototype._signedHeaders = function(headers) {
  var signer = this;
  var sortedNames = Object.keys(headers).map(function(header) {
    return header.toLowerCase();
  }).sort();
  var signedHeadersString = "";
  for (var i in sortedNames) {
    signedHeadersString += sortedNames[i] + ";";
  }
  return signedHeadersString.substring(0, signedHeadersString.length - 1);
};

bs3u.Signer.prototype._scope = function() {
  var signer = this;
  var year = signer.config.date.getFullYear().toString();
  var month = (signer.config.date.getMonth() + 1).toString();
  var day = signer.config.date.getDay().toString();

  if (month.length < 2) { month = "0" + month; }
  if (day.length < 2) { day = "0" + day; }

  var formatted = year + month + day;
  return formatted + "/" + signer.config.region + "/s3/aws4_request";
};

bs3u.Signer.prototype._sha256 = function(value) {
  return CryptoJS.SHA256(value).toString();
};

bs3u.Signer.prototype._hmacSha256 = function(value, hex) {
  return CryptoJS.HmacSHA256(value, hex).toString();
};

bs3u.Signer.prototype._hex = function(value) {
 return CryptoJS.enc.Hex.parse(value);
};
