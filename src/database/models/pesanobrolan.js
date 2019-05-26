'use strict';
module.exports = (sequelize, DataTypes) => {
  const PesanObrolan = sequelize.define('PesanObrolan', {
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
    id_ruang_obrolan: DataTypes.UUID,
    isi: DataTypes.TEXT,
    tanggal: DataTypes.DATE,
    dibaca: DataTypes.BOOLEAN
  }, {
    tableName: 'pesan_obrolan',
    freezeTableName: true,
    underscored: true
  });
  PesanObrolan.associate = function(models) {
    PesanObrolan.belongsTo(models.RuangObrolan, {
      foreignKey: 'id_ruang_obrolan',
      onDelete: 'CASCADE'
    });

    PesanObrolan.belongsTo(models.Pelanggan, {
      foreignKey: 'id_tukang',
      onDelete: 'CASCADE'
    });

    PesanObrolan.belongsTo(models.Tukang, {
      foreignKey: 'id_pelanggan',
      onDelete: 'CASCADE'
    });
  };
  return PesanObrolan;
};