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



  app.get('/restados', (req, res, next) => {

    options.repository.getEstados().then((domotica) => {
      res.status(200).send(domotica.map((estado) => { return {
            servouno: estado.servouno,
            servodos: estado.servodos,
            motor: estado.motor,
            led: estado.led
        };
      }));
    })
    .catch(next);

  });



  app.post('/eestados', (req, res) => {

    var servouno = req.query.servouno;
    var servodos = req.query.servodos;
    var motor = req.query.motor;
    var led = req.query.led;

    console.log(servouno + " - " + servodos + " - " + motor + " - "+ led);

    options.repository.setEstados(servouno, servodos, motor, led).then((domotica) => {
      res.status(200).send("El estado se ha recibido");
    })

  });



  app.get('/rlcd', (req, res, next) => {

    options.repository.getLcd().then((domotica) => {
      res.status(200).send(domotica.map((lcd) => { return {
            textouno: lcd.textouno,
            textodos: lcd.textodos
        };
      }));
    })
    .catch(next);

  });



  app.post('/elcd', (req, res) => {

    var textouno = req.query.textouno;
    var textodos = req.query.textodos;

    console.log(textouno + " - "+textodos);

    options.repository.setLcd(textouno, textodos).then((domotica) => {
      res.status(200).send("El sensor se ha recibido");
    })

  });


  app.get('/reporte', (req, res, next) => {

    options.repository.getReporte().then((domotica) => {
      res.status(200).send(domotica.map((sensor) => { return {
          temperatura: sensor.temperatura,
          fotoresistor: sensor.fotoresistor,
          pir: sensor.pi
        };
      }));
    })
    .catch(next);

  });

};
