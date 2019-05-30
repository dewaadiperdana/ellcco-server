'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('pemesanan', {
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
            onDelete: 'cascade'
          },
          id_tukang: {
            type: Sequelize.UUID,
            references: {
              model: 'tukang',
              key: 'id',
              as: 'id_tukang'
            },
            onDelete: 'cascade'
          },
          id_jasa: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
              model: 'jasa',
              key: 'id',
              as: 'id_jasa'
            },
            onDelete: 'cascade'
          },
          kode: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
          },
          tanggal: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('NOW()'),
            allowNull: false
          },
          biaya: {
            type: Sequelize.INTEGER
          },
          kerusakan: Sequelize.STRING,
          deskripsi: Sequelize.TEXT,
          status: {
            type: Sequelize.ENUM(
              'menunggu_penerimaan',
              'menunggu_perbaikan',
              'sedang_perbaikan',
              'menunggu_pembayaran',
              'perbaikan_selesai',
              'perbaikan_dibatalkan'
            ),
            defaultValue: 'menunggu_penerimaan'
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
    return queryInterface.dropTable('pemesanan');
  }
};