'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notifikasi = sequelize.define('Notifikasi', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    id_pelanggan: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: null
    },
    id_tukang: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: null
    },
    judul: DataTypes.STRING,
    deskripsi: DataTypes.TEXT,
    tanggal: DataTypes.DATE,
    dibaca: DataTypes.BOOLEAN,
    tipe: DataTypes.STRING,
    data: DataTypes.TEXT
  }, {
    tableName: 'notifikasi',
    underscored: true,
    freezeTableName: true
  });
  Notifikasi.associate = function(models) {
    Notifikasi.belongsTo(models.Pelanggan, {
      foreignKey: 'id_pelanggan',
      onDelete: 'CASCADE'
    });

    Notifikasi.belongsTo(models.Tukang, {
      foreignKey: 'id_tukang',
      onDelete: 'CASCADE'
    });
  };
  return Notifikasi;
};