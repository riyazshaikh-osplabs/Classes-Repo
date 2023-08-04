'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Admin', {
      Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      PersonId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Person',
          key: 'Id'
        }
      }
    }, { freezeTableName: true, timestamps: false });

    await queryInterface.addConstraint('Admin', {

      fields: ['PersonId'],
      type: 'foreign key',

      references: {
        table: 'Person',
        field: 'Id'
      }
    });
  },


  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Admin');
  }
};