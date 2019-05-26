'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('pelayanan_jasa', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()')
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
            references: {
              model: 'jasa',
              key: 'id',
              as: 'id_jasa'
            },
            onDelete: 'cascade'
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
    return queryInterface.dropTable('pelayanan_jasa');
  }
};