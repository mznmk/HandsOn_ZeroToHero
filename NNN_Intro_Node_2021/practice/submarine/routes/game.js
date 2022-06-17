var express = require("express");
var router = express.Router();
var config = require("../config");

/* GET home page/ */
router.get("/", (req, res, next) => {
  const displayName = req.user ? req.user.displayName : "anonymous";
  const thumbUrl = req.user ? req.user.photos[0].value : "anonymous";
  res.render("game", {
    title: "潜水艦ゲーム",
    displayName: displayName,
    thumbUrl: thumbUrl,
    ipAddress: config.ipAddress
  });
});

module.exports = router;