'use strict'

// [ import ]
const http = require('http');

// [ const variable ]
const port = 8000;

// [ create server ]
const server = http.createServer();
server.on('request', (req, res) => {
  // res.writeHead(302, {
  //   Location: 'https://www.nnn.ed.nico/'
  // })
  res.writeHead(302, {
    Location: 'https://www.nicovideo.jp/'
  })
  res.end();
});
server.listen(port, () => {
  console.info(`Listening on ${port}`);
});
