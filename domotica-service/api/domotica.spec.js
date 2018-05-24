var request = require('supertest');
var should = require('should');
var server = require('../server/server');

describe('Domotica API', () => {

  // Nuestra aplicación en ejecución (reconstruida para cada prueba) y nuestro repositorio, que
  // podemos simular para cada prueba.
  var app = null;
  var testDomotica = [{
      temperatura: '24',
      motor: 'off'
    }, {
      temperatura: '27',
      motor: 'on'
    }
  ];
  var testRepo = {
    getDomotica: () => { 
      return Promise.resolve(testDomotica);
    }
  };
  
  beforeEach(() => {
    return server.start({
      port: 1234,
      repository: testRepo
    }).then(function (svr) {
      app = svr;
    });
  });

  afterEach(() => {
    app.close();
    app = null;
  });

  it('puede devolver a todos los usuarios', (done) => {

    request(app)
      .get('/domotica')
      .expect(function(res) {
        res.body.should.containEql({
          temperatura: '22',
          motor: 'off'
        });
      res.body.should.containEql({
          temperatura: '23',
          motor: 'on'
        });
      })
      .expect(200, done);

  });

  it('devuelve un 404 para un usuario desconocido', (done) => {

    request(app)
      .get('/search?email=barnie@thegumbles.com')
      .expect(404, done);
  });

  it('devuelve 200 para un usuario conocido', (done) => {

    request(app)
      .get('/search?email=homer@thesimpsons.com')
      .expect(200, done);
  });

});
