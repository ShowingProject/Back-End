var showingCrawler = require("../service/showingCrawler");

describe("showingCrawler Test", function () {
  it("showingCrawler get crawling", function(){
    var url = "http://naver.com";

    expect(showingCrawler.get_url_data(url)).toBe(url + "귀요미");
  });
});