'use strict';

var path = require('path');
var express = require('express');
var extend = require('extend-shallow');

module.exports = function(options) {
  var opts = extend({
    cwd: process.cwd(),
    index: 'index.html'
  }, options);

  var app = express();
  app.use(express.static(opts.cwd));

  app.get('/', function(req, res){
    res.sendFile(path.join(opts.cwd, opts.index));
  });

  return app;
};
