bs3u.Signer = function() {
};

bs3u.Signer.prototype.generateCanonicalRequest = function(method, url, headers, hashedPayload) {
  var signer = this;
  var request = "";
  request += method + "\n";
  request += signer._canonicalURI(url);
  request += signer._canonicalQueryString(url);
  request += signer._canonicalHeaders(headers);
  request += signer._signedHeaders(headers);
  request += hashedPayload;

  return request;
};


// private

/*
CanonicalURI is the URI-encoded version of the absolute path component of the URI -e
everything starting with the "/" that follows the domain name and up to the end of
the string or to the question mark character ('?') if you have query string parameters.
    
For example, in the URI:

  http://s3.amazonaws.com/examplebucket/myphoto.jpg

/examplebucket/myphoto.jpg is the absolute path. In the absolute path, you don't
encode the "/".
*/
bs3u.Signer.prototype._canonicalURI = function(url) {
};

/*
CanonicalQueryString specifies the URI-encoded query string parameters. You 
URI-encode name and values individually. You must also sort the parameters in
the canonical query string alphabetically by key name. The sorting occurs
after encoding.

For example, in the URI:

  http://s3.amazonaws.com/examplebucket?prefix=somePrefix&marker=someMarker&max-keys=20

the query string is:

  marker=someMarker&max-keys=20&prefix=somePrefix
*/
bs3u.Signer.prototype._canonicalQueryString = function(url) {
};

/*
CanonicalHeaders is a list of request headers with their values. Individual
header name and value pairs are separated by the newline character ("\n").
Header names must be in lowercase. You must sort the header names alphabetically
to construct the string, as shown in the following example:

  awesome:value\n
  the-dude:abides\n


The CanonicalHeaders list must include the following:

  * HTTP host header
  * If the Content-Type header is present in the request, it must be added to the CanonicalHeaders list.
  * Any x-amz-* headers that you plan to include in your request must also be added. 

*/
bs3u.Signer.prototype._canonicalHeaders = function(headers) {
};

/*
SignedHeaders is an alphabetically sorted, semicolon-separated list of lowercase
request header names. The request headers in the list are the same headers that
you included in the CanonicalHeaders string. For example:

    awesome;the-dude
*/
bs3u.Signer.prototype._signedHeaders = function(headers) {
};
