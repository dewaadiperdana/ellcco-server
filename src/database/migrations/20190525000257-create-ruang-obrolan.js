"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable("ruang_obrolan", {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal("uuid_generate_v4()")
          },
          id_pemesanan: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
              model: "pemesanan",
              key: "id",
              as: "id_pemesanan"
            },
            onDelete: "cascade"
          },
          kode: {
            type: Sequelize.STRING(10),
            allowNull: false
          },
          created_at: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal("NOW()")
          },
          updated_at: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal("NOW()")
          }
        });
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("ruang_obrolan");
  }
};
