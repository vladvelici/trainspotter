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
        console.log(new Date().toISOString(), req.method, req.url);
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
            res.end();
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
                res.send(JSON.stringify({err:"arrivals error", details: error.toString() }));
                return;
            }

            res.send(JSON.stringify(data));
        });
    });

    app.get('/my_journey', function(req, res) {
        var lat = parseFloat(req.query.lat);
        var lng = parseFloat(req.query.lng);

        var journey = {
            stations: [{
                "name": "York",
                "time": "18:59",
                "service": "Virgin Trains East Coast",
                "location" : {
                           "lat" : 53.95798,
                           "lng" : -1.09319
                        }
            },
            {
                "name": "London Kings Cross",
                "time": "22:55",
                "service": "Tube",
                "location" : {
                           "lat" : 51.53088,
                           "lng" : -0.1229
                        }
            },
            {
                "name": "London Waterloo",
                "time": "21:54",
                "service": "South West Trains",
                "location" : {
                           "lat" : 51.5033,
                           "lng" : -0.11475
                        }
              },
              {"time": "22:03",
              "name": "Clapham Junction",
              "service": "South West Trains",
              },
              {"time": "22:28",
              "name": "Woking (Main)",
              "service": "South West Trains",
              "location" : {
                           "lat" : 51.316774,
                           "lng" : -0.5600349
                        }},
              {"time": "22:48",
              "name": "Basingstoke",
              "service": "South West Trains"},
              {"time": "22:58",
              "name": "Micheldever",
              "service": "South West Trains"},
              {"time": "23:08",
              "name": "Winchester",
              "service": "South West Trains",  "location" : {
                           "lat" : 51.0672,
                           "lng" : -1.31969
                        }},
              {"time": "23:22",
              "name": "Eastleigh",
              "service": "South West Trains"},
              {"time": "23:27",
              "name": "Southampton Airport Parkway",
              "service": "South West Trains"},
              {"time": "23:34",
              "name": "Southampton Central",
              "service": "",
              "location" : {
                           "lat" : 50.9077164,
                           "lng" : -1.413564
                        }}],
            "total_length":"4h 35m"
        };

        res.send(JSON.stringify(journey));
        res.end();
    });

    app.get('/departures/:CRS/:MAX', function (req, res){
        fetcher_board.departures(req.params.CRS, req.params.MAX, function(error, data){
            if(error){
                res.send(JSON.stringify({err:"departures error", details: error.toString() }));
                return;
            }

            res.send(JSON.stringify(data));
        });
    });

    app.get('/arrivals_departures/:CRS/:MAX', function (req, res){
        fetcher_board.arrivals_departures(req.params.CRS, req.params.MAX, function(error, data){
            if(error){
                res.send(JSON.stringify({err:"arrivals departures error", details: error.toString() }));
                return;
            }

            res.send(JSON.stringify(data));
        });
    });

});
