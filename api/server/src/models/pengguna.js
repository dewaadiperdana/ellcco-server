'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pengguna = sequelize.define('Pengguna', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    id_hak_akses: DataTypes.UUID,
    kode_pengguna: {
      type: DataTypes.STRING,
      unique: true
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tgl_registrasi: DataTypes.DATE,
    aktif: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    alamat: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    no_telp: {
      type: DataTypes.CHAR,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    tableName: 'pengguna',
    underscored: true
  });
  Pengguna.associate = function(models) {
    Pengguna.belongsTo(models.HakAkses, {
      foreignKey: 'id_hak_akses',
      onDelete: 'CASCADE'
    });

    Pengguna.hasOne(models.VerifikasiAkun, {
      foreignKey: 'id_pengguna',
      onDelete: 'CASCADE'
    });

    Pengguna.hasOne(models.TokenPerangkat, {
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