var express = require('express')
var bodyParser = require("body-parser")
var app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var db = require('./models/index.js')

//GET /incidents 
app.get('/incidents', function (req, res) {
  var incidentarr = [];
  db.incidents.findAll({
    where: {
      userId: 1
    }
  }).then(incidents =>{
    incidents.forEach(incident => {
      db.incidentrevisions.findOne({
        where: {
          incidentId: incident.id,
          revisionNumber: incident.revisionId
        }
      }).then(revision =>{
        incidentarr.push(revision)
      })
    })
  })
  res.send(incidentarr)
})
 
//POST /incidents
app.post('/incidents', function (req, res) {
  db.incidents.create({
    revisionId: 1,
    userId: req.body.userId,
    trackerId: req.body.trackerId
  }).then(incident => {
    db.incidentrevisions.create({
      revisionNumber: '1',
      type: req.body.type,
      shortDescription: req.body.shortDescription,
      longDescription: req.body.longDescription
    }).then(function(revision){
      return revision.setIncident(incident)
    })
  })
  res.send("Done")
})

//GET /incident/(id)
app.get('/incident/:id', function(req, res) {
  db.incidents.findById(req.params['id']).then(incident => {
    db.incidentrevisions.findOne({
      where: {
        incidentId: incident.id,
        revisionNumber: incident.revisionId
      }
    }).then(revision => {
      res.send(revision)
    })
  })
})

app.put('/incident/:id', function(req, res) {
  var pastRevision;
  db.incidents.findById(req.params['id']).then(incident => {
    db.incidentrevisions.findOne({
      where: {
        incidentId: incident.id,
        revisionNumber: incident.revisionId
      }
    }).then(revision => {
      pastRevision = revision
    })
  })

  db.incidentrevisions.create({
    revisionNumber: pastRevision.revisionNumber+1,
    type: req.body.type,
    shortDescription: req.body.shortDescription,
    longDescription: req.body.longDescription
  })

  db.incidents.update({
    revisionId: pastRevision.revisionNumber+1,
    trackerId: req.body.trackerId
  },{
    where: {
      id: req.params['id']
    }
  })
})

app.post('/signup', function (req, res) {
  db.users.create({
    email: req.body.email
    //password
  })
})

app.post('/login', function (req, res) {
  db.users.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
      //check if password is same as in database
  })
})

app.post('/logout', function (req, res) {
  
})

app.put('/incident/:id', function(req, res) {
  db.users.update({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    role: req.body.role
  }, {
    where: {
      id: req.params['id']
    }
  })
})

app.listen(3000, function(){
  console.log("Server Started localhost:3000");
})
