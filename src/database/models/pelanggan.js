'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pelanggan = sequelize.define('Pelanggan', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
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
  }, {
    tableName: 'pelanggan',
    freezeTableName: true,
    underscored: true
  });
  Pelanggan.associate = function(models) {
    Pelanggan.hasMany(models.Pemesanan, {
      foreignKey: 'id_pelanggan',
      onDelete: 'CASCADE'
    });

    Pelanggan.hasOne(models.Verifikasi, {
      foreignKey: 'id_pelanggan',
      onDelete: 'CASCADE'
    });

    Pelanggan.hasMany(models.PesanObrolan, {
      foreignKey: 'id_pelanggan',
      onDelete: 'CASCADE'
    });

    Pelanggan.hasMany(models.Notifikasi, {
      foreignKey: 'id_pelanggan',
      onDelete: 'CASCADE'
    });
  };
  return Pelanggan;
};