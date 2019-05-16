'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('token_perangkat', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()')
          },
          id_pengguna: {
            primaryKey: true,
            type: Sequelize.UUID,
            references: {
              model: 'pengguna',
              key: 'id',
              as: 'id_pengguna'
            },
            onDelete: 'cascade'
          },
          token: {
            type: Sequelize.TEXT,
            allowNull: true
          },
          socket: {
            type: Sequelize.STRING,
            allowNull: true
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
    return queryInterface.dropTable('token_perangkat');
  }
};