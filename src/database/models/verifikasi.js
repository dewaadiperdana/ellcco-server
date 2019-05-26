'use strict';
module.exports = (sequelize, DataTypes) => {
  const Verifikasi = sequelize.define('Verifikasi', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
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
    token: DataTypes.TEXT,
    tgl_berlaku: DataTypes.DATE
  }, {
    tableName: 'verifikasi',
    freezeTableName: true,
    underscored: true
  });
  Verifikasi.associate = function(models) {
    Verifikasi.belongsTo(models.Pelanggan, {
      foreignKey: 'id_pelanggan',
      onDelete: 'CASCADE'
    });

    Verifikasi.belongsTo(models.Tukang, {
      foreignKey: 'id_tukang',
      onDelete: 'CASCADE'
    });
  };
  return Verifikasi;
};