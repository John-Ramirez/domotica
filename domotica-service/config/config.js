//  config.js
//
//  Configuración simple de la aplicación. Extiende según sea necesario.
module.exports = {
	port: process.env.PORT || 8123,
  db: {
    host: process.env.DATABASE_HOST || '127.0.0.1',
    database: 'domotica',
    user: 'domotica_service',
    password: '123',
    port: 3306
  }
};
