'use strict'

// [ import library ]
const http = require('http');
const auth = require('http-auth')
const router = require('./lib/router');

// [ const variable ]
const port = process.env.PORT || 8000;
const basic = auth.basic({
  realm: 'Enter username and password.',
  file: './users.htpasswd'
})

// [ create server ]
const server = http.createServer(basic.check((req, res) => {
  router.route(req, res);
}));
server.on('error', e => {
  console.error('Server Error', e);
});
server.on('clientError', e => {
  console.error('Client Error', e);
});
server.listen(port, () => {
  console.info("Listening on " + port);
});