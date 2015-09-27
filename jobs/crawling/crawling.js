var glob = require('glob'),
    path = require('path'),
    crawler_util = require("../../util/crawler.util");

glob.sync('./theatre/*.js').forEach(function(file){
  var crawling_obj = require(path.resolve(file)),
      url = crawler_util.getUrl(crawling_obj.name),
      promise_crawling_result = crawler_util.requestUrl(url);

  promise_crawling_result.then(function(body){
    var $ = crawler_util.parseHtml(body);
    crawling_obj.get_concert($);
  }, function(error){
    console.error(error);
  });
});