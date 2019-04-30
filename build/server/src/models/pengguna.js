'use strict';

module.exports = function (sequelize, DataTypes) {
  var Pengguna = sequelize.define('Pengguna', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    id_hak_akses: DataTypes.UUID,
    kode_pengguna: DataTypes.STRING,
    nama: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    tgl_registrasi: DataTypes.DATE
  }, {
    freezeTableName: true,
    tableName: 'pengguna',
    underscored: true
  });

  Pengguna.associate = function (models) {
    Pengguna.belongsTo(models.HakAkses, {
      foreignKey: 'id_hak_akses',
      onDelete: 'CASCADE'
    });
    Pengguna.hasMany(models.VerifikasiAkun, {
      foreignKey: 'id_pengguna',
      onDelete: 'CASCADE'
    });
    Pengguna.hasMany(models.Pesanan, {
      foreignKey: 'id_pelanggan',
      onDelete: 'CASCADE'
    });
    Pengguna.hasMany(models.Pesanan, {
      foreignKey: 'id_tukang',
      onDelete: 'CASCADE'
    });
    Pengguna.hasMany(models.RuangObrolan, {
      foreignKey: 'id_pelanggan',
      onDelete: 'CASCADE'
    });
    Pengguna.hasMany(models.RuangObrolan, {
      foreignKey: 'id_tukang',
      onDelete: 'CASCADE'
    });
    Pengguna.hasMany(models.PesanObrolan, {
      foreignKey: 'id_pengguna',
      onDelete: 'CASCADE'
    });
    Pengguna.hasMany(models.Notifikasi, {
      foreignKey: 'id_pengguna',
      onDelete: 'CASCADE'
    });
  };

  return Pengguna;
};
//# sourceMappingURL=pengguna.js.map