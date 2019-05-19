'use strict';
module.exports = (sequelize, DataTypes) => {
  const Perangkat = sequelize.define('Perangkat', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    id_pengguna: DataTypes.UUID,
    token: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    socket: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    freezeTableName: true,
    tableName: 'perangkat',
    underscored: true
  });
  Perangkat.associate = function(models) {
    Perangkat.belongsTo(models.Pengguna, {
      foreignKey: 'id_pengguna',
      onDelete: 'CASCADE'
    });
  };
  return Perangkat;
};