'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('hak_akses', [
      {
        nama: 'Admin'
      },
      {
        nama: 'Tukang'
      },
      {
        nama: 'Pelanggan'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('hak_akses', null, {});
  }
};
