//  repository.js
//
// Expone una sola función - 'connect', que regresa
// un repositorio conectado. Llamar 'desconectar' en este objeto cuando haya terminado.
'use strict';

var mysql = require('mysql');

// Clase que contiene una conexión abierta a un repositorio
// y expone algunas funciones simples para acceder a los datos.
class Repository {
  constructor(connection) {
    this.connection = connection;
  }

  getDomotica() {
    return new Promise((resolve, reject) => {

      this.connection.query('SELECT temperatura, fotoresistor, pir FROM sensores order by id DESC LIMIT 1', (err, results) => {
        if(err) {
          return reject(new Error('Se produjo un error al obtener los sensores: ' + err));
        }

        resolve((results || []).map((sensor) => {
          return {
            temperatura: sensor.temperatura,
            fotoresistor: sensor.fotoresistor,
            pir: sensor.pir
          };
        }));
      });

    });
  }

  setDomotica(temperatura, fotoresistor, pir){
    return new Promise((resolve, reject) => {
      this.connection.query("INSERT INTO sensores (temperatura, fotoresistor, pir) VALUES ('"+temperatura+"', '"+fotoresistor+"', '"+pir+"')", (err, results) => {
        if(err) {
          return reject(new Error('Se produjo un error al guardar los sensores: ' + err));
        }
        console.log("1 registro domotica insertado");

        return true;
      });
    });
  }

  setEstados(servouno, servodos, motor, led, boton){
    return new Promise((resolve, reject) => {
      this.connection.query("INSERT INTO estados (servouno, servodos, motor, led, boton) VALUES ('"+servouno+"', '"+servodos+"', '"+motor+"', '"+led+"', '"+boton+"')", (err, results) => {
        if(err) {
          return reject(new Error('Se produjo un error al guardar los sensores: ' + err));
        }
        console.log("1 registro estado insertado");

        return true;
      });
    });
  }

  disconnect() {
    this.connection.end();
  }
}

//  Una y única función exportada, devuelve un repositorio conectado.
module.exports.connect = (connectionSettings) => {
  return new Promise((resolve, reject) => {
    if(!connectionSettings.host) throw new Error("Un host debe ser especificado.");
    if(!connectionSettings.user) throw new Error("Un usuario debe ser especificado.");
    if(!connectionSettings.password) throw new Error("Se debe especificar una contraseña.");
    if(!connectionSettings.port) throw new Error("Un puerto debe ser especificado.");

    resolve(new Repository(mysql.createConnection(connectionSettings)));
  });
};
