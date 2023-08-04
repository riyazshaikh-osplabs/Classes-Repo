'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const adminUserDetails = {
      Id: 1,
      PersonId: 1
    };

    await queryInterface.bulkInsert('Admin', [adminUserDetails], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Admin', {});
  }
};