var Q = require('q'),
    request = require('request'),
    cheerio = require('cheerio');

function get_url_data(){
  Q().then(function(){
    var defer = Q.defer();

    request({
      url: 'http://cafe.naver.com/veloso.cafe?iframe_url=/ArticleList.nhn%3Fsearch.clubid=11250090%26search.menuid=1%26search.boardtype=L'
    }, function(err, resp, body){
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(body);
      }
    });

    return defer.promise;
  }).then(function(body){
    var defer = Q.defer();
    var $ = cheerio.load(body);
    var link_list = [];

    var list = $('.article-board a.m-tcol-c');

    list.each(function(e){
      var href = e.attr("href");

      if (href !== "#") {
        link_list.push(href);
      }
    });

    defer.resolve(link_list.join(" , "));

    return defer.promise;
  }).then(function(classStr){
    //console.log(classStr);
  });
}

var crawler = {
  "get_url_data": get_url_data
};

module.exports = crawler;