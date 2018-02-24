'use strict';
module.exports = (sequelize, DataTypes) => {
  var incidentrevisions = sequelize.define('incidentrevisions', {
    incidentId: DataTypes.INTEGER,
    revisionNumebr: DataTypes.INTEGER,
    timestamp: DataTypes.DATE,
    type: DataTypes.STRING,
    shortDescription: DataTypes.STRING,
    longDescription: DataTypes.STRING,
    resolution: DataTypes.STRING,
    severity: DataTypes.INTEGER
  }, {});
  incidentrevisions.associate = function(models) {
    // associations can be defined here
  };
  return incidentrevisions;
};