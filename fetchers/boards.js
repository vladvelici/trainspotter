var sys = require('sys');
var exec = require('child_process').exec;
var child;

var arrivals = function(CRS, MAX, callback){
    var res = CRS.match(/^[A-Z]{3}$/);
    if (res === null) { callback("Nope.", null); return; }
    CRS = res[0];
    exec('php ./fetchers/lib/arrivals.php '+CRS+' '+parseInt(MAX), function(error, stdout, stderr){
        if(error != null){ 
            return callback(error, null);
        }
        
        callback(null, JSON.parse(stdout));
    });
};

var departures = function(CRS, MAX, callback){
    var res = CRS.match(/^[A-Z]{3}$/);
    if (res === null) { callback("Nope.", null); return; }
    CRS = res[0];
    exec('php ./fetchers/lib/departures.php '+CRS+' '+parseInt(MAX), function(error, stdout, stderr){
        if(error){ 
            return callback(error, null);
        }
        
        callback(null, JSON.parse(stdout));
    });
};

var arrivals_departures = function(CRS, MAX, callback){
    var res = CRS.match(/^[A-Z]{3}$/);
    if (res === null) { callback("Nope.", null); return; }
    CRS = res[0];
    exec('php ./fetchers/lib/arrival_departure.php '+CRS+' '+parseInt(MAX), function(error, stdout, stderr){
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




