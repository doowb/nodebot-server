'use strict';

var path = require('path');
var express = require('express');

module.exports = function(fp) {
  var app = express();
  app.get('/', function(req, res){
    res.sendFile(fp);
  });

  return app;
};
