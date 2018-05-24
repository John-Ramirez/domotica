var should = require('should');
var repository = require('./repository');

describe('Repository', () => {

  it('debe conectarse con una promesa', () => {
    repository.connect().should.be.a.Promise();
  });

  it('debe lanzar una excepción si no se crea con un host, nombre de usuario, contraseña y puerto', () => {
    
    //  Recuerde: si va a probar una promesa sin 'hecho', ¡asegúrese de * devolver * una promesa!
    return Promise.all([
      repository.connect({
        //host: 'localhost',
        user: 'dave',
        password: 123,
        port: 3306
        }).should.be.rejectedWith(/host/),

      repository.connect({
        host: 'localhost',
        // user: 'dave',
        password: 123,
        port: 3306
        }).should.be.rejectedWith(/user/),

      repository.connect({
        host: 'localhost',
        user: 'dave',
        // password: 123,
        port: 3306
        }).should.be.rejectedWith(/password/),

      repository.connect({
        host: 'localhost',
        user: 'dave',
        password: 123,
        // port: 3306
        }).should.be.rejectedWith(/port/),

      ]);
  });
  
});
