var Stomp = require('stomp-client');
var config = require('./config');

var client = new Stomp(config.stomp.url,
            config.stomp.port,
            config.stomp.user,
            config.stomp.pass);

var movement = "/topic/TRAIN_MVT_ALL_TOC";

client.connect(function(sid) {
    console.log("Stomp connected. Session ID: ", sid);
        client.subscribe("/topic/SCHEDULE", function(body, headers) {
            console.log(body);
            throw "done";
        });
});

