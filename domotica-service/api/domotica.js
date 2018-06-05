//  users.js
//
// Define la API de los sensores. Agregar a un servidor llamando:
// require ('./ domotica')
'use strict';

//  Solo exportar: agrega la API a la aplicación con las opciones dadas.
module.exports = (app, options) => {

  app.get('/recibir', (req, res, next) => {

    options.repository.getDomotica().then((domotica) => {
      res.status(200).send(domotica.map((sensor) => { return {
          temperatura: sensor.temperatura,
          fotoresistor: sensor.fotoresistor,
          pir: sensor.pir
        };
      }));
    })
    .catch(next);

  });

  app.post('/enviar', (req, res) => {

    var temperatura = req.query.temperatura;
    var fotoresistor = req.query.fotoresistor;
    var pir = req.query.pir;

    console.log(temperatura + " - "+fotoresistor+ " - "+pir);

    options.repository.setDomotica(temperatura, fotoresistor, pir).then((domotica) => {
      res.status(200).send("El sensor se ha recibido");
    })

  });

};
