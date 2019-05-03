'use strict';
module.exports = (sequelize, DataTypes) => {
  const TokenPerangkat = sequelize.define('TokenPerangkat', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    id_pengguna: DataTypes.UUID,
    token: DataTypes.TEXT
  }, {
    freezeTableName: true,
    tableName: 'token_perangkat',
    underscored: true
  });
  TokenPerangkat.associate = function(models) {
    TokenPerangkat.belongsTo(models.Pengguna, {
      foreignKey: 'id_pengguna',
      onDelete: 'CASCADE'
    });
  };
  return TokenPerangkat;
};