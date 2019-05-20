'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('notifikasi', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()')
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
          judul: {
            type: Sequelize.STRING
          },
          deskripsi: {
            type: Sequelize.TEXT
          },
          tanggal: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('NOW()')
          },
          dibaca: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
          },
          data: {
            type: Sequelize.TEXT,
            allowNull: true
          },
          tipe: {
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
    return queryInterface.dropTable('notifikasi');
  }
};