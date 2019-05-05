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
          id_ruang_obrolan: {
            type: Sequelize.UUID,
            references: {
              model: 'ruang_obrolan',
              key: 'id',
              as: 'id_ruang_obrolan'
            },
            onDelete: 'cascade'
          },
          id_pengguna: {
            type: Sequelize.UUID,
            references: {
              model: 'pengguna',
              key: 'id',
              as: 'id_pengguna'
            },
            onDelete: 'cascade'
          },
          isi_pesan: {
            type: Sequelize.TEXT
          },
          tanggal: {
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
    return queryInterface.dropTable('pesan_obrolan');
  }
};