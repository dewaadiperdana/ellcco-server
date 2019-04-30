'use strict';

module.exports = function (sequelize, DataTypes) {
  var StatusPesanan = sequelize.define('StatusPesanan', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    nama: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'status_pesanan',
    underscored: true
  });

  StatusPesanan.associate = function (models) {
    StatusPesanan.hasMany(models.Pesanan, {
      foreignKey: 'id_status',
      onDelete: 'CASCADE'
    });
  };

  return StatusPesanan;
};
//# sourceMappingURL=statuspesanan.js.map