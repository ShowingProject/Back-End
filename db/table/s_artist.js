var sequelize_conn = require('../config');
var Sequelize = require('sequelize');

var Artist = sequelize_conn.define("s_artist", {
  "artist_uuid": {
    "type": Sequelize.INTEGER,
    "primaryKey": true,
    "allowNull": false,
    "autoIncrement": true
  },

  "name": {
    "type": Sequelize.STRING
  },


  "artist_type": {
    "type": Sequelize.INTEGER
  },

  "picture": {
    "type": Sequelize.STRING
  }
});

module.exports = Artist;