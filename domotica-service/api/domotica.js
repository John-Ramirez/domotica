//  users.js
//
// Define la API de los sensores. Agregar a un servidor llamando:
// require ('./ domotica')
'use strict';

//  Solo exportar: agrega la API a la aplicación con las opciones dadas.
module.exports = (app, options) => {

  app.get('/recibir', (req, res, next) => {

    options.repository.getDomotica().then((domotica) => {

      var temp = 0;
      var motor = 0;

      domotica.map((sensor) => { return {
          temp = sensor.temperatura,
          motor = sensor.motor
          };
      })

      res.status(200).send(
        '<html><body>'+temp+'</html></body>'
      );

    })
    .catch(next);

  });

  app.post('/enviar', (req, res) => {

    var temperatura = req.query.temperatura;
    var motor = req.query.motor;

    console.log(temperatura + " - "+motor);

    options.repository.setDomotica(temperatura, motor).then((domotica) => {
      res.status(200).send("El sensor se ha recibido");
    })

  });

};
