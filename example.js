'use strict';

var path = require('path');
var server = require('./');
server({cwd: path.join(__dirname), index: 'index.html'}, function(err, app) {
  app.on('cmd', function(cmd) {
    console.log('emitted cmd:', cmd);
  });
});
