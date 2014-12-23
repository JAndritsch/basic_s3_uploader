bs3u.Logger = function(settings) {
  this.settings = settings;
};

bs3u.Logger.prototype.log = function(msg, object) {
  msg = "[BasicS3Uploader] " + msg;
  if (this.settings.log && console && console.debug) {
    if (object) {
      console.debug(msg, object);
    } else {
      console.debug(msg);
    }
  }
};
