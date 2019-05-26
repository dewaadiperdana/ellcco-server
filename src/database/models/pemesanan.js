'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pemesanan = sequelize.define('Pemesanan', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    id_pelanggan: DataTypes.UUID,
    id_tukang: DataTypes.UUID,
    id_jasa: DataTypes.UUID,
    kode: DataTypes.STRING,
    tanggal: DataTypes.DATE,
    biaya: DataTypes.INTEGER,
    status: {
      type: DataTypes.ENUM,
      values: [
        'menunggu_penerimaan',
        'menunggu_perbaikan',
        'sedang_perbaikan',
        'menunggu_pembayaran',
        'perbaikan_selesai',
        'perbaikan_dibatalkan'
      ]
    }
  }, {
    tableName: 'pemesanan',
    freezeTableName: true,
    underscored: true
  });
  Pemesanan.associate = function(models) {
    Pemesanan.belongsTo(models.Pelanggan, {
      foreignKey: 'id_pelanggan',
      onDelete: 'CASCADE'
    });

    Pemesanan.belongsTo(models.Tukang, {
      foreignKey: 'id_tukang',
      onDelete: 'CASCADE'
    });

    Pemesanan.belongsTo(models.Jasa, {
      foreignKey: 'id_jasa',
      onDelete: 'CASCADE'
    });

    Pemesanan.hasMany(models.DetailPerbaikan, {
      foreignKey: 'id_pemesanan',
      onDelete: 'CASCADE'
    });

    Pemesanan.hasMany(models.RuangObrolan, {
      foreignKey: 'id_pemesanan',
      onDelete: 'CASCADE'
    });
  };
  return Pemesanan;
};