'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('pesan_obrolan', {
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
          id_ruang_obrolan: {
            type: Sequelize.UUID,
            references: {
              model: 'ruang_obrolan',
              key: 'id',
              as: 'id_ruang_obrolan'
            },
            onDelete: 'cascade'
          },
          isi: {
            type: Sequelize.TEXT
          },
          tanggal: {
            type: Sequelize.DATE
          },
          dibaca: {
            allowNull: false,
            type: Sequelize.BOOLEAN,
            defaultValue: false
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
    return queryInterface.dropTable('pesan_obrolan');
  }
};