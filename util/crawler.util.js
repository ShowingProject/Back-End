var homepage_list = require("../config/crawling.conf.json"),
    _ = require("underscore"),
    request = require("request"),
    Q = require("q"),
    cheerio = require('cheerio');

var crawler_util = {
  "get_url": function(name){
    var result_obj = _.where(homepage_list, {name: name}),
        result;

    if (result_obj.length === 1) {
      result = result_obj[0].url;
    } else {
      result = _.pluck(result_obj, 'url');
    }

    return result;
  },

  "request_url": function(url){
    var defer = Q.defer();

    request({url: url}, function(err, resp, body){
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(body);
      }
    });

    return defer.promise;
  },

  "parse_html": function(body){
    return cheerio.load(body);
  }
};

module.exports = crawler_util;