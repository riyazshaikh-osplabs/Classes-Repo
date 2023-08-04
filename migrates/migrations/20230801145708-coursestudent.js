'use strict';

const { generateDate } = require('../../utils/utils');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CourseStudent', {
      Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      CourseId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Course',
          key: 'Id'
        }
      },
      StudentId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Student',
          key: 'Id'
        }
      },
      EnrolledOn: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: () => generateDate()
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CourseStudent');
  }
};