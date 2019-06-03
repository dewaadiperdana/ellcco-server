'use strict';
module.exports = (sequelize, DataTypes) => {
  const Jasa = sequelize.define('Jasa', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    nama: DataTypes.STRING,
    channel: DataTypes.STRING
  }, {
    tableName: 'jasa',
    underscored: true,
    freezeTableName: true
  });
  Jasa.associate = function(models) {
    Jasa.hasMany(models.PelayananJasa, {
      foreignKey: 'id_jasa',
      onDelete: 'CASCADE',
      as: 'pelayananjasa'
    });

    Jasa.hasMany(models.Pemesanan, {
      foreignKey: 'id_jasa',
      onDelete: 'CASCADE'
    });

    Jasa.belongsToMany(models.Tukang, {
      as: 'tukang',
      through: 'PelayananJasa',
      foreignKey: 'id_jasa'
    });
  };
  return Jasa;
};