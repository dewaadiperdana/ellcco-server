'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('admin', [
      {
        nama: 'Admin',
        username: 'admin',
        password: bcrypt.hashSync('admin1234', 10),
        hak_akses: 'admin'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('admin', null, {});
  }
};