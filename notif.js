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

app.get('/', function(req,res) {
  res.sendFile(__dirname+'/notif.html');
});

app.get('/nomad_logo.png', function(req,res) {
  res.sendFile(__dirname+"/nomad_logo.png");
})

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on("connected", function(data){
    console.log("connected client");
  });
  socket.on("broadcast_notif", function(data) {
      console.log("Sending event", data.ev, data);
      socket.broadcast.emit(data.ev, data);
  });
  socket.on("disconnect", function() {
    console.log("someone disconnected");
  });
});

http.listen(3003, function() {
  console.log('listening on *:3003');
});
