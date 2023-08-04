const { DataTypes } = require('sequelize');
const { sequelize } = require('../../setup/db');
const Teacher = require('./teacher');

const Course = sequelize.define('Course', {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  TeacherId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Teacher,
      key: "Id"
    }
  }
}, { freezeTableName: true, timestamps: false });

module.exports = Course;
