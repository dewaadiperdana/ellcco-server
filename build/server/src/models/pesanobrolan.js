'use strict';

module.exports = function (sequelize, DataTypes) {
  var PesanObrolan = sequelize.define('PesanObrolan', {
    id_ruang_obrolan: DataTypes.UUID,
    id_pengguna: DataTypes.UUID,
    isi_pesan: DataTypes.TEXT,
    tanggal: DataTypes.DATE
  }, {});

  PesanObrolan.associate = function (models) {
    PesanObrolan.belongsTo(models.RuangObrolan, {
      foreignKey: 'id_ruang_obrolan',
      onDelete: 'CASCADE'
    });
    PesanObrolan.belongsTo(models.Pengguna, {
      foreignKey: 'id_pengguna',
      onDelete: 'CASCADE'
    });
  };

  return PesanObrolan;
};
//# sourceMappingURL=pesanobrolan.js.map