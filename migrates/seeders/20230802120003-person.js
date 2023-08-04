'use strict';
const bcrypt = require("bcryptjs");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const adminUserDetails = {
      Id: 3,
      FirstName: 'Riyaz',
      LastName: 'Shaikh',
      Mobile: 8163090639,
      Email: 'riyaz@osplabs.com',
      Password: bcrypt.hashSync("Riyaz_0712", 10),
      Address: "Mira Road(E) Thane-401107",
      CityId: 17,
      StateId: 9
    };

    await queryInterface.bulkInsert('Person', [adminUserDetails], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Person', { Email: 'riyaz@osplabs.com', }, {});
  }
};
