/*
* This is a Javascript Worker used to encrypt the contents of
* a string in a separate thread.
*
* The data coming in should be in the following format:
*
*   { 
*     text: "the text to encrypt",
*     uploaderSourcePath: "/path/to/basic_s3_uploader.js"
*   }
*/
addEventListener('message', function(e) {
  // Import the uploader, which contains the 
  // asmCrypto library.
  importScripts(e.data.uploaderSourcePath);

  // Encrypt the value
  var encrypted = asmCrypto.SHA256.hex(e.data.text);

  // Send the encrypted data back
  postMessage(encrypted);
  // Terminate the worker
  terminate();

}, false);
