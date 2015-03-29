var http = require('http');
var stations = [{
    "name": "York",
    "time": "18:59",
    "service": "Virgin Trains East Coast",
    "location" : {
               "lat" : 53.95798,
               "lng" : -1.09319
            }
},
{
    "name": "London Kings Cross",
    "time": "22:55",
    "service": "Tube",
    "location" : {
               "lat" : 51.53088,
               "lng" : -0.1229
            }
},
{
    "name": "London Waterloo",
    "time": "21:54",
    "service": "South West Trains",
    "location" : {
               "lat" : 51.5033,
               "lng" : -0.11475
            }
  },
  {"time": "22:03",
  "name": "Clapham Junction",
  "service": "South West Trains",
  },
  {"time": "22:28",
  "name": "Woking (Main)",
  "service": "South West Trains",
  "location" : {
               "lat" : 51.316774,
               "lng" : -0.5600349
            }},
  {"time": "22:48",
  "name": "Basingstoke",
  "service": "South West Trains"},
  {"time": "22:58",
  "name": "Micheldever",
  "service": "South West Trains"},
  {"time": "23:08",
  "name": "Winchester",
  "service": "South West Trains",  "location" : {
               "lat" : 51.0672,
               "lng" : -1.31969
            }},
  {"time": "23:22",
  "name": "Eastleigh",
  "service": "South West Trains"},
  {"time": "23:27",
  "name": "Southampton Airport Parkway",
  "service": "South West Trains"},
  {"time": "23:34",
  "name": "Southampton Central",
  "service": "",
  "location" : {
               "lat" : 50.9077164,
               "lng" : -1.413564
            }}];

var j = 0;
for (var i in stations) {
  var station = stations[i].name;
  var addr = "http://maps.googleapis.com/maps/api/geocode/json?address="+encodeURIComponent(station)+"+train+station&sensor=false&key=AIzaSyCdc5DkZRdPBjFrn_XysBhj1Ntx_JzZK-s";
  http.get(addr, function(r) {
    var resp = r.read();
    for (var k in resp) {
      console.log(k);
    }
        resp = JSON.parse(resp.body)[0];

    console.log("Done ", stations[i].name);
    stations[i].location = resp.location;
    j++;
    if (j == stations.length) {
      console.log(stations);
    }
  });
};
