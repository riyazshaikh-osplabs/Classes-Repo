const { DataTypes } = require("sequelize");
const { sequelize } = require('../../setup/db');

const State = sequelize.define("State", {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  Name: {
    type: DataTypes.STRING,
    allowNull: false
  }

}, { freezeTableName: true, timestamps: false });

module.exports = State;