const { DataTypes } = require('sequelize');
const { sequelize } = require('../../setup/db');
const { generateDate } = require('../../utils/utils');
const Course = require('./course');
const Student = require('./student');

const CourseStudent = sequelize.define('CourseStudent', {
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
  StudentId: {
    type: DataTypes.INTEGER,
    references: {
      model: Student,
      key: "Id"
    }
  },
  EnrolledOn: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: () => generateDate()
  },
}, { freezeTableName: true, timestamps: false });

module.exports = CourseStudent;
