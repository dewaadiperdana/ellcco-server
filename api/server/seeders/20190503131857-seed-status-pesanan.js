'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('status_pesanan', [
      {
        nama: 'Menunggu Penerimaan',
        kode: 1,
        icon: 'clock'
      },
      {
        nama: 'Menunggu Perbaikan',
        kode: 2,
        icon: 'history'
      },
      {
        nama: 'Sedang Perbaikan',
        kode: 3,
        icon: 'wrench'
      },
      {
        nama: 'Menunggu Pembayaran',
        kode: 4,
        icon: 'money-bill-alt'
      },
      {
        nama: 'Perbaikan Dibatalkan',
        kode: 5,
        icon: 'times-circle'
      },
      {
        nama: 'Pesanan Selesai',
        kode: 6,
        icon: 'check-circle'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('status_pesanan', null, {});
  }
};