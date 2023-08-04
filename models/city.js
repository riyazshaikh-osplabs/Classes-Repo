const { DataTypes } = require("sequelize");
const { sequelize } = require('../setup/db');
const State = require("./state");

const City = sequelize.define("City", {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  Name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  StateId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: State,
      key: 'Id'
    }
  }
}, { freezeTableName: true, timestamps: false });

module.exports = City;