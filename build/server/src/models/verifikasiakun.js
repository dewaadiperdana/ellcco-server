'use strict';

module.exports = function (sequelize, DataTypes) {
  var VerifikasiAkun = sequelize.define('VerifikasiAkun', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    id_pengguna: DataTypes.UUID,
    token: DataTypes.TEXT,
    tanggal_berlaku: DataTypes.DATE
  }, {
    freezeTableName: true,
    tableName: 'verifikasi_akun',
    underscored: true
  });

  VerifikasiAkun.associate = function (models) {
    VerifikasiAkun.belongsTo(models.Pengguna, {
      foreignKey: 'id_pengguna',
      onDelete: 'CASCADE'
    });
  };

  return VerifikasiAkun;
};
//# sourceMappingURL=verifikasiakun.js.map