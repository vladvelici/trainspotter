"use strict";

// Fetch train data, make it sane and store it in mongo.

var movement_topic = "/topic/TRAIN_MVT_ALL_TOC";

var tr = {

    init: function(client) {
        client.subscribe(movement_topic, tr.process);
    },

    disconnected: function() {
    },

    process: function(body, headers) {
        console.log("got data");
    }

};

module.exports = tr; 
