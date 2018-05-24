// index.js
//
// Punto de entrada a la aplicación. Abre un repositorio en MySQL
// servidor e inicia el servidor.
var server = require('./server/server');
var repository = require('./repository/repository');
var config = require('./config/config');

//  Muchos registros detallados cuando estamos comenzando ...
console.log("--- Servicio Cliente---");
console.log("Conectándose al repositorio del cliente...");

//  Registre las excepciones no controladas.
process.on('uncaughtException', function(err) {
  console.error('Excepción no detectada', err);
});
process.on('unhandledRejection', function(err, promise){
  console.error('Rechazo no controlado', err);
});

repository.connect({
  host: config.db.host,
  database: config.db.database,
  user: config.db.user,
  password: config.db.password,
  port: config.db.port
}).then((repo) => {
  console.log("Conectado. Servidor de inicior...");

  return server.start({
    port: config.port,
    repository: repo
  });

}).then((app) => {
  console.log("El servidor se inició correctamente y se ejecuta en el puerto " + config.port + ".");
  app.on('close', () => {
    repository.disconnect();
  });
});
