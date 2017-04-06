define(['exports', './aurelia-google-places'], function (exports, _aureliaGooglePlaces) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.keys(_aureliaGooglePlaces).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _aureliaGooglePlaces[key];
      }
    });
  });
});