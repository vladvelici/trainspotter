var Stomp = require('stomp-client');
var fetch_train = require('./fetchers/train.js');
var config = require('./config');
var MongoClient = require('mongodb').MongoClient;

var client = new Stomp(config.stomp.url,
            config.stomp.port,
            config.stomp.user,
            config.stomp.pass);

MongoClient.connect(config.mongo.url, function(err, db) {
    console.log("Connected to mongo.");

    client.connect(function(sid) {
        console.log("Stomp connected. Session ID: ", sid);
        fetch_train.init(client, db);
        client.on("disconnect", function() {
            fetch_train.disconnected();
        });
    });

});
