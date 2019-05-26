'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('tukang', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()')
          },
          kode: {
            type: Sequelize.STRING,
            unique: true
          },
          nama: {
            type: Sequelize.STRING
          },
          email: {
            type: Sequelize.STRING,
            unique: true
          },
          password: {
            type: Sequelize.STRING
          },
          aktif: {
            type: Sequelize.BOOLEAN
          },
          alamat: {
            type: Sequelize.TEXT
          },
          no_telp: {
            type: Sequelize.STRING
          },
          hak_akses: {
            type: Sequelize.STRING,
            allowNull: false
          },
          token: {
            type: Sequelize.TEXT
          },
          socket: {
            type: Sequelize.STRING
          },
          created_at: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('NOW()')
          },
          updated_at: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('NOW()')
          }
        });
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tukang');
  }
};