var glob = require('glob')
  , path = require('path');

glob.sync('./table/*.js').forEach(function (file) {
  var table = require(path.resolve(file));
  table.sync();
});