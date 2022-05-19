'use strict'

// [ import library ]
const postsHandler = require('./posts-handler');

// [ router ]
function route(req, res) {
  switch (req.url) {
    case '/posts':
      postsHandler.handle(req, res);
      break;
    case '/logout':
      break;
    default:
      break;
  }
}

// [ exports ]
module.exports = {
  route
};