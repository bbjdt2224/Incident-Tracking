'use strict';
module.exports = (sequelize, DataTypes) => {
  var incidents = sequelize.define('incidents', {
    revisionId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    trackerId: DataTypes.INTEGER
  }, {});
  incidents.associate = function(models) {
    // associations can be defined here
  };
  return incidents;
};