describe("BasicS3Uploader", function() {

  describe("constructor", function() {
    var uploader, mockFile, mockSettings;

    beforeEach(function() {
      mockFile = {name: "testfile", size: 1000};
      mockSettings = {}

      spyOn(BasicS3Uploader.prototype, '_configureUploader').and.callThrough();
      spyOn(BasicS3Uploader.prototype, '_notifyUploaderReady').and.callThrough();
      spyOn(BasicS3Uploader.prototype, '_setReady').and.callThrough();

      uploader = new BasicS3Uploader(mockFile, mockSettings);
    });

    it("stores the provided file on the uploader", function() {
      expect(uploader.file).toEqual(mockFile);
    });

    it("creates an array to hold all XHR requests", function() {
      expect(uploader._XHRs).toBeDefined();
    });

    it("sets _chunkUploadsInProgress to 0", function() {
      expect(uploader._chunkUploadsInProgress).toEqual(0);
    });

    it("configures the uploader using the provided settings", function() {
      expect(BasicS3Uploader.prototype._configureUploader).toHaveBeenCalled();
    });

    it("notifies that the uploader is ready", function() {
      expect(BasicS3Uploader.prototype._notifyUploaderReady).toHaveBeenCalled();
    });

    it("sets the uploader status to ready", function() {
      expect(BasicS3Uploader.prototype._setReady).toHaveBeenCalled();
    });

  });

});
