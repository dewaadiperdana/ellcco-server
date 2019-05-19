'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('layanan', [
        {
          nama: 'Televisi',
        },
        {
          nama: 'Kipas Angin',
        },
        {
          nama: 'Blender',
        },
        {
          nama: 'Amplifier',
        },
        {
          nama: 'DVD',
        },
        {
          nama: 'Speaker Active',
        },
        {
          nama: 'Rice Cooker',
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('layanan', null, {});
  }
};
