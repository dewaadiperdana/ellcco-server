'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('pengguna', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()')
          },
          id_hak_akses: {
            type: Sequelize.UUID,
            references: {
              model: 'hak_akses',
              key: 'id',
              as: 'id_hak_akses'
            }
          },
          kode_pengguna: {
            type: Sequelize.STRING
          },
          nama: {
            type: Sequelize.STRING
          },
          email: {
            type: Sequelize.STRING
          },
          password: {
            type: Sequelize.STRING
          },
          tgl_registrasi: {
            type: Sequelize.DATE
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
    return queryInterface.dropTable('pengguna');
  }
};