'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _aureliaGooglePlaces = require('./aurelia-google-places');

Object.keys(_aureliaGooglePlaces).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _aureliaGooglePlaces[key];
    }
  });
});