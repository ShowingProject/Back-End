var request = require("request"),
    cheerio = require("cheerio"),
    crawlerUtil = require("./util/crawler.util");

crawlerUtil.getPageData("http://naver.com", function($){
  $("#realrank a").each(function(i, e){
    console.log(e.attribs.title);
  });
});

