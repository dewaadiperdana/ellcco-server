'use strict';
module.exports = (sequelize, DataTypes) => {
  const Layanan = sequelize.define('Layanan', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    nama: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'layanan',
    underscored: true
  });
  Layanan.associate = function(models) {
    Layanan.hasMany(models.Pesanan, {
      foreignKey: 'id_layanan',
      onDelete: 'CASCADE'
    });
  };
  return Layanan;
};