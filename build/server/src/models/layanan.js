'use strict';

module.exports = function (sequelize, DataTypes) {
  var Layanan = sequelize.define('Layanan', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    nama: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'layanan',
    underscored: true
  });

  Layanan.associate = function (models) {
    Layanan.hasMany(models.Pesanan, {
      foreignKey: 'id_layanan',
      onDelete: 'CASCADE'
    });
  };

  return Layanan;
};
//# sourceMappingURL=layanan.js.map