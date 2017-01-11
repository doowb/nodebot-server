'use strict';

var Emitter = require('component-emitter');
var extend = require('extend-shallow');

/**
 * Start a web server hosting the index page and a websocket
 * server to listen for commands to send to listening nodebots.
 *
 * ```js
 * var options = { cwd: __dirname, index: 'index.html' };
 * server(options, function(err, app) {
 *   if (err) {
 *     console.error(err);
 *     process.exit(1);
 *     return;
 *   }
 *   console.log('Nodebot server started.');
 *
 *    // listen for commands
 *    app.on('cmd', function(cmd) {
 *      console.log(`Received command: ${cmd}`);
 *    });
 * });
 * ```
 * @name server
 * @param  {Object} `options` Options to control how the server is configured.
 * @param  {String} `options.cwd` Directory where any static files to be served are found. Defaults to `process.cwd()`.
 * @param  {String} `options.index` Relative path from `options.cwd` to the html file to serve when the root route is accessed. Defaults to `index.html`.
 * @param  {Number} `options.port` Port for the web server to listen on. Defaults to 3000.
 * @param  {Function} `cb` Callback function that is passed an `err` if an Error occurs, or an `app` when successful. See [app](#app).
 * @api public
 */

module.exports = function(options, cb) {

  var opts = extend({
    cwd: process.cwd(),
    index: 'index.html',
    port: 3000
  }, options);

  /**
   * Application instance that is used to listen for events to know when to send commands to your nodebots.
   *
   * ```js
   * app.on('cmd', function(cmd) {
   *   console.log(cmd);
   *   //=> 'forward'
   * });
   * ```
   * @name app
   * @api public
   */

  var app = new Emitter();
  var server = require('./server')(opts);
  var http = require('http').Server(server);
  var io = require('socket.io')(http);

  io.on('connection', function(socket){
    console.log('New user connected through websocket.');
    socket.on('disconnect', function(){
      console.log('User disconnected from websocket.');
    });

    socket.on('cmd', function(cmd){
      app.emit('cmd', cmd);
    });
  });

  http.listen(opts.port, function(){
    console.log(`Nodebot server listening on port: ${opts.port}`);
    cb(null, app);
  });
};
