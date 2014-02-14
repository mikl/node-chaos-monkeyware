// Different kinds of mischief the monkey can perform.
"use strict";

// Simulate a crash by shutting down the server.
module.exports.crash = function () {
  process.exit(31337);
};

// Delay the normal response 1-10 seconds.
module.exports.delay = function (req, res, next) {
  setTimeout(next, 1000 + Math.random() * 9000);
};

// Simulate access denied.
module.exports.http403 = function (req, res, next) {
  res.setHeader('Content-Type', 'text/plain');
  res.writeHead(403, res.headers);
  res.end('You. Shall not. Pass.');
};

// Simulate Not Found.
module.exports.http404 = function (req, res, next) {
  res.setHeader('Content-Type', 'text/plain');
  res.writeHead(404, res.headers);
  res.end('This is not the URL you are looking for.');
};

// Simulate an internal server error.
module.exports.http500 = function (req, res, next) {
  res.setHeader('Content-Type', 'text/plain');
  res.writeHead(500, res.headers);
  res.end('#fail');
};

module.exports.http418 = function (req, res, next) {
  res.setHeader('Content-Type', 'text/plain');
  res.writeHead(418, res.headers);
  res.end("I'm a teapot");
};
