'use strict'

const http = require('http');
const pug = require('pug');

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
    // method: GET
    case 'GET':
      if (req.url === '/') {
        res.write(
          '<!DOCTYPE html>' +
          '<html lang="ja">' +
            '<body>' +
              '<h1>アンケートフォーム</h1>' +
              '<a href="/enquetes">アンケート一覧</a>' +
            '</body>' +
          '</html>'
        );
      } else if (req.url === '/enquetes') {
        res.write(
          '<!DOCTYPE html>' +
          '<html lang="ja">' +
            '<body>' +
              '<h1>アンケート一覧</h1>' +
              '<ul>' +
                '<li><a href="/enquetes/yaki-shabu">焼き肉・しゃぶしゃぶ</a></li>' +
                '<li><a href="/enquetes/rice-bread">ごはん・パン</a></li>' +
                '<li><a href="/enquetes/sushi-pizza">寿司・ピザ</a></li>' +
              '</ul>' +
            '</body>' +
          '</html>'
        );
      } else if (req.url === '/enquetes/yaki-shabu') {
        res.write(pug.renderFile('./form.pug', {
          path: req.url,
          firstItem: '焼き肉',
          secondItem: 'しゃぶしゃぶ'
        }));
      } else if (req.url === '/enquetes/rice-bread') {
        res.write(pug.renderFile('./form.pug', {
          path: req.url,
          firstItem: 'ごはん',
          secondItem: 'パン'
        }));
      } else if (req.url === '/enquetes/sushi-pizza') {
        res.write(pug.renderFile('./form.pug', {
          path:req.url,
          firstItem: '寿司',
          secondItem: 'ピザ'
        }))
      }
      res.end();
      break;
    // method: POST
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
                '<h1>投票ありがとうございました！</h1>' +
                `<h2>${answer['name']}さんは</h2>` +
                `<h2>${answer['favorite']}に投票しました！</h2>` +
              '</body>' +
            '</html>'
          );
          res.end();
        });
      break;
    // method: DELETE
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