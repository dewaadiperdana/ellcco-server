'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('status_pesanan', [
      {
        nama: 'Menunggu Penerimaan',
      },
      {
        nama: 'Menunggu Perbaikan',
      },
      {
        nama: 'Sedang Perbaikan',
      },
      {
        nama: 'Selesai Perbaikan',
      },
      {
        nama: 'Menunggu Pembayaran',
      },
      {
        nama: 'Pembayaran Selesai',
      },
      {
        nama: 'Perbaikan Dibatalkan',
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('status_pesanan', null, {});
  }
};