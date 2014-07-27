var hapi = require('hapi');

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
  console.log('starting', host, 'at', port);
});
