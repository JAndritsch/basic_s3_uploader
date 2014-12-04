/*
* This is a Javascript Worker used to encrypt the contents of
* a string in a separate thread.
*
* The data coming in should be in the following format:
*
*   {
*     text: "the text to encrypt",
*     uploaderFilePath: "/path/to/basic_s3_uploader.js"
*   }
*/
self.addEventListener('message', function(e) {
  // Make sure we have the proper scope available
  if (typeof self.importScripts === 'function') {
    // Import the uploader, which contains the
    // asmCrypto library.
    self.importScripts(e.data.uploaderFilePath);

    // Encrypt the value
    var encrypted = asmCrypto.SHA256.hex(e.data.text);

    // Send the encrypted data back
    self.postMessage(encrypted);
  }
}, false);
