var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var app = express();
var config = require('./config');



MongoClient.connect(config.mongo.url, function(err, db) {
    if (err) {
        throw "Mongo connection error error: " + err;
    }
    console.log("Connected to mongo."); 

    app.use(function (req, res, next) {
        console.log(Date.now().toString(), req.method, req.url);
        res.setHeader('Content-Type', 'application/json');
        next();
    });

    app.get('/', function (req, res) {
        res.send(JSON.stringify({"hello": "world"}));
    });

    app.get('/nearby', function(req, res) {
        var lat = parseFloat(req.query.lat);
        var lng = parseFloat(req.query.lng);
        var range = parseInt(req.query.range);

        var trains = db.collection("trains");
        trains.find({current_location: {
            "$near": {
                "$geometry": {type: "Point", coordinates: [lng, lat]},
                "$maxDistance": range
            }
        }}, function(err, res) {
            if (err) {
                res.send(JSON.stringify({err:"Database error.", details:err.toString()));
                return;
            }
            res.send(JSON.stringify(res));
        });

    });

    var server = app.listen(3000, function () {
        var host = server.address().address;
        var port = server.address().port;

        console.log('Example app listening at http://%s:%s', host, port)
    });


});

