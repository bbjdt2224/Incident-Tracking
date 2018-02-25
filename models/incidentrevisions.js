'use strict';
module.exports = (sequelize, DataTypes) => {
  var incidentrevisions = sequelize.define('incidentrevisions', {
    incidentId: DataTypes.INTEGER,
    revisionNumber: DataTypes.INTEGER,
    type: DataTypes.STRING,
    shortDescription: DataTypes.STRING,
    longDescription: DataTypes.STRING,
    resolution: DataTypes.STRING,
    severity: DataTypes.INTEGER
  }, {});
  incidentrevisions.associate = function(models) {
    incidentrevisions.belongsTo(models.incidents, {foreignKey: 'incidentId', as: 'revision'});
  };
  return incidentrevisions;
};