'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Course', {
      Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      Duration: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      TeacherId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Teacher',
          key: 'Id'
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Course');
  }
};