var request = require('supertest'),
    mocha = require('mocha'),
    app = require('./../lib/index');

describe('Request to root', function() {

  it('Returns 200 status code', function(done) {

    request(app)
      .get('/')
      .expect(200, done)

  });
});

describe('Request to Google Analytics', function() {

  it('Returns 200', function(done) {

    request(app)
      .get('/google')
      .expect(200, done)

  });

  it('Returns json content', function(done) {

    request(app)
      .get('/google')
      .expect('Content-Type', /json/, done);

  });

  it('Returns a payload', function(done) {

    request(app)
      .get('/google')
      .expect(JSON.stringify({ status: 'ok' }), done);

  });
});

