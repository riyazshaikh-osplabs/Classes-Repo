const { DataTypes } = require('sequelize');
const { sequelize } = require('../setup/db');
const Person = require('./person');

const Teacher = sequelize.define('Teacher', {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  PersonId: {
    type: DataTypes.INTEGER,
    refereneces: {
      model: Person,
      key: 'Id'
    }
  }
}, { freezeTableName: true, timestamps: false });

module.exports = Teacher;
