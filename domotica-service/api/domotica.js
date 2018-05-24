//  users.js
//
//  Defines the users api. Add to a server by calling:
//  require('./users')
'use strict';

//  Only export - adds the API to the app with the given options.
module.exports = (app, options) => {

  app.get('/temperatura', (req, res, next) => {
    options.repository.getDomotica().then((users) => {
      res.status(200).send(users.map((sensor) => { return {
          temperatura: sensor.temperatura,
          motor: sensor.motor
        };
      }));
    })
    .catch(next);
  });
};
