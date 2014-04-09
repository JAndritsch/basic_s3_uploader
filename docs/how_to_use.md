## The basics

Using this uploader is pretty straightforward, but requires a little more work
than some of those other uploaders that do everything for you out of the box.

Here are the steps required to use BasicS3Uploader:

1. Get a file from a file input element. This can easily be done via jQuery:

        var file = $('#fileinput')[0].files[0];

        // You could also listen for the 'change' event on the file input and kick
        // things off from there.
        $("#fileinput").on("change", function(element) {
          var file = element.target.files[0];
          ...
        });

    Note that this uploader only supports uploading a single file at a time. If you
    have need to support multiple uploads simultaneously, just instantiate a new
    uploader for each file.

        // keep track of all uploaders
        var uploaders = [];

        $("#fileinput").on("change", function(element) {
          var uploader;
          var files = element.target.files;
          // configure the settings for the uploader per file
          var settings = {};
          for (var file in files) {
            uploader = new BasicS3Uploader(file, settings);
            uploaders.push(uploader);
          }
        });

2. Configure your upload settings and register some callbacks in a separate object

        var settings = {
          awsAccessKey: "accessKey",
          bucket: "my-s3-bucket",
          key: "my-awesome-file",

          onProgress: function(loaded, total) {
            // generate a progress bar
          }

          onComplete: function(location) {
            // notify that the file can be downloaded from 'location'
          }

        };

3. Instantiate a BasicS3Uploader, passing it the file and the settings

        var uploader = new BasicS3Uploader(file, settings);

4. Call "startUpload()" whenever you're ready for the upload to start.

        uploader.startUpload()

5. If you need to cancel the upload for some reason, just call "cancelUpload()"

        uploader.cancelUpload()

All of these steps are also illustrated in the sample app provided, so check
that out for more information. For more information about what configuration 
options exist, check out the [upload configuration page](https://github.com/jandritsch/basic_s3_uploader/wiki/Configuration).

