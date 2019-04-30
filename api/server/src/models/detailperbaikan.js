'use strict';
module.exports = (sequelize, DataTypes) => {
  const DetailPerbaikan = sequelize.define('DetailPerbaikan', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    id_pesanan: DataTypes.UUID,
    nama: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'detail_perbaikan',
    underscored: true
  });
  DetailPerbaikan.associate = function(models) {
    DetailPerbaikan.belongsTo(models.Pesanan, {
      foreignKey: 'id_pesanan',
      onDelete: 'CASCADE'
    });
  };
  return DetailPerbaikan;
};