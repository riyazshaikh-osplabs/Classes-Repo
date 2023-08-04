'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const states = [
      { Name: 'Andhra Pradesh' },
      { Name: 'Arunachal Pradesh' },
      { Name: 'Assam' },
      { Name: 'Bihar' },
      { Name: 'Chhattisgarh' },
      { Name: 'Goa' },
      { Name: 'Gujarat' },
      { Name: 'Haryana' },
      { Name: 'Himachal Pradesh' },
      { Name: 'Jharkhand' },
      { Name: 'California' },
      { Name: 'Maryland' },
      { Name: 'Mississippi' },
      { Name: 'Missouri' },
      { Name: 'Hawaii' },
      { Name: 'Florida' },
      { Name: 'Georgia' },
      { Name: 'Alabama' },
      { Name: 'Alaska' },
      { Name: 'Nevada' }
    ];

    await queryInterface.bulkInsert("State", states, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('State', {});
  }
};
