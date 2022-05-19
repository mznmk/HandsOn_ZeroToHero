'use strict'

// [ import library ]
const http = require('http');
const router = require('./lib/router');

// [ const variable ]
const port = 8000;

// [ create server ]
const server = http.createServer();
server.on('request', (req, res) => {
  router.route(req, res);
});
server.on('error', e => {
  console.error('Server Error', e);
});
server.on('clientError', e => {
  console.error('Client Error', e);
});
server.listen(port, () => {
  console.info("Listening on " + port);
});