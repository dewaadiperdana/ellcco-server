'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";').then(function () {
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
          }
        },
        judul: {
          type: Sequelize.STRING
        },
        deskripsi: {
          type: Sequelize.TEXT
        },
        tanggal: {
          type: Sequelize.DATE
        },
        dibaca: {
          type: Sequelize.BOOLEAN
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
  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('notifikasi');
  }
};
//# sourceMappingURL=20190429115833-create-notifikasi.js.map