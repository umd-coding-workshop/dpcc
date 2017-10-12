#!/usr/bin/env node

var connect = require('connect');
var serveStatic = require('serve-static');

var args = process.argv.slice(2);
var port = args[0] || 8080;

connect().use(serveStatic(__dirname + '/build')).listen(port, function(){
  console.log('Server running on port ' + port + '...');
});
