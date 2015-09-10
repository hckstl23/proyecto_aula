/**
 * Created by hckstl on 6/9/15.
 */
(function() {
  var r = require('rethinkdb');

  var config = require('../config.js');

  r.connect( { host: config.rethinkdb.host, port: config.rethinkdb.port }, function(err, conn) {
    if (err) console.log(res);
    connection = conn;
    r.db(config.rethinkdb.db).tableCreate('pregunta').run(conn, function(err, res) {
      if(err) console.log("Table already exist. Skipping creation.");
      else {
        console.log(res);
      }
    });
  });

  exports.listarPreguntas = function(req, res) {
    try {
      r.db(config.rethinkdb.db).table('pregunta').run(connection, function (err, cursor) {
        if (err) console.log("Error al leer los datos de la tabla pregunta.");
        cursor.toArray(function (err, result) {
          if (err) console.log("Error en err cursor.toArray routePregunta/findAll");
          res.send(result);
          //res.json(result);
          console.log(result);
        });
      });
    }
    catch(e)
    {
      console.log("Error del try en routePregunta/findAll.");
    }
  };
  /*
   exports.findById = function(req, res) {
   var id = req.params.id;
   r.table('cruds').get(id).
   run(connection, function(err, result) {
   if (err) //throw err;
   res.send(JSON.stringify(result, null, 2));
   });
   };
   */
  exports.create = function(req, res) {
    try {
      var pregunta = req.query;
      console.log("pregunta ", JSON.stringify(req.query));
      r.db(config.rethinkdb.db).table('pregunta').insert(pregunta).
        run(connection, function (err, result) {
          if (err) console.log("Error en routePregunta/create if(err)");
          res.send(JSON.stringify({status: 'ok', location: '/cruds/' + result.generated_keys[0]}));
        });
    }
    catch(e){
      console.log("Error en routePregunta/create");
    }
  };

  exports.update = function(req, res) {
    try {
      var pregunta = req.query;
      r.db(config.rethinkdb.db).table('pregunta').get(pregunta.id).update(pregunta).
        run(connection, function (err, result) {
          if (err) console.log("Error en err routePregunta/update");
          res.send(JSON.stringify({status: 'ok'}));
        });
    }
    catch(e){
      console.log("Error en routePregunta/update");
    }
  };

  exports.delete = function(req, res) {
    try {
      var pregunta = req.query;
      console.log("Ingresó a routePregunta/delete");
      r.db(config.rethinkdb.db).table('pregunta').get(pregunta._id).delete().
        run(connection, function (err, result) {
          if (err) console.log("Error en err routePregunta/delete");
          //res.send(JSON.stringify({status: 'ok'}));
          res.send(result);
        });
    }
    catch(e){
      console.log("Error en routePregunta/delete");
    }
  };

})();
