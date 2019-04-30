'use strict';

module.exports = function (sequelize, DataTypes) {
  var HakAkses = sequelize.define('HakAkses', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    nama: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'hak_akses',
    underscored: true
  });

  HakAkses.associate = function (models) {
    HakAkses.hasMany(models.Pengguna, {
      foreignKey: 'id_hak_akses',
      onDelete: 'CASCADE'
    });
  };

  return HakAkses;
};
//# sourceMappingURL=hakakses.js.map