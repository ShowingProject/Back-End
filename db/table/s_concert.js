var sequelize_conn = require('../config');
var Sequelize = require('sequelize');

var Concert = sequelize_conn.define('s_concert', {
  concertUuid: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },

  title: {
    type: Sequelize.STRING
  },

  artist_id: {
    type: Sequelize.INTEGER
  },

  schedule_info: {
    type: Sequelize.STRING
  },

  price: {
    type: Sequelize.STRING
  },

  location: {
    type: Sequelize.STRING
  },

  s_concertcol: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: true,
  instanceMethods: {
    get_title_and_price: function () {
      console.log(this.title + this.price);
    }
  }
});

module.exports = Concert;