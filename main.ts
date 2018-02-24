var express = require('express')
var bodyParser = require("body-parser")
var app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var db = require('./models/index.js')

//res.send('Hello World')

//GET /incidents 
app.get('/incidents', function (req, res) {
  db.incidents.findAll({
    where: {
      userId: 1
    }
  }).then(incidents =>{
    incidents.forEach(element => {
      console.log(element.id)
    });
  })
})
 
//POST /incidents
app.post('/incidents', function (req, res) {
  const i = db.incidents.build({
    revisionId: req.body.revisionId,
    userId: req.body.userId,
    trackerId: req.body.trackerId
  })
  i.save()
  const ir = db.incidentrevisions.build({
    incidentId: req.body.incidentId,
    revisionNumebr: req.body.revisionNumber,
    timestamp: req.body.timestamp,
    type: req.body.type,
    shortDescription: req.body.shortDescription,
    longDescription: req.body.longDescription,
    resolution: req.body.resolution,
    severity: req.body.severity
  })
  ir.save()
})



app.listen(3000, function(){
  console.log("Server Started localhost:3000");
})
