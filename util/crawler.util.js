var homepage_list = require("../config/crawling.conf.json"),
    _ = require("underscore"),
    request = require("request"),
    Q = require("q"),
    cheerio = require('cheerio');

var crawlerUtil = {
  /**
   * 미리 정의 해놓은 목록에서 name을 기준으로 URL값을 가져오는 메서드.
   * EX) 미리 정해놓은
   * @param name
   * @return {*}
   */
  "getUrl": function(name){
    var result_obj = _.where(homepage_list, {name: name}),
        result;

    if(result_obj.length === 1) {
      result = result_obj[0].url;
    } else {
      result = _.pluck(result_obj, 'url');
    }

    return result;
  },

  /**
   * url을 받아서 해당 사이트의 html을 리턴해주는 메서드.
   * @param url - 크롤링할 URL
   * @return {promise} - Prmise 객체
   */
  "requestUrl": function(url, Arr){
    var defer = Q.defer();

    request({url: url}, function(err, resp, body){
      if(err) {
        defer.reject(err);
      } else {
        defer.resolve(body);
      }
    });

    return defer.promise;
  },

  "parseHtml": function(html){
    return cheerio.load(html);
  },

  /**
   * Function getPageData와 의존 관계.
   * Promise처리를 대신해주는 메서드.
   * @param promise - 처리할 Promise 컨테이너
   * @param resultArr - 결과를 넣을 배열.
   * @param callback - Promise처리시 수행할 callback 메서드.
   */
  "pageCallback": function(promise, resultArr, callback){
    promise.then(function(html){
      var $ = cheerio.load(html);

      resultArr.push(callback($));

    }).catch(function(err){
      console.error(err);
    });
  },

  /**
   * Crawling시 수행되는 핵심 메서드.
   * url과 callback메서드를 받고 크롤링을 대신해서 그 결과를 callback메서드에 넣어줌.
   * callback 메서드는 반드시 결과를 리턴해야함.
   * @param url {String | Array} - 크롤링할 url, 여러 url이 필요할시 배열로 넣어주고 하나만 필요하면 문자열로 넣어줌.
   * @param callback - 크롤링후 데이터를 받을 callback메서드.
   * @return {Array} - 결과가 담겨진 Array.
   */
  "getPageData": function(url, callback){
    //결과값이 담겨질 Array
    var resultArr = [];

    //받은 url이 배열인지 아닌지 구별.
    if(Array.isArray(url)) {
      _.each(result, function(crawing_url){
        //requestUrl메서드를 이용하여 요청하고 Promise 컨테이너로 받음.
        var promise = this.requestUrl(crawing_url);

        //pageCallback를 이용하여 받은 html을 callback으로 처리.
        this.pageCallback(promise, resultArr, callback);
      });
    } else {
      //requestUrl메서드를 이용하여 요청하고 Promise 컨테이너로 받음.
      var promise = this.requestUrl(url);

      //pageCallback를 이용하여 받은 html을 callback으로 처리.
      this.pageCallback(promise, resultArr, callback);
    }

    //결과가 담겨진 Array를 리턴.
    return resultArr;
  }
};

module.exports = crawlerUtil;