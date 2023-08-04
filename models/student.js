const { DataTypes } = require('sequelize');
const { sequelize } = require('../setup/db');
const Person = require('./person');

const Student = sequelize.define('Student', {
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
  },

  IsDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
}, { freezeTableName: true, timestamps: false });

module.exports = Student;
