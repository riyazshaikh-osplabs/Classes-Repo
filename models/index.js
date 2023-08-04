// 'use strict';

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const process = require('process');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js' &&
//       file.indexOf('.test.js') === -1
//     );
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;

const State = require("./state");
const City = require("./city");
const Person = require("./person");
const Student = require("./student");
const Teacher = require("./teacher");
const Admin = require("./admin");
const Course = require("./course");
const CourseStudent = require("./coursestudent");
const Location = require("./location");
const Schedule = require("./schedule");


City.belongsTo(State, { foreignKey: 'StateId', targetKey: 'Id' });
State.hasMany(City, { foreignKey: 'StateId', targetKey: 'Id' });

Person.belongsTo(City, { foreignKey: 'CityId', targetKey: 'Id' });
Person.belongsTo(State, { foreignKey: 'StateId', targetKey: 'Id' });

Student.belongsTo(Person, { foreignKey: 'PersonId', targetKey: 'Id' });
Person.hasOne(Student, { foreignKey: 'PersonId', targetKey: 'Id' });

Teacher.belongsTo(Person, { foreignKey: 'PersonId', targetKey: 'Id' });
Person.hasOne(Teacher, { foreignKey: 'PersonId', targetKey: 'Id' });

Admin.belongsTo(Person, { foreignKey: 'PersonId', targetKey: 'Id' });
Person.hasOne(Admin, { foreignKey: 'PersonId', targetKey: 'Id' });

Course.belongsTo(Teacher, { foreignKey: 'TeacherId', targetKey: 'Id' });
Teacher.hasMany(Course, { foreignKey: 'TeacherId', targetKey: 'Id' });

CourseStudent.belongsTo(Course, { foreignKey: 'CourseId', targetKey: 'Id' });
Course.hasMany(CourseStudent, { foreignKey: 'CourseId', targetKey: 'Id' });

CourseStudent.belongsTo(Student, { foreignKey: 'StudentId', targetKey: 'Id' });
Student.hasMany(CourseStudent, { foreignKey: 'StudentId', targetKey: 'Id' });

Schedule.belongsTo(Course, { foreignKey: 'CourseId', targetKey: 'Id' });
Course.hasMany(Schedule, { foreignKey: 'CourseId', targetKey: 'Id' });

Schedule.belongsTo(Location, { foreignKey: 'LocationId', targetKey: 'Id' });
Location.hasMany(Schedule, { foreignKey: 'LocationId', targetKey: 'Id' });


module.exports = { State, City, Person, Student, Teacher, Admin, Course, CourseStudent, Location, Schedule };

