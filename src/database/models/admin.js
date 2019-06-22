'use strict';
module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    nama: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    hak_akses: DataTypes.STRING
  }, {
    tableName: "admin",
    underscored: true,
    freezeTableName: true
  });
  Admin.associate = function(models) {
    // associations can be defined here
  };
  return Admin;
};