"use strict";
module.exports = (sequelize, DataTypes) => {
  const DetailPerbaikan = sequelize.define(
    "DetailPerbaikan",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      id_pemesanan: DataTypes.UUID,
      nama: DataTypes.STRING
    },
    {
      tableName: "detail_perbaikan",
      underscored: true,
      freezeTableName: true
    }
  );
  DetailPerbaikan.associate = function(models) {
    DetailPerbaikan.belongsTo(models.Pemesanan, {
      foreignKey: "id_pemesanan",
      onDelete: "CASCADE",
      as: "pemesanan"
    });
  };
  return DetailPerbaikan;
};
