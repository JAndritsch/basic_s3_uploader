describe("bs3u.Request", function() {

  var request, settings, callbacks, onSuccessSpy, onRetrySpy, onProgressSpy,
    onRetriesExhaustedSpy;

  beforeEach(function() {
    onSuccessSpy = jasmine.createSpy("onSuccess");
    onRetrySpy = jasmine.createSpy("onRetry");
    onProgressSpy = jasmine.createSpy("onProgress");
    onRetriesExhaustedSpy = jasmine.createSpy("onRetriesExhausted");

    settings = {
      maxRetries: 8,
      customHeaders: { "X-Herp": "Derp" },
      retryWaitTime: 1000,
      log: false
    };

    callbacks = {
      onSuccess: onSuccessSpy,
      onRetry: onRetrySpy,
      onRetriesExhausted: onRetriesExhaustedSpy,
      onProgress: onProgressSpy
    };

    request = new bs3u.Request(settings, callbacks);
  });

  describe("constructor", function() {

    it("keeps a reference to the provided settings", function() {
      expect(request.settings).toEqual(settings);
    });

    it("keeps a reference to the provided callbacks", function() {
      expect(request.callbacks).toEqual(callbacks);
    });

    it("initializes the attempts count to 0", function() {
      expect(request.attempts).toEqual(0);
    });

    it("initializes headers to null", function() {
      expect(request.headers).toEqual(null);
    });

    it("initializes xhrs to an empty array", function() {
      expect(request.xhrs).toEqual([]);
    });

    it("instantiates a Utils", function() {
      expect(request.utils instanceof bs3u.Utils).toBeTruthy();
    });

    it("instantiates a Logger", function() {
      expect(request.logger instanceof bs3u.Logger).toBeTruthy();
    });

  });

  describe("start", function() {
    var getHeadersSpy = jasmine.createSpy("getHeaders");

    beforeEach(function() {
      request.getHeaders = getHeadersSpy;
    });

    it("calls getHeaders", function() {
      request.start();
      expect(getHeadersSpy).toHaveBeenCalled();
    });
  });

  describe("stop", function() {

    var xhr1 = { abort: jasmine.createSpy() };
    var xhr2 = { abort: jasmine.createSpy() };

    beforeEach(function() {
      request.xhrs.push(xhr1);
      request.xhrs.push(xhr2);
      request.stop();
    });

    it("aborts all xhrs", function() {
      expect(xhr1.abort).toHaveBeenCalled();
      expect(xhr2.abort).toHaveBeenCalled();
    });

    it("clears out the xhrs array", function() {
      expect(request.xhrs).toEqual([]);
    });
  });

});
