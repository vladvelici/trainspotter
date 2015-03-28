var Stomp = require('stomp-client');
var fetch_train = require('./fetchers/train.js');
var config = require('./config');

var client = new Stomp(config.stomp.url,
            config.stomp.port,
            config.stomp.user,
            config.stomp.pass);

client.connect(function(sid) {
    console.log("Stomp connected. Session ID: ", sid);
    fetch_train.init(client);
    client.on("disconnect", function() {
        fetch_train.disconnected();
    });
});

