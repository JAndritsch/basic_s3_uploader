$(document).ready(function() {
  var file, settings, uploader;

  $("#startUpload").attr("disabled", "disabled");
  $("#cancelUpload").attr("disabled", "disabled");

  $("#fileinput").on("change", function(element) {
    file = element.target.files[0];

    settings = {
      bucket: "your-bucket-name",
      region: "the-region",
      signatureBackend: "",
      initHeadersPath: "/get_init_headers",
      listHeadersPath: "/get_list_headers",
      chunkHeadersPath: "/get_chunk_headers",
      completeHeadersPath: "/get_complete_headers",
      useWebWorkers: true,
      workerFilePath: '/javascripts/dist/basic_s3_worker.js',
      uploaderFilePath: '/javascripts/dist/basic_s3_uploader.js',

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
    uploader = new bs3u.Uploader(file, settings);
  });


  $("#startUpload").on("click", function() {
    uploader.startUpload();
  });

  $("#cancelUpload").on("click", function() {
    uploader.cancelUpload();
  });

});
