/*
* Copyright © 2014 Joel Andritsch <joel.andritsch@gmail.com>
* See LICENSE for copyright/licensing information.
*/

var bs3u = {
  version: {
    full: "2.0.5",
    major: "2",
    minor: "0",
    patch: "5"
  }
};

// Extend "a" with "b". 
bs3u.extend = function(a, b) {
  for (var attr in b) {
    a[attr] = b[attr];
  }
};
