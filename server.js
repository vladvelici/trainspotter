var Stomp = require('stomp-client');
var config = require('./config');

var client = new Stomp(config.stomp.url,
            config.stomp.port,
            config.stomp.user,
            config.stomp.pass);
    try {

client.connect(function(sid) {
    console.log("Stomp connected. Session ID: ", sid);
        client.subscribe("RTPPM_ALL", function(body, headers) {
            console.log("Recv message");
            console.log("=== Headers. ===");
            console.log(headers);
            console.log("=== Body. ===");
            console.log(body);
        });
});

    } catch(e) {
        console.log("Could not subscribe to RTPPM_ALL. ", e);
    }

