"use strict";

var convertor = require("../convertor");

// Fetch train data, make it sane and store it in mongo.

var movement_topic = "/topic/TRAIN_MVT_ALL_TOC";

var tr = {

    db: null,
    col: null,

    init: function(client, mongo) {
        client.subscribe(movement_topic, tr.process);
        tr.db = mongo;
        tr.col = tr.db.collection("trains");
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
            } else if (h.msg_type == "0007"){
                console.log("something else", h);
            }
        }
    },

    activation: function(train) {
        train = fixtrain(train);
        if (train === undefined) { return; }
        tr.col.update({"train_id": train.train_id}, train, {upsert:true});
        console.log("Got activation for ", train.train_id);
    },

    movement: function(train) {
        train = fixtrain(train);
        if (train === undefined) { return; }
        tr.col.update({"train_id": train.train_id}, train, {upsert:true});
        console.log("Got movement for ", train.train_id);
    },

    idchange: function(train) {
        console.log("Got ID change...");
        tr.col.update({"train_id": train.current_train_id}, {"train_id": train.revised_train_id});
    }
    
};

function fixtrain(train) {
    var latlng = convertor.stanox_to_latlng(train.loc_stanox);

    if (latlng === undefined) { 
        return undefined;
    }

    train.current_location = {type: "Point", coordinates: [latlng.lng, latlng.lat]};
    train.train_terminated = train.train_terminated == "true";

    if (train.actual_timestamp != "") {
        train.actual_timestamp = new Date(parseInt(train.actual_timestamp));
    }

    if (train.gbtt_timestamp.length != "") {
        train.gbtt_timestamp = new Date(parseInt(train.gbtt_timestamp));
    }

    if (train.planned_timestamp != "") {
        train.planned_timestamp = new Date(parseInt(train.planned_timestamp));
    }

    return train;
}

module.exports = tr; 


