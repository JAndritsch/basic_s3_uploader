describe("bs3u.Request", function() {

  var MockAjaxClass, mockAjaxInstance, ajaxSendSpy;
  var request, settings, callbacks, onSuccessSpy, onRetrySpy, onProgressSpy,
    onRetriesExhaustedSpy;

  beforeEach(function() {
    ajaxSendSpy = jasmine.createSpy("ajaxSend");
    // Used to simply capture the settings and callbacks for easier testing
    MockAjaxClass = function(settings) {
      return {
        send: ajaxSendSpy,
        callbacks: {},
        settings: settings,
        onSuccess: function(callback) {
          this.callbacks.onSuccess = callback;
        },
        onError: function(callback) {
          this.callbacks.onError = callback;
        },
        onTimeout: function(callback) {
          this.callbacks.onTimeout = callback;
        },
        onProgress: function(callback) {
          this.callbacks.onProgress = callback;
        },
      };
    };

    spyOn(bs3u, 'Ajax').and.callFake(function(settings) {
      mockAjaxInstance = MockAjaxClass(settings);
      return mockAjaxInstance;
    });

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
    // Must be implemented for each specific request
    request.callS3 = function() {};
    request.success = function() {};
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

  describe("_getHeaders", function() {
    var url, params, payload;

    beforeEach(function() {
      url = "http://some-signature-api";
      params = {};
      payload = "plain text payload";

      spyOn(request.utils, 'sha256Async').and.callFake(function(text, callback) {
        callback("encrypted");
      });

      request._getHeaders(url, params, payload);
    });

    it("encrypts the payload", function() {
      expect(request.utils.sha256Async).toHaveBeenCalled();
    });

    it("assigns the encrypted payload to the params hash", function() {
      expect(params.payload).toEqual("encrypted");
    });

    it("configures the proper url for the ajax request", function() {
      expect(mockAjaxInstance.settings.url).toEqual(url);
    });

    it("configures the proper method for the ajax request", function() {
      expect(mockAjaxInstance.settings.method).toEqual("GET");
    });

    it("configures the proper params for the ajax request", function() {
      expect(mockAjaxInstance.settings.params).toEqual(params);
    });

    it("sends the request", function() {
      expect(ajaxSendSpy).toHaveBeenCalled();
    });

    it("pushes the ajax request into the list of XHRs", function() {
      expect(request.xhrs).toEqual([mockAjaxInstance]);
    });

    describe("ajax onSuccess", function() {
      var response = {
        target: {
          responseText: '{ "Authorization": "Some Auth Header" }'
        }
      };

      beforeEach(function() {
        spyOn(request, 'callS3');
        mockAjaxInstance.callbacks.onSuccess(response);
      });

      it("parses the JSON response and stores the headers", function() {
        expect(request.headers.Authorization).toEqual("Some Auth Header");
      });

      it("calls to s3", function() {
        expect(request.callS3).toHaveBeenCalled();
      });
    });

    describe("ajax onError", function() {
      var response = {};

      beforeEach(function() {
        spyOn(request, '_retry');
        mockAjaxInstance.callbacks.onError(response);
      });

      it("calls the _retry method with the response", function() {
        expect(request._retry).toHaveBeenCalledWith(response);
      });
    });

  });

  describe("_callS3", function() {
    var url, method, params, body;

    beforeEach(function() {
      url = "http://some-signature-api";
      method = "POST";
      params = {};
      body = "the request body";

      request._callS3(url, method, params, body);
    });

    it("configures the proper url for the ajax request", function() {
      expect(mockAjaxInstance.settings.url).toEqual(url);
    });

    it("configures the proper method for the ajax request", function() {
      expect(mockAjaxInstance.settings.method).toEqual(method);
    });

    it("configures the proper params for the ajax request", function() {
      expect(mockAjaxInstance.settings.params).toEqual(params);
    });

    it("sends the request with  the body", function() {
      expect(ajaxSendSpy).toHaveBeenCalledWith(body);
    });

    it("pushes the ajax request into the list of XHRs", function() {
      expect(request.xhrs).toEqual([mockAjaxInstance]);
    });

    describe("ajax onSuccess", function() {
      var response = {};

      beforeEach(function() {
        spyOn(request, '_success');
        mockAjaxInstance.callbacks.onSuccess(response);
      });

      it("calls the _success method with the response", function() {
        expect(request._success).toHaveBeenCalledWith(response);
      });
    });

    describe("ajax onProgress", function() {
      var response = {};

      beforeEach(function() {
        mockAjaxInstance.callbacks.onProgress(response);
      });

      it("calls the onProgress callback defined by the caller", function() {
        expect(onProgressSpy).toHaveBeenCalledWith(response);
      });
    });

    describe("ajax onError", function() {
      var response = {};

      beforeEach(function() {
        spyOn(request, '_retry');
        mockAjaxInstance.callbacks.onError(response);
      });

      it("calls the _retry method with the response", function() {
        expect(request._retry).toHaveBeenCalledWith(response);
      });
    });

  });

  describe("_success", function() {
    var response;

    describe("when the response code is 200", function() {

      beforeEach(function() {
        response = { target: { status: 200 } };
        spyOn(request, 'success');
        request._success(response);
      });

      it("calls the success method defined by the specific request", function() {
        expect(request.success).toHaveBeenCalledWith(response);
      });
    });

    describe("when the response code is not 200", function() {

      beforeEach(function() {
        response = { target: { status: 403 } };
        spyOn(request, '_retry');
        request._success(response);
      });

      it("calls _retry with the response", function() {
        expect(request._retry).toHaveBeenCalledWith(response);
      });
    });
  });

  describe("_retry", function() {
    var response;

    beforeEach(function() {
      response = {};
      request.attempts = 0;
      spyOn(window, 'setTimeout').and.callFake(function(callback, delay) {
        callback();
      });
      spyOn(request, 'start');
      spyOn(request, '_timeToWaitBeforeNextRetry').and.returnValue(1000);
    });

    describe("when a retry is available", function() {
      beforeEach(function() {
        spyOn(request, '_retryAvailable').and.returnValue(true);
        request._retry(response);
      });

      it("increments the attempts counter by 1", function() {
        expect(request.attempts).toEqual(1);
      });

      it("sets a delay before attempting the next call", function() {
        expect(window.setTimeout).toHaveBeenCalledWith(jasmine.any(Function), 1000);
      });

      it("calls the onRetry callback with the attempts and response", function() {
        expect(onRetrySpy).toHaveBeenCalledWith(request.attempts, response);
      });

      it("starts the request for another attempt", function() {
        expect(request.start).toHaveBeenCalled();
      });
    });

    describe("when retries have been exhausted", function() {
      beforeEach(function() {
        spyOn(request, '_retryAvailable').and.returnValue(false);
        request._retry(response);
      });

      it("calls the onRetriesExhausted callback with the response", function() {
        expect(onRetriesExhaustedSpy).toHaveBeenCalledWith(response);
      });
    });

  });

  describe("_retryAvailable", function() {
    it("returns true if the number of current attempts is less than the maxRetries setting", function() {
      request.attempts = 0;
      expect(request._retryAvailable()).toBeTruthy();
    });

    it("returns false if the number of current attempts equal to the maxRetries setting", function() {
      request.attempts = request.settings.maxRetries;
      expect(request._retryAvailable()).toBeFalsy();
    });

    // should never really happen
    it("returns false if the number of current attempts exceeds the maxRetries setting", function() {
      request.attempts = request.settings.maxRetries + 1;
      expect(request._retryAvailable()).toBeFalsy();
    });
  });

  describe("_timeToWaitBeforeNextRetry", function() {
    it("returns the number of attempts multiplied by the retryWaitTime setting", function() {
      request.settings.retryWaitTime = 5000;
      request.attempts = 5;
      expect(request._timeToWaitBeforeNextRetry()).toEqual(25000);
    });
  });

});
