'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const cities = [

      { Name: 'Visakhapatnam', StateId: 1 },
      { Name: 'Vijayawada', StateId: 1 },

      { Name: 'Itanagar', StateId: 2 },
      { Name: 'Tawang', StateId: 2 },

      { Name: 'Guwahati', StateId: 3 },
      { Name: 'Silchar', StateId: 3 },

      { Name: 'Patna', StateId: 4 },
      { Name: 'Gaya', StateId: 4 },

      { Name: 'Raipur', StateId: 5 },
      { Name: 'Bhilai', StateId: 5 },

      { Name: 'Panaji', StateId: 6 },
      { Name: 'Margao', StateId: 6 },

      { Name: 'Ahmedabad', StateId: 7 },
      { Name: 'Surat', StateId: 7 },

      { Name: 'Chandigarh', StateId: 8 },
      { Name: 'Gurgaon', StateId: 8 },

      { Name: 'Shimla', StateId: 9 },
      { Name: 'Manali', StateId: 9 },

      { Name: 'Ranchi', StateId: 10 },
      { Name: 'Jamshedpur', StateId: 10 },

      { Name: 'Los Angeles', StateId: 11 },
      { Name: 'San Francisco', StateId: 11 },

      { Name: 'Baltimore', StateId: 12 },
      { Name: 'Annapolis', StateId: 12 },

      { Name: 'Jackson', StateId: 13 },
      { Name: 'Biloxi', StateId: 13 },

      { Name: 'Kansas City', StateId: 14 },
      { Name: 'St. Louis', StateId: 14 },

      { Name: 'Honolulu', StateId: 15 },
      { Name: 'Hilo', StateId: 15 },

      { Name: 'Miami', StateId: 16 },
      { Name: 'Orlando', StateId: 16 },

      { Name: 'Atlanta', StateId: 17 },
      { Name: 'Savannah', StateId: 17 },

      { Name: 'Birmingham', StateId: 18 },
      { Name: 'Mobile', StateId: 18 },

      { Name: 'Anchorage', StateId: 19 },
      { Name: 'Fairbanks', StateId: 19 },

      { Name: 'Las Vegas', StateId: 20 },
      { Name: 'Reno', StateId: 20 },
    ];

    await queryInterface.bulkInsert("City", cities, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("City", {});
  }
};