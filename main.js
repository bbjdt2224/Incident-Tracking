var express = require('express');
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var db = require('./models/index.js');
//GET /incidents 
app.get('/incidents', function (req, res) {
    var incidentarr = [];
    db.incidents.findAll({
        where: {
            userId: 1
        }
    }).then(function (incidents) {
        incidents.forEach(function (incident) {
            db.incidentrevisions.findOne({
                where: {
                    incidentId: incident.id,
                    revisionNumber: incident.revisionId
                }
            }).then(function (revision) {
                incidentarr.push(revision.shortDescription);
            });
        });
    });
    res.send(incidentarr);
});
//POST /incidents
app.post('/incidents', function (req, res) {
    db.incidents.create({
        revisionId: 1,
        userId: req.body.userId,
        trackerId: req.body.trackerId
    });
    db.incidentrevisions.create({
        incidentId: req.body.incidentId,
        revisionNumber: '1',
        type: req.body.type,
        shortDescription: req.body.shortDescription,
        longDescription: req.body.longDescription
    });
    res.send("Done");
});
//GET /incident/(id)
app.get('/incident/:id', function (req, res) {
    db.incidents.findById(req.params['id']).then(function (incident) {
        db.incidentrevisions.findOne({
            where: {
                incidentId: incident.id,
                revisionNumber: incident.revisionId
            }
        }).then(function (revision) {
            res.send(revision);
        });
    });
});
app.put('/incident/:id', function (req, res) {
    var pastRevision;
    db.incidents.findById(req.params['id']).then(function (incident) {
        db.incidentrevisions.findOne({
            where: {
                incidentId: incident.id,
                revisionNumber: incident.revisionId
            }
        }).then(function (revision) {
            pastRevision = revision;
        });
    });
    db.incidentrevisions.create({
        revisionNumber: pastRevision.revisionNumber + 1,
        type: req.body.type,
        shortDescription: req.body.shortDescription,
        longDescription: req.body.longDescription
    });
    db.incidents.update({
        revisionId: pastRevision.revisionNumber + 1,
        trackerId: req.body.trackerId
    }, {
        where: {
            id: req.params['id']
        }
    });
});
app.post('/signup', function (req, res) {
    db.users.create({
        email: req.body.email
        //password
    });
});
app.post('/login', function (req, res) {
    db.users.findOne({
        where: {
            email: req.body.email
        }
    }).then(function (user) {
        //check if password is same as in database
    });
});
app.post('/logout', function (req, res) {
});
app.put('/incident/:id', function (req, res) {
    db.users.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: req.body.role
    }, {
        where: {
            id: req.params['id']
        }
    });
});
app.listen(3000, function () {
    console.log("Server Started localhost:3000");
});
