'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('verifikasi', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()')
          },
          id_pelanggan: {
            type: Sequelize.UUID,
            references: {
              model: 'pelanggan',
              key: 'id',
              as: 'id_pelanggan'
            },
            onDelete: 'cascade',
            allowNull: true,
            defaultValue: null
          },
          id_tukang: {
            type: Sequelize.UUID,
            references: {
              model: 'tukang',
              key: 'id',
              as: 'id_tukang'
            },
            onDelete: 'cascade',
            allowNull: true,
            defaultValue: null
          },
          token: {
            type: Sequelize.TEXT
          },
          tgl_berlaku: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('NOW()')
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
    return queryInterface.dropTable('verifikasi');
  }
};