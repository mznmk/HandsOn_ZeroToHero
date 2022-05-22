'use strict'

// [ import library ]
const postsHandler = require('./posts-handler');
const util = require('./handler-util');

// [ router ]
function route(req, res) {
  switch (req.url) {
    case '/posts':
      postsHandler.handle(req, res);
      break;
    case '/logout':
      util.handleLogout(req, res);
      break;
    default:
      util.handleNotFound(req, res);
      break;
  }
}

// [ exports ]
module.exports = {
  route
};