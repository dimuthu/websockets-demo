var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

server.listen(3000);

app.get('/', function (req, res) {
  res.render('index', { title: 'Tracker' });
});

io.on('connection', function (socket) {
  socket.on('write_coordianates', function (data) {
    socket.broadcast.emit('write_coordianates', data);
  });
});
