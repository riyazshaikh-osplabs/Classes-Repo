'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Location', {
      Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      MaxStudents: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Location');
  }
};