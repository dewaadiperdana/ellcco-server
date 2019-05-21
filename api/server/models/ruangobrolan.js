'use strict';
module.exports = (sequelize, DataTypes) => {
  const RuangObrolan = sequelize.define('RuangObrolan', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    id_tukang: DataTypes.UUID,
    id_pelanggan: DataTypes.UUID,
    id_pesanan: DataTypes.UUID,
    kode_ruang: {
      type: DataTypes.STRING,
      unique: true
    },
    dibuka: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    freezeTableName: true,
    tableName: 'ruang_obrolan',
    underscored: true
  });
  RuangObrolan.associate = function(models) {
    RuangObrolan.belongsTo(models.Pengguna, {
      foreignKey: 'id_tukang',
      onDelete: 'CASCADE'
    });

    RuangObrolan.belongsTo(models.Pengguna, {
      foreignKey: 'id_pelanggan',
      onDelete: 'CASCADE'
    });

    RuangObrolan.hasMany(models.PesanObrolan, {
      foreignKey: 'id_ruang_obrolan',
      onDelete: 'CASCADE'
    });

    RuangObrolan.belongsTo(models.Pesanan, {
      foreignKey: 'id_pesanan',
      onDelete: 'CASCADE'
    });
  };
  return RuangObrolan;
};