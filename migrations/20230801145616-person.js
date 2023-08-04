'use strict';

const { generateDate } = require('../utils/utils');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Person', {
      Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      FirstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      LastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Mobile: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      Email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      Password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      CityId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'City',
          key: 'Id'
        }
      },
      StateId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'State',
          key: 'Id'
        }
      },
      CreatedOn: {
        type: Sequelize.DATE,
        defaultValue: () => generateDate(),
        allowNull: true
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Person');
  }
};