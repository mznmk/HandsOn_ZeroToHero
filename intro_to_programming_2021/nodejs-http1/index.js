'use strict'

const http = require('http');
const fs = require('fs');

// createServer
// https://nodejs.org/api/http.html#httpcreateserveroptions-requestlistener
const server = http.createServer();
const port = '8000';
server.on('request', (req, res) => {
  const now = new Date;
  console.info(
    `[${now}] Requested by ${req.socket.remoteAddress}`
  );
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf8'
  });
  switch (req.method) {
    case 'GET':
      const rs = fs.createReadStream('./form.html');
      rs.pipe(res);
      break;
    case "POST":
      let rawData = '';
      req
        .on('data', chunk => {
          rawData += chunk;
        })
        .on('end', () => {
          const decoded = decodeURIComponent(rawData);
          console.info(`[${now}] Posted: ${decoded}`);
          const qs = require('querystring');
          const answer = qs.parse(decoded)
          res.write(
            '<!DOCTYPE html>' +
            '<html lang="ja">' +
              '<body>' +
                `<h1>Posted: ${decoded}</h1>` +
                `<h2>Posted Name: ${answer['name']}</h2>` +
                `<h2>Posted Yaki-Shabu: ${answer['yaki-shabu']}</h2>` +
              '</body>' +
            '</html>'
          );
          res.end();
        });
      break;
    case 'DELETE':
      res.write(`DELETE ${req.url}`);
      break;
    default:
      break;
  }
});
server.on('error', e => {
  console.error(`[${new Date}] Server Error: `, e);
});
server.on('clientError', e => {
  console.error(`[${new Date}] Client Error: `, e);
});

server.listen(port, () => {
  console.info(`[${new Date}] Listening on ${port}`);
});