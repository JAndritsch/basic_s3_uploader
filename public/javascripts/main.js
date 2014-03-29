$(document).ready(function() {
  var file, settings, uploader;

  $("#startUpload").attr("disabled", "disabled");
  $("#cancelUpload").attr("disabled", "disabled");

  $("#fileinput").on("change", function(element) {
    file = element.target.files[0];

    settings = {
      bucket: "your-bucket-name",
      awsAccessKey: "your-aws-access-key",
      key: "a-key-for-the-upload",
      signatureBackend: "",
      initSignaturePath: "/get_init_signature",
      remainingSignaturesPath: "/get_remaining_signatures",

      onReady: function() {
        $("#startUpload").removeAttr("disabled");
        $("#cancelUpload").attr("disabled", "disabled");
      },
      onStart: function() {
        $("#progress-container").show();
        $("#error").hide();
        $("#retries").hide();
        $("#progress-bar").removeClass("done").removeClass("error");
        $("#startUpload").attr("disabled", "disabled").text("Uploading...");
        $("#cancelUpload").removeAttr("disabled");
      },
      onProgress: function(loaded, total) {
        var progress = Math.ceil(((loaded / total) * 100));
        $("#progress-bar").text(progress + "%").css("width", progress + "%");
      },
      onComplete: function(location) {
        $("#progress-bar").text("DONE!").addClass("done");
        $("#startUpload").removeAttr("disabled").text("Upload it");
        $("#cancelUpload").attr("disabled", "disabled");
      },
      onRetry: function(attempt) {
        $("#retries").text("Retry #" + attempt).show();
      },
      onError: function(errorCode, description) {
        $("#error").text(description).show();
        $("#progress-bar").text("Upload failed!").css("width", "100%").addClass("error");
        $("#startUpload").removeAttr("disabled").text("Upload it");
        $("#cancelUpload").attr("disabled", "disabled");
      },
      onCancel: function() {
        $("#progress-bar").text("Upload cancelled").css("width", "100%").addClass("error");
        $("#startUpload").removeAttr("disabled").text("Upload it");
        $("#cancelUpload").attr("disabled", "disabled");
      }
    };
    uploader = new BasicS3Uploader(file, settings);
  });


  $("#startUpload").on("click", function() {
    // Here is an opportunity to make any changes about the uploader's configuration.
    // For instance, if you wanted to dynamically supply an access key or bucket
    // from the back end, you could do that here.
    $.get('/someplace', function(data) {
      uploader.settings.bucket       = data.bucket;
      uploader.settings.awsAccessKey = data.awsAccessKey;
      uploader.startUpload();
    });
    // It should also be noted that if you dynamically modify the 'bucket', you will also need to
    // modify the 'host', as it is derived from the bucket at the time an uploader is created.
  });

  $("#cancelUpload").on("click", function() {
    uploader.cancelUpload();
  });

});
