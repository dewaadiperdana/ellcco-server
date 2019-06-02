"use strict";
module.exports = (sequelize, DataTypes) => {
  const PelayananJasa = sequelize.define(
    "PelayananJasa",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      id_tukang: DataTypes.UUID,
      id_jasa: DataTypes.UUID
    },
    {
      tableName: "pelayanan_jasa",
      freezeTableName: true,
      underscored: true
    }
  );
  PelayananJasa.associate = function(models) {
    PelayananJasa.belongsTo(models.Tukang, {
      foreignKey: "id_tukang",
      onDelete: "CASCADE"
    });

    PelayananJasa.belongsTo(models.Jasa, {
      foreignKey: "id_jasa",
      onDelete: "CASCADE"
    });
  };
  return PelayananJasa;
};
