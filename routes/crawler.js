var express = require('express');
var router = express.Router();
var showingCrawler = require("../service/showingCrawler");

/* GET home page. */
router.get('/', function(req, res, next) {
  showingCrawler.get_url_data();
  res.json({ some: "object literal" });
});

module.exports = router;
