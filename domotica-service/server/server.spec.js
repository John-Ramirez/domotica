var request = require('supertest');
var should = require('should');
var server = require('./server');


describe('Server', () => {

  it('debería requerir un puerto para comenzar', () => {
    return server.start({
      repository: {}
    }).should.be.rejectedWith(/port/);
  });

  it('debería requerir un repositorio para comenzar', () => {
    return server.start({
      port: {}
    }).should.be.rejectedWith(/repository/);
  });

});
