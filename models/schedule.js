const { DataTypes } = require('sequelize');
const { sequelize } = require('../setup/db');
const Course = require('./course');
const Location = require('./location');

const Schedule = sequelize.define('Schedule', {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  CourseId: {
    type: DataTypes.INTEGER,
    references: {
      model: Course,
      key: "Id"
    }
  },
  LocationId: {
    type: DataTypes.INTEGER,
    references: {
      model: Location,
      key: "Id"
    }
  },
  StartTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  EndTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, { freezeTableName: true, timestamps: false });

module.exports = Schedule;
