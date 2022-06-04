'use strict'

// [ import ]
const http = require('http');

// [ const variable ]
const port = 8000;

// [ add event to server ]
const server = http.createServer();
server.on('request', (req, res) => {
  const now = Date.now();
  res.setHeader('Content-Type', 'text/plain;charset=utf-8')
  res.setHeader('Set-Cookie', `last_access=${now}; expires=Mon, 07 Jan 2036 00:00:00 GMT;`);
  let last_access_time = now;
  if (req.headers.cookie) {
    last_access_time = parseInt(req.headers.cookie.split('last_access=')[1]);
  }
  res.end(new Date(last_access_time).toString());
});
server.listen(port, () => {
  console.info(`Listening on ${port}`);
});