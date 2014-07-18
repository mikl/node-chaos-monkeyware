"use strict";

var mischief = require('./mischief');

// The only surface area for this module is the middleware factory
// prototype defined here.
var chaos_monkeyware = module.exports = function (options) {

  var probability = options.probability || 0.1;

  return function middleware (req, res, next) {
    var mischiefNames, mischiefName;

    // First, decide whether to do anything at all.
    if (Math.random() > 1 - probability) {

      // Select a mischief at random.
      mischiefNames = Object.keys(mischief);
      mischiefName = mischiefNames[Math.floor(Math.random() * mischiefNames.length)];

      // Set a header so it's apparent to anyone inspecting the request
      // that this failure was... special.
      res.setHeader('ChaosMonkeyWare', mischiefName);

      if (options && typeof options.logger === 'function') {
        options.logger('ChaosMonkeyWare mischief: ' + mischiefName);
      }

      return mischief[mischiefName](req, res, next);
    }

    return next();
  };
};
