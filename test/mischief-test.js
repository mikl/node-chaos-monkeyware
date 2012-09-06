// Tests for mischief.
"use strict";

var assert = require('assert'),
    connect = require('connect'),
    mischief = require('../mischief'),
    request = require('request'),
    vows = require('vows');

vows.describe('Chaos Monkeyware mischief').addBatch({
  "when HTTP 500 mischief is active on a connect server,": {
    topic: function () {
      var callback = this.callback();

      var app = connect()
        .use(connect.logger('dev'))
        .use(mischief.http500)
        .use(function(req, res){
          res.end('hello world\n');
        })
        .listen(34526, '127.0.0.1', 511, function (err) {
          callback(err, app);
        });
    },

    'HTTP requests will fail every time.': function (app) {
      request('http://127.0.0.1:34526', function (error, response, body) {
        assert.equal(response.statusCode, 500);
      });
    },
  },
}).export(module);
