"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable("pelanggan", {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal("uuid_generate_v4()")
          },
          kode: {
            type: Sequelize.STRING(15),
            unique: true,
            allowNull: false
          },
          nama: {
            type: Sequelize.STRING(50),
            allowNull: false
          },
          email: {
            type: Sequelize.STRING(70),
            unique: true,
            allowNull: false
          },
          password: {
            type: Sequelize.STRING(200),
            allowNull: false
          },
          aktif: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
          },
          alamat: {
            type: Sequelize.TEXT,
            allowNull: false
          },
          no_telp: {
            type: Sequelize.STRING(15),
            allowNull: false
          },
          hak_akses: {
            type: Sequelize.STRING(10),
            allowNull: false
          },
          token: {
            type: Sequelize.TEXT,
            allowNull: true
          },
          socket: {
            type: Sequelize.STRING(55),
            allowNull: true
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
    return queryInterface.dropTable("pelanggan");
  }
};