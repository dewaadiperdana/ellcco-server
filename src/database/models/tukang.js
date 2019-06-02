"use strict";
module.exports = (sequelize, DataTypes) => {
  const Tukang = sequelize.define(
    "Tukang",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      kode: DataTypes.STRING,
      nama: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      aktif: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      alamat: DataTypes.TEXT,
      no_telp: DataTypes.STRING,
      hak_akses: DataTypes.STRING,
      token: DataTypes.TEXT,
      socket: DataTypes.STRING
    },
    {
      tableName: "tukang",
      freezeTableName: true,
      underscored: true
    }
  );
  Tukang.associate = function(models) {
    Tukang.hasMany(models.Pemesanan, {
      foreignKey: "id_pelanggan",
      onDelete: "CASCADE",
      as: "pemesanan"
    });

    Tukang.hasOne(models.Verifikasi, {
      foreignKey: "id_tukang",
      onDelete: "CASCADE"
    });

    Tukang.hasMany(models.PesanObrolan, {
      foreignKey: "id_tukang",
      onDelete: "CASCADE"
    });

    Tukang.hasMany(models.Notifikasi, {
      foreignKey: "id_tukang",
      onDelete: "CASCADE"
    });

    Tukang.belongsToMany(models.Jasa, {
      as: "jasa",
      through: "PelayananJasa",
      foreignKey: "id_tukang"
    });
  };
  return Tukang;
};
