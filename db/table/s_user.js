var sequelize_conn = require('../config');
var Sequelize = require('sequelize');

var User = sequelize_conn.define("s_user", {
  "user_uuid": {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autuIncrement: true
  },

  "id": {
    "type": Sequelize.STRING,
    allowNull: false
  },

  "nick_name": {
    "type": Sequelize.STRING
  },

  "password": {
    "type": Sequelize.STRING
  },

  "sns_type": {
    "type": Sequelize.STRING
  },

  "picture_url": {
    "type": Sequelize.STRING
  }
});

module.exports = User;