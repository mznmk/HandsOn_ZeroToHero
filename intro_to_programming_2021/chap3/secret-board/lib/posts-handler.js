'use strict'

// [ import library ]
const pug = require('pug');
const Coolies = require('cookies');
const Post = require('./post');
const util = require('./handler-util');
const Cookies = require('cookies');

const trackingIdKey = 'tracking_id';

// [ posts handler ]
function handle(req, res) {
  const cookies = new Cookies(req, res);
  addTrackingCookie(cookies);

  switch (req.method) {
    // [ GET ]
    case 'GET':
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
      });
      Post.findAll({order:[['id', 'DESC']]}).then((posts) => {
        res.end(pug.renderFile('./views/posts.pug', { posts, user: req.user }));
      });
      console.info(
        `閲覧されました: user: ${req.user}, ` +
        `trackingID: ${cookies.get(trackingIdKey)}, ` +
        `remoteAddress: ${req.socket.remoteAddress} ` +
        `userAgent: ${req.headers['user-agent']} `
      );
      break;
    // [ POST ]
    case 'POST':
      let body = [];
      req.on('data', (chunk) => {
        body.push(chunk);
      });
      req.on('end', () => {
        body = Buffer.concat(body).toString();
        const params = new URLSearchParams(body);
        const content = params.get('content');
        console.info('投稿されました: ' + content);
        Post.create({
          content: content,
          trackingCookie: cookies.get(trackingIdKey),
          postedBy: req.user
        }).then(() => {
          handleRedirectPosts(req, res);
        });
      });
      break;
    // [ other ]
    default:
      util.handlerBadRequest(req, res)
      break;
  }
}

function handleDelete(req, res) {
  switch (req.method) {
    case 'POST':
      let body = [];
      req.on('data', (chunk) => {
        body.push(chunk);
      });
      req.on('end', () => {
        body = Buffer.concat(body).toString();
        const params = new URLSearchParams(body);
        const id = params.get('id');
        Post.findByPk(id).then((post) => {
          if (req.user === post.postedBy) {
            post.destroy().then(() => {
              handleRedirectPosts(req, res);
            });
          }
        });
      });
      console.info(
        `削除されました: user: ${req.user}, ` +
        `remoteAddress: ${req.socket.remoteAddress}, ` +
        `userAgent: ${req.headers['user-agent']} `
      );
      break;
    default:
      util.handlerBadRequest(req, res);
      break;
  }
}

function addTrackingCookie(cookies) {
  if (!cookies.get(trackingIdKey)) {
    const trackingId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    const tomorrow = new Date(Date.now() + (1000 * 60 * 60 * 24));
    cookies.set(trackingIdKey, trackingId, { expires: tomorrow });
  }
}

function handleRedirectPosts(req, res) {
  res.writeHead(303, {
    'Location': '/posts'
  });
  res.end();
}

// [ exports ]
module.exports = {
	handle,
  handleDelete
}