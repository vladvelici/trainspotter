var sys = require('sys');
var exec = require('child_process').exec;
var child;

var arrivals = function(CRS, MAX, callback){
    exec('php lib/arrivals.php '+CRS+' '+MAX, function(error, stdout, stderr){
        if(error != null){ 
            return callback(error, null);
        }
        
        callback(null, JSON.parse(stdout));
    });
};

var departures = function(CRS, MAX, callback){
    exec('php lib/departures.php '+CRS+' '+MAX, function(error, stdout, stderr){
        if(error != null){ 
            return callback(error, null);
        }
        
        callback(null, JSON.parse(stdout));
    });
};

var arrivals_departures = function(CRS, MAX, callback){
    exec('php lib/arrival_departure.php '+CRS+' '+MAX, function(error, stdout, stderr){
        if(error != null){ 
            return callback(error, null);
        }

        callback(null, JSON.parse(stdout));
    });
}

module.exports = {
    arrivals:arrivals,
    departures:departures,
    arrivals_departures:arrivals_departures
}




