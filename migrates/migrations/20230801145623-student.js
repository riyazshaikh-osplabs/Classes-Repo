'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Student', {
      Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      PersonId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Person',
          key: 'Id'
        }
      },
      IsDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Student');
  }
};