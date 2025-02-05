'use strict';
module.exports = (sequelize, DataTypes) => {
  const Shot = sequelize.define('Shot', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  Shot.associate = function(models) {
    // associations can be defined here
  };
  return Shot;
};
