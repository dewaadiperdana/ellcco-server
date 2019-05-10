'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pesanan = sequelize.define('Pesanan', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    id_tukang: DataTypes.UUID,
    id_pelanggan: DataTypes.UUID,
    id_layanan: DataTypes.UUID,
    id_status: DataTypes.UUID,
    kode_pesanan: {
      type: DataTypes.STRING,
      unique: true
    },
    tanggal: DataTypes.DATE,
    biaya: DataTypes.INTEGER
  }, {
    freezeTableName: true,
    tableName: 'pesanan',
    underscored: true
  });
  Pesanan.associate = function(models) {
    Pesanan.belongsTo(models.Pengguna, {
      foreignKey: 'id_pelanggan',
      onDelete: 'CASCADE'
    });

    Pesanan.belongsTo(models.Pengguna, {
      foreignKey: 'id_tukang',
      onDelete: 'CASCADE'
    });

    Pesanan.belongsTo(models.Layanan, {
      foreignKey: 'id_layanan',
      onDelete: 'CASCADE'
    });

    Pesanan.belongsTo(models.StatusPesanan, {
      foreignKey: 'id_status',
      onDelete: 'CASCADE'
    });

    Pesanan.hasMany(models.DetailPerbaikan, {
      foreignKey: 'id_pesanan',
      onDelete: 'CASCADE'
    })
  };
  return Pesanan;
};