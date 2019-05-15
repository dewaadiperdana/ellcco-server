'use strict';
module.exports = (sequelize, DataTypes) => {
  const HakAkses = sequelize.define('HakAkses', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    kode: DataTypes.INTEGER,
    nama: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'hak_akses',
    underscored: true
  });
  HakAkses.associate = function(models) {
    HakAkses.hasMany(models.Pengguna, {
      foreignKey: 'id_hak_akses',
      onDelete: 'CASCADE'
    })
  };
  return HakAkses;
};