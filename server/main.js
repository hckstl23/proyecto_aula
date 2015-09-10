/*jslint node: true */
'use strict';


var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router = express.Router();


var routes = require('./routes');

var app = express();

var routePregunta = require('./routes/routePregunta');
var routePreguntaestudiante = require('./routes/routePreguntaestudiante');



// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join('.', 'app/model')));

console.log(". = ", '.');
console.log("__dirname = ", path.resolve(__dirname));

app.get('/api/awesomeThings', routes.awesomeThings);

//CRUD Pregunta
app.post('/api/pregunta/guardar', routePregunta.create);
app.get('/api/pregunta', routePregunta.listarPreguntas);
app.post('/api/pregunta/eliminar', routePregunta.delete);
app.post('/api/pregunta/editar/', routePregunta.update);

//CRUD Preguntaestudiante
app.post('/api/preguntaestudiante/guardar', routePreguntaestudiante.create);
app.get('/api/preguntaestudiante', routePreguntaestudiante.listarPreguntas);
app.post('/api/preguntaestudiante/eliminar', routePreguntaestudiante.delete);
app.post('/api/preguntaestudiante/editar/', routePreguntaestudiante.update);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
module.exports = app;
