'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Schedule', {
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
      LocationId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Location',
          key: 'Id'
        }
      },
      StartTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      EndTime: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Schedule');
  }
};