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
          motor: sensor.motor
        };
      }));
    })
    .catch(next);

  });

  app.post('/enviar', (req, res) => {
    
    options.repository.setDomotica('21','off').then((domotica) => {
      console.log(req.body);
      res.send(200, {message: 'El sensor se ah recibido'});
    })

  });

};
