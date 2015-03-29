var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/nomad', function(req, res){
  res.sendFile(__dirname+'/nomad.html');
});

app.get('/survey', function(req, res) {
  res.sendFile(__dirname+'/survey.html');
});

app.get("/bigfile", function(req, res) {
  res.sendFile(__dirname+"/bigpic.jpg")
});

app.get('/admin', function(req,res) {
  res.sendFile(__dirname+'/notif.html');
});

app.get('/', function(req, res) {
  res.sendFile(__dirname+"/dashboard.html");
})

app.get('/nomad_logo.png', function(req,res) {
  res.sendFile(__dirname+"/nomad_logo.png");
})

io.on('connection', function(socket){
  console.log('a user connected', socket.id);
  socket.on("connected", function(data){
    console.log("connected client", data);
  });
  socket.on("broadcast_notif", function(data) {
      console.log("Sending event", data.ev, data);
      socket.broadcast.emit(data.ev, data);
  });
  socket.on("disconnect", function() {
    console.log("someone disconnected", socket.id);
  });

  socket.on("broadcast_custom_notif", function(text, url) {
      console.log("Sending custom notif", text, url);
      socket.broadcast.emit("notif", text, url);
  });

});

http.listen(3003, function() {
  console.log('listening on *:3003');
});
