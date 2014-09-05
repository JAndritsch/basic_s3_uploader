This page covers the different uploader settings and events that can be configured.
To seem some of these settings in action, check out the sample app provided in the
project repository.

## Config settings

Below are all the upload settings that can be configured.

<table>
  <thead>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
    <th>Default</th>
  </thead>
  <tbody>
    <tr>
      <td>contentType</td>
      <td>String</td>
      <td>The content type of the file you're uploading</td>
      <td>Defaults to the file object's type</td>
    </tr>
    <tr>
      <td>chunkSize</td>
      <td>Number (bytes)</td>
      <td>
        The size of each chunk. AWS requires a chunk size of at least 5MB, but this uploader
        requires you to specify a chunk size of at least 6MB to be safe. Anything higher is
        allowed.
      </td>
      <td>10MB</td>
    </tr>
    <tr>
      <td>encrypted</td>
      <td>Boolean</td>
      <td>If set to true, the upload will be performed using an AES256 encryption.</td>
      <td>false</td>
    </tr>
    <tr>
      <td>maxRetries</td>
      <td>Number</td>
      <td>The maximum number of times a failed AJAX request will retry</td>
      <td>5</td>
    </tr>
    <tr>
      <td>retryWaitTime</td>
      <td>Number</td>
      <td>The number of milliseconds to wait until the next retry is attempted. Note that this number is multiplied by the number of attempts to prevent spamming retries during connectivity issues.</td>
      <td>2000</td>
    </tr>
    <tr>
      <td>maxFileSize</td>
      <td>Number (bytes)</td>
      <td>The maximum size of the file. AWS currently does not support uploading files larger than 5GB.</td>
      <td>5GB</td>
    </tr>
    <tr>
      <td>acl</td>
      <td>String</td>
      <td>
        The Access Control List policy. The following values can be used:

        <ul>
          <li>authenticated-read</li>
          <li>bucket-owner-full-control</li>
          <li>bucket-owner-read</li>
          <li>log-delivery-write</li>
          <li>private</li>
          <li>public-read (default)</li>
          <li>public-read-write</li>
        </ul>
      </td>
      <td>public-read</td>
    </tr>
    <tr>
      <td>signatureBackend</td>
      <td>String</td>
      <td>The root path to your signature backend.</td>
      <td>[empty string]</td>
    </tr>
    <tr>
      <td>initSignaturePath</td>
      <td>String</td>
      <td>The path to your init signature route. This is a child of signatureBackend.</td>
      <td>/get_init_signature</td>
    </tr>
    <tr>
      <td>remaininSignaturesPath</td>
      <td>String</td>
      <td>The path to your remaining signaturse route. This is a child of signatureBackend.</td>
      <td>/get_remaining_signatures</td>
    </tr>
    <tr>
      <td>bucket</td>
      <td>String</td>
      <td>The name of your S3 bucket</td>
      <td>your-bucket-name</td>
    </tr>
    <tr>
      <td>host</td>
      <td>String</td>
      <td>Provides an optional override of the host name for uploading to AWS.</td>
      <td>http://{bucket}.s3.amazonaws.com</td>
    </tr>
    <tr>
      <td>awsAccessKey</td>
      <td>String</td>
      <td>Your public AWS access key (not your secret key!)</td>
      <td>YOUR_AWS_ACCESS_KEY_ID</td>
    </tr>
    <tr>
      <td>log</td>
      <td>Boolean</td>
      <td>If set to true, the uploader will log its current processing out to the console.</td>
      <td>false</td>
    </tr>
    <tr>
      <td>customHeaders</td>
      <td>Object</td>
      <td>An object of keys and values representing any custom headers that need to be sent
      to your signature backend. Note: these do not get sent to AWS.</td>
      <td>{}</td>
    </tr>
    <tr>
      <td>maxConcurrentChunks</td>
      <td>Number</td>
      <td>
        The maximum number of concurrent XHR requests for a given upload. Increasing this
        number may result in faster uploads, however browsers tend to have their own concurrent
        XHR limitation built in. This means anything greater than that number will not have
        any effect on upload performance. This number must fall within the range of 1-5.
      </td>
      <td>5</td>
    </tr>
    <tr>
      <td>key</td>
      <td>String</td>
      <td>What the name of the file to be on S3. This can include subfolders and should
      be unique. Note: certain characters are not allowed and could cause signature
      errors. You'll probably want to sanitize any special characters from the 
      file name.</td>
      <td>/{bucket}/{timestamp}_{original_file_name}</td>
    </tr>
  </tbody>
</table>

## Events

Below are a list of upload events that you can hook into. These can be used to
add custom logic around upload progress (such as generating a progress bar) or 
when an upload finishes/fails/retries. 

For convenience, each of these methods you provide will have access to the entire
uploader through "this".

Example:

    var uploadSettings = {
      onReady: function() {
        // 'this' is the BasicS3Uploader instance
        console.log("uploader is ready!", this);
      }
    };

__Note__: none of these events are required and will default to a noop function
if not provided.

<table>
  <thead>
    <th>Name</th>
    <th>Description</th>
    <th>Method signature</th>
  </thead>
  <tbody>
    <tr>
      <td>onReady</td>
      <td>Fires when the uploader has been initialized and ready to start uploading.</td>
      <td>function()</td>
    </tr>
    <tr>
      <td>onStart</td>
      <td>Fires when the upload has started.</td>
      <td>function()</td>
    </tr>
    <tr>
      <td>onProgress</td>
      <td>Fires every time upload progress has been made. Passes in the current
      bytes that have been uploaded and the total amount of bytes (file size).</td>
      <td>function(bytesLoaded, totalBytes)</td>
    </tr>
    <tr>
      <td>onChunkUploaded</td>
      <td>Fires when a single chunk has finished uploading. Passes in the chunk number
      that uploaded and the total number of chunks.</td>
      <td>function(chunkNumber, totalChunks)</td>
    </tr>
    <tr>
      <td>onComplete</td>
      <td>Fires when the entire upload (including all chunks) has finished.</td>
      <td>function(fileLocationOnS3)</td>
    </tr>
    <tr>
      <td>onError</td>
      <td>Fires whenever an AJAX error or uploader error occurs. Passes in an error
      code (for custom error messages) and a default error description.</td>
      <td>function(errorCode, description)</td>
    </tr>
    <tr>
      <td>onRetry</td>
      <td>Fires whenever an AJAX request is being retried. Passes in the number of
      attempts and some data about the specific request.</td>
      <td>function(attempts, data)</td>
    </tr>
    <tr>
      <td>onCancel</td>
      <td>Fires whenever the upload has been manually canceled.</td>
      <td>function()</td>
    </tr>
  </tbody>
</table>
