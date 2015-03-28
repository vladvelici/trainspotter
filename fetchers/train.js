"use strict";

// Fetch train data, make it sane and store it in mongo.

var movement_topic = "/topic/TRAIN_MVT_ALL_TOC";

var tr = {

    db: null,

    init: function(client, mongo) {
        client.subscribe(movement_topic, tr.process);
        tr.db = mongo;
    },

    disconnected: function() {
    },

    process: function(body, headers) {
        var allobj = JSON.parse(body);
        for (var i in allobj) {
            var h = allobj[i].header;
            var r = allobj[i].body;
            if (h.msg_type == "0001") {
                tr.activation(r);
            } else if (h.msg_type == "0003") {
                tr.movement(r);
            } else {
                console.log("something else");
            }
        }
    },

    activation: function(train) {
        console.log("Got activation for ", train.train_id);
        db.trains.insert();
    },

    movement: function(train) {
        console.log("Got movement for ", train.train_id);
    }
    
};

module.exports = tr; 
