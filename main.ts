var express = require('express')
var app = express()

var conn = require('./dbConnect.js')

//res.send('Hello World')

//GET /incidents 
app.get('/incidents', function (req, res) {
  conn.query('select * from incidents where userId=1', { model: incident}).then(rows => {
    conn.query('select * from incidentRevisions where incidentId='+rows.id+' and revisionNumber='+rows.revisionId, {model: incidentRevision}).then(incidentrow => {
      console.log(incidentrow)
    })
  })
  conn.query('select * from incidents where trackerId=1', { model: incident}).then(rows => {
    conn.query('select * from incidentRevisions where incidentId='+rows.id+' and revisionNumber='+rows.revisionId, {model: incidentRevision}).then(incidentrow => {
      console.log(incidentrow)
    })
  })
})
 
//POST /incidents
app.post('/incidents', function (req, res) {
  //conn.query('insert into incidents (revisionId, userId, trackerId) values (1, 1, 2)')
  //conn.query('insert into incidents (incidentId, revisionNumber, timestamp, type, shortDescription, longDescription, resolution, severity) values (1, 1, "2018-02-02 12:13:00", "technical", "Got Hacked", "")')
})



app.listen(3000, function(){
  console.log("Server Started localhost:3000");
})
