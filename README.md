Chaos Monkeyware
================

The Chaos Monkey is an idea [originally outlined][origin] by the Netflix
tech team.

The basic idea is to have something in your stack that causes random
failures in your system, so you’ll be forced to make your app resillient
against random failure.

The original Chaos Monkey ([available on Github][SimianArmy]) worked by
killing servers and processes at random in a distributed cloud
infrastructure.


What is it?
-----------

Chaos Monkeyware works on a smaller scale. It is a Express/Connect
compatible middleware for Node.js web applications that causes random
failures. The failure propability is configurable (default is 10%).

The currently included failure modes (called mischiefs) are:

* Crash – exits the Node.js process before it has a chance to respond to
  the HTTP request. I hope you have a process monitor…
* Delay – provides the normal HTTP response, but with an added (random)
  delay of 1-10 seconds.
* HTTP 403 Access Denied
* HTTP 404 Not Found
* HTTP 500 Internal Server Error

Currently, all of these mischiefs have equal propability. Future
releases might support adjusting their probability individually or even
disabling some of them individually.


Usage
-----

It is used as any other Connect/Express compatible middleware.


### Connect ###

    var app = require('connect')()
      .use(connect.logger('dev'))
      .use(connect.static('public'))
      .use(require('chaos-monkeyware')())
      .use(function(req, res){
        res.end('hello world\n');
      })
    .listen(3000);


### Flatiron ###

    var flatiron = require('flatiron');

    app = new flatiron.App();
    app.use(flatiron.plugins.http);

    app.http.before = [
      require('chaos-monkeyware')()
    ];

    app.start(8080);


### Restify ###

    var apiserver = restify.createServer(serverOptions);

    // If not on production, enable the Chaos Monkeyware middleware.
    if (process.env.NODE_ENV !== 'production') {
      apiserver.pre(require('chaos-monkeyware')({
        probability: 0.2
      }));
    }

[origin]: http://techblog.netflix.com/2010/12/5-lessons-weve-learned-using-aws.html
[horror]: http://www.codinghorror.com/blog/2011/04/working-with-the-chaos-monkey.html
[SimianArmy]: https://github.com/Netflix/SimianArmy
