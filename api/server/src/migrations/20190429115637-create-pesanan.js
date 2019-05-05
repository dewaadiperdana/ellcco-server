'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('pesanan', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()')
          },
          id_tukang: {
            type: Sequelize.UUID,
            references: {
              model: 'pengguna',
              key: 'id',
              as: 'id_tukang'
            },
            onDelete: 'cascade'
          },
          id_pelanggan: {
            type: Sequelize.UUID,
            references: {
              model: 'pengguna',
              key: 'id',
              as: 'id_pelanggan'
            },
            onDelete: 'cascade'
          },
          id_layanan: {
            type: Sequelize.UUID,
            references: {
              model: 'layanan',
              key: 'id',
              as: 'id_layanan'
            },
            onDelete: 'cascade'
          },
          id_status: {
            type: Sequelize.UUID,
            references: {
              model: 'status_pesanan',
              key: 'id',
              as: 'id_status',
            },
            onDelete: 'cascade'
          },
          kode_pesanan: {
            type: Sequelize.STRING,
            unique: true
          },
          tanggal: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('NOW()')
          },
          biaya: {
            type: Sequelize.INTEGER
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
    return queryInterface.dropTable('pesanan');
  }
};