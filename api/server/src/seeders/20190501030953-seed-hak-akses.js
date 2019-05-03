'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('hak_akses', [
      {
        kode: 2,
        nama: 'Admin'
      },
      {
        kode: 1,
        nama: 'Tukang'
      },
      {
        kode: 0,
        nama: 'Pelanggan'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('hak_akses', null, {});
  }
};