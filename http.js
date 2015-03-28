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

    var server = app.listen(3000, function () {

      var host = server.address().address;
      var port = server.address().port;

      console.log('Example app listening at http://%s:%s', host, port)
    });

});

