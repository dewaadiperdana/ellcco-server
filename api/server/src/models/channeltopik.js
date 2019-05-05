'use strict';
module.exports = (sequelize, DataTypes) => {
  const ChannelTopik = sequelize.define('ChannelTopik', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    kode: DataTypes.STRING,
    nama: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'channel_topik',
    underscored: true
  });
  ChannelTopik.associate = function(models) {
    // associations can be defined here
  };
  return ChannelTopik;
};