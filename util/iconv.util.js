var Iconv  = require('iconv').Iconv;
var euckr2utf8 = new Iconv('EUC-KR', 'UTF-8');

var iconv_util = {
  "euckr_to_utf8": function(text){
    return euckr2utf8.convert(text);
  }
};

module.exports = iconv_util;
