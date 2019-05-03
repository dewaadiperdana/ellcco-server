'use strict';
module.exports = (sequelize, DataTypes) => {
  const VerifikasiAkun = sequelize.define('VerifikasiAkun', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    id_pengguna: {
      primaryKey: true,
      type: DataTypes.UUID
    },
    token: {
      type: DataTypes.TEXT,
      unique: true
    },
    tanggal_berlaku: DataTypes.DATE
  }, {
    freezeTableName: true,
    tableName: 'verifikasi_akun',
    underscored: true
  });
  VerifikasiAkun.associate = function(models) {
    VerifikasiAkun.belongsTo(models.Pengguna, {
      foreignKey: 'id_pengguna',
      onDelete: 'CASCADE'
    });
  };
  return VerifikasiAkun;
};