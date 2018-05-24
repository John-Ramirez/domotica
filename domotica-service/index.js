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