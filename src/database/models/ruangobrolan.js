'use strict';
module.exports = (sequelize, DataTypes) => {
  const RuangObrolan = sequelize.define('RuangObrolan', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    id_pemesanan: DataTypes.UUID,
    kode: DataTypes.STRING,
    dibuka: DataTypes.BOOLEAN
  }, {
    tableName: 'ruang_obrolan',
    freezeTableName: true,
    underscored: true
  });
  RuangObrolan.associate = function(models) {
    RuangObrolan.hasMany(models.PesanObrolan, {
      foreignKey: 'id_ruang_obrolan',
      onDelete: 'CASCADE'
    });

    RuangObrolan.belongsTo(models.Pemesanan, {
      foreignKey: 'id_pemesanan',
      onDelete: 'CASCADE'
    });
  };
  return RuangObrolan;
};