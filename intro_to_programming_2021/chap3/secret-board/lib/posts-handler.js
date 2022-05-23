'use strict'

// [ import library ]
const crypto = require('crypto');
const pug = require('pug');
const Coolies = require('cookies');
const Post = require('./post');

const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);

const util = require('./handler-util');
const Cookies = require('cookies');

// [ variable ]
const trackingIdKey = 'tracking_id';

// [ posts handler ]
function handle(req, res) {
  const cookies = new Cookies(req, res);
  const trackingId = addTrackingCookie(cookies, req.user);

  switch (req.method) {
    // [ GET ]
    case 'GET':
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
        // 'Content-Type': 'text/html; charset=utf-8',
        // 'Content-Security-Policy': "default-src 'self'; script-src https://*; style-src https://*"
      });
      Post.findAll({order:[['id', 'DESC']]}).then((posts) => {
        posts.forEach((post) => {
          post.formattedCreatedAt = dayjs(post.createdAt).tz('Asia/Tokyo').format('YYYY年MM月DD日 HH時mm分ss秒');
        });
        res.end(pug.renderFile('./views/posts.pug', { posts, user: req.user }));
      });
      console.info(
        `閲覧されました: user: ${req.user}, ` +
        `trackingId: ${trackingId}, ` +
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
          trackingCookie: trackingId,
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
          if (req.user === post.postedBy || req.user === 'admin') {
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
/**
 * Cookieに含まれているトラッキングIDに異常がなければその値を返し、
 * 存在しない場合や異常なものである場合には、再度作成しCookieに付与してその値を返す
 * @param {Cookies} cookies
 * @param {String} userName
 * @return {String} トラッキングID
 */
function addTrackingCookie(cookies, userName) {
  const requestedTrackingId = cookies.get(trackingIdKey);
  if (isValidTrackingId(requestedTrackingId, userName)) {
    return (requestedTrackingId);
  } else {
    const originalId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    const tommorow = new Date(Date.now() + (1000 * 60 * 60 * 24));
    const trackingId = originalId + '_' + createValidHash(originalId, userName);
    cookies.set(trackingIdKey, trackingId, { expires: tommorow });
    return trackingId;
  }
}

function isValidTrackingId(trackingId, userName) {
  if (!trackingId) {
    return false;
  }
  const splitted = trackingId.split('_');
  const originalId = splitted[0];
  const requestedHash = splitted[1];
  return createValidHash(originalId, userName) === requestedHash;
}

function createValidHash(originalId, userName) {
  const sha1sum = crypto.createHash('sha1');
  sha1sum.update(originalId + userName);
  return sha1sum.digest('hex');
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