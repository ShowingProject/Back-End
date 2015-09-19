var $ = require('cheerio'),
    _ = require("underscore"),
    crawler_util = require("../../../util/crawler.util"),
    url_prefix = "http://www.rollinghall.co.kr",
    iconv_util = require("../../../util/iconv.util");

var rolling_hall = {
  "name": "Rolling Hall",

  "get_list": function(parse_html){
    var link_list = parse_html(".prdList a").map(function(){
      var link = $(this).attr("href");

      if (typeof link === "string") {
        return link || "";
      }
    });

    return link_list;
  },

  "get_info": function(link_list){
    _.each(link_list, function(link){
      if (link) {
        var call_link = url_prefix + link;
        var body_promise = crawler_util.request_url(call_link);

        body_promise.then(function(body){
          var $ = crawler_util.parse_html(body);
          console.dir(iconv_util.euckr_to_utf8($(".infoArea tr td:nth-child(2) span").html()));
        }, function(err){
          console.error(err);
        })
      }
    })
  },

  "get_concert": function(parse_html){
    var link_list = this.get_list(parse_html);
    var info_list = this.get_info(link_list);
  }
};

module.exports = rolling_hall;