'use strict';

const randomstring = require('randomstring');

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('channel_topik', [
        {
          nama: 'Pesanan',
          kode: randomstring.generate(12)
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('channel_topik', null, {});
  }
};