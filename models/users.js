'use strict';
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('users', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    isTracker: DataTypes.BOOLEAN,
    role: DataTypes.STRING
  }, {});
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};