'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";').then(function () {
      return queryInterface.createTable('hak_akses', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.literal('uuid_generate_v4()')
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
    return queryInterface.dropTable('hak_akses');
  }
};
//# sourceMappingURL=20190429114105-create-hak-akses.js.map