var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var app = express();
var config = require('./config');
var fetcher_board = require('./fetchers/boards.js');


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
        }}).toArray(function(err, objs) {
            if (err) {
                res.send(JSON.stringify({err:"Database error.", details: err.toString()}));
                return;
            }
            res.send(JSON.stringify(objs));
        });
    });

    var server = app.listen(3000, function () {
        var host = server.address().address;
        var port = server.address().port;

        console.log('Example app listening at http://%s:%s', host, port)
    });

    app.get('/arrivals/:CRS/:MAX', function (req, res){
        fetcher_board.arrivals(req.params.CRS, req.params.MAX, function(error, data){
            if(error){
                res.send(JSON.stringify({err:"arrivals error", details: err.toString() }));
                returnl
            }

            res.send(JSON.stringify(data));
        });
    });

    app.get('/departures/:CRS/:MAX', function (req, res){
        fetcher_board.departures(req.params.CRS, req.params.MAX, function(error, data){
            if(error){
                res.send(JSON.stringify({err:"departures error", details: err.toString() }));
                returnl
            }

            res.send(JSON.stringify(data));
        });
    });

    app.get('/arrivals_departures/:CRS/:MAX', function (req, res){
        fetcher_board.arrivals_departures(req.params.CRS, req.params.MAX, function(error, data){
            if(error){
                res.send(JSON.stringify({err:"arrivals departures error", details: err.toString() }));
                returnl
            }

            res.send(JSON.stringify(data));
        });
    });

});

