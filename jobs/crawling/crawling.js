var glob = require('glob'),
    path = require('path'),
    crawler_util = require("../../util/crawler.util");

//console.dir(glob.sync('./jobs/crawling/theatre/*.js'));
glob.sync('./jobs/crawling/theatre/*.js').forEach(function(file){
  var crawling_obj = require(path.resolve(file)),
      url = crawler_util.get_url(crawling_obj.name);

  var promise_crawling_result = crawler_util.request_url(url);

  promise_crawling_result.then(function(body){
    var $ = crawler_util.parse_html(body);
    crawling_obj.get_concert($);
  }, function(error){
    console.error(error);
  });
});