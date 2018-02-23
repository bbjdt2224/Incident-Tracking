const Sequelize = require('sequelize');
const sequelize = new Sequelize('testbd', 'justin', 'Bennett00', {
    dialect: 'postgres'
  })

const user = conn.define('user', {
  id: Sequelize.INTEGER,
  firstName: Sequelize.TEXT,
  lastName: Sequelize.TEXT,
  email: Sequelize.TEXT,
  isTracker: Sequelize.BOOLEAN,
  role: Sequelize.TEXT
})

const incident = conn.define('incident', {
  id: Sequelize.INTEGER,
  revisionId: Sequelize.INTEGER,
  userId: Sequelize.INTEGER,
  trackerId: Sequelize.INTEGER
})

const incidentRevision = conn.define('incidentRevision', {
  id: Sequelize.INTEGER,
  incidentId: Sequelize.INTEGER,
  revisionNumber: Sequelize.INTEGER,
  timestamp: Sequelize.DATE,
  type: Sequelize.TEXT,
  shortDescription: Sequelize.TEXT,
  longDescription: Sequelize.TEXT,
  resolution: Sequelize.TEXT,
  severity: Sequelize.INTEGER
})

module.exports = sequelize