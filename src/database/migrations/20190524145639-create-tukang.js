"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable("tukang", {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal("uuid_generate_v4()")
          },
          kode: {
            type: Sequelize.STRING(15),
            unique: true
          },
          nama: {
            type: Sequelize.STRING(50)
          },
          email: {
            type: Sequelize.STRING(70),
            unique: true
          },
          password: {
            type: Sequelize.STRING(200)
          },
          aktif: {
            type: Sequelize.BOOLEAN
          },
          alamat: {
            type: Sequelize.TEXT
          },
          no_telp: {
            type: Sequelize.STRING(15)
          },
          hak_akses: {
            type: Sequelize.STRING(10),
            allowNull: false
          },
          token: {
            type: Sequelize.TEXT
          },
          socket: {
            type: Sequelize.STRING(55)
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
    return queryInterface.dropTable("tukang");
  }
};
