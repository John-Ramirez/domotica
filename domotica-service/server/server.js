//  server.js

var express = require('express');
var morgan = require('morgan');

module.exports.start = (options) => {

  return new Promise((resolve, reject) => {

    //  Asegúrate de tener un repositorio y un puerto.
    if(!options.repository) throw new Error("Un servidor debe iniciarse con un repositorio conectado.");
    if(!options.port) throw new Error("Un servidor debe iniciarse con un puerto.");

    //  Crea la aplicación, agrega un poco de registro.
    var app = express();
    app.use(morgan('dev'));

    //  Agrega las API a la aplicación.
    require('../api/users')(app, options);

    //  Inicie la aplicación, creando un servidor en ejecución que devolvemos.
    var server = app.listen(options.port, () => {
      resolve(server);
    });

  });
};
