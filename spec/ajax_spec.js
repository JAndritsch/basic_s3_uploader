describe("Ajax", function() {
  var ajax, config, mockXHR;

  beforeEach(function() {
    config = {
      url: "some/url",
      method: "get"
    };

    mockXHR = {
      events: {},
      uploadEvents: {},
      headers: {},
      upload: {},
      open: function(method, url) {},
      send: function(body) {},
      abort: function() {},
    };

    mockXHR.addEventListener = function(event, callback, async) {
      mockXHR.events[event] = callback;
    };

    mockXHR.upload.addEventListener = function(event, callback, async) {
      mockXHR.uploadEvents[event] = callback;
    };

    mockXHR.setRequestHeader = function(header, value) {
      mockXHR.headers[header] = value;
    };
    spyOn(window, 'XMLHttpRequest').and.returnValue(mockXHR);

    ajax = new bs3u.Ajax(config);
  });

  describe("constructor", function() {
    it("accepts configuration and stores it on the object", function() {
      expect(ajax.config).toEqual(config);
    });

    it("creates a new XMLHttpRequest and sets it on the object", function() {
      expect(ajax.xhr).toEqual(mockXHR);
    });
  });

  describe("onError", function() {
    var callbackSpy;
    beforeEach(function() {
      callbackSpy = jasmine.createSpy();
      ajax.onError(callbackSpy);
    });

    it("registers the provided callback to the 'error' XHR event", function() {
      mockXHR.events.error();
      expect(callbackSpy).toHaveBeenCalled();
    });
  });

  describe("onTimeout", function() {
    var callbackSpy;
    beforeEach(function() {
      callbackSpy = jasmine.createSpy();
      ajax.onTimeout(callbackSpy);
    });

    it("registers the provided callback to the 'timeout' XHR event", function() {
      mockXHR.events.timeout();
      expect(callbackSpy).toHaveBeenCalled();
    });
  });

  describe("onLoad", function() {
    var callbackSpy;
    beforeEach(function() {
      callbackSpy = jasmine.createSpy();
      ajax.onLoad(callbackSpy);
    });

    it("registers the provided callback to the 'load' XHR event", function() {
      mockXHR.events.load();
      expect(callbackSpy).toHaveBeenCalled();
    });
  });

  describe("onReadyStateChange", function() {
    var callbackSpy;
    beforeEach(function() {
      callbackSpy = jasmine.createSpy();
      ajax.onReadyStateChange(callbackSpy);
    });

    it("registers the provided callback to the 'readystatechange' XHR event", function() {
      mockXHR.events.readystatechange();
      expect(callbackSpy).toHaveBeenCalled();
    });
  });

  describe("onProgress", function() {
    var callbackSpy;
    beforeEach(function() {
      callbackSpy = jasmine.createSpy();
      ajax.onProgress(callbackSpy);
    });

    it("registers the provided callback to the 'progress' XHR upload event", function() {
      mockXHR.uploadEvents.progress();
      expect(callbackSpy).toHaveBeenCalled();
    });
  });

  describe("setTimeout", function() {
    it("sets the timeout value on the XHR object", function() {
      ajax.setTimeout(1000);
      expect(mockXHR.timeout).toEqual(1000);
    });
  });

  describe("buildURL", function() {
    it("accepts a URL and an object of parameters and builds a URL", function() {
      var url = "http://www.somesite.com";
      var params = {
        myParam1: "myValue1",
        myParam2: "myValue2"
      };
      var expected = "http://www.somesite.com?myParam1=myValue1&myParam2=myValue2";
      expect(ajax.buildURL(url, params)).toEqual(expected);
    });
  });

  describe("setHeaders", function() {
    it("accepts an object of headers and sets them on the XHR object", function() {
      var headers = {
        myHeader1: "header1",
        "X-Some-Header": "testing"
      };
      ajax.setHeaders(headers);
      expect(mockXHR.headers.myHeader1).toEqual("header1");
      expect(mockXHR.headers["X-Some-Header"]).toEqual("testing");
    });
  });

  describe("open", function() {
    beforeEach(function() {
      spyOn(ajax.xhr, 'open');
      spyOn(ajax, 'buildURL').and.returnValue("some/url?p=1");
      ajax.config.params = {
        p: "1"
      };
      ajax.open();
    });

    it("builds the URL", function() {
      expect(ajax.buildURL).toHaveBeenCalledWith("some/url", ajax.config.params);
    });

    it("opens the XHR connection", function() {
      expect(ajax.xhr.open).toHaveBeenCalledWith("get", "some/url?p=1");
    });
  });

  describe("send", function() {
    beforeEach(function() {
      spyOn(ajax.xhr, 'send');
      spyOn(ajax, 'open');
      spyOn(ajax, 'setHeaders');
      spyOn(ajax, 'setTimeout');
      ajax.config = {
        timeout: 1000,
        headers: {
          header1: "header1"
        }
      };
      ajax.send("body");
    });

    it("opens the connection", function() {
      expect(ajax.open).toHaveBeenCalled();
    });

    it("sets request headers", function() {
      expect(ajax.setHeaders).toHaveBeenCalledWith(ajax.config.headers);
    });

    it("sets the request timeout", function() {
      expect(ajax.setTimeout).toHaveBeenCalledWith(ajax.config.timeout);
    });

    it("sends the XHR request", function() {
      expect(ajax.xhr.send).toHaveBeenCalledWith("body");
    });
  });

  describe("abort", function() {
    beforeEach(function() {
      spyOn(ajax.xhr, 'abort');
    });

    it("calls abort on the XHR object", function() {
      ajax.abort();
      expect(ajax.xhr.abort).toHaveBeenCalled();
    });
  });

});
