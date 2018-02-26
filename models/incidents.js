'use strict';
module.exports = (sequelize, DataTypes) => {
  var incidents = sequelize.define('incidents', {
    revisionId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    trackerId: DataTypes.INTEGER
  }, {});
  incidents.associate = function(models) {
    incidents.hasMany(models.incidentrevisions, {foreignKey: 'incidentId'});
  };
  return incidents;
};