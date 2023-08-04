const { DataTypes } = require('sequelize');
const { sequelize } = require('../../setup/db');
const Person = require('./person');

const Admin = sequelize.define('Admin', {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  PersonId: {
    type: DataTypes.INTEGER,
    references: {
      model: Person,
      key: 'Id'
    }
  }
}, { freezeTableName: true, timestamps: false });

module.exports = Admin;
