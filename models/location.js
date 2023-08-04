const { DataTypes } = require('sequelize');
const { sequelize } = require('../setup/db');

const Location = sequelize.define('Location', {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  MaxStudents: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
}, { freezeTableName: true, timestamps: false });

module.exports = Location;
