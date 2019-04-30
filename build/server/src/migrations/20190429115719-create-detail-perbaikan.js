'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";').then(function () {
      return queryInterface.createTable('detail_perbaikan', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.literal('uuid_generate_v4()')
        },
        id_pesanan: {
          type: Sequelize.UUID,
          references: {
            model: 'pesanan',
            key: 'id',
            as: 'id_pesanan'
          }
        },
        nama: {
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
  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('detail_perbaikan');
  }
};
//# sourceMappingURL=20190429115719-create-detail-perbaikan.js.map