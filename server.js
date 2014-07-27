var hapi = require('hapi');
var five = require('johnny-five');
var Control = require('./control');

var host = 'localhost';
var port = 9999;
var server = hapi.createServer(host, port);

server.route({
  path: '/{param*}',
  method: 'get',
  handler: {
    directory: {
      path: './static'
    }
  }
});

server.start(function () {
  var board = new five.Board();

  board.on('ready', function () {
    var control = new Control(board);
    // send commands here
  });
});
