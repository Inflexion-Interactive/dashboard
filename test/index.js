var request = require('supertest'),
    mocha = require('mocha'),
    app = require('./../lib/index');

describe('Request to root (/) route', function() {

  it('Returns 200 status code', function(done) {

    request(app)
      .get('/')
      .expect(200, done)

  });
});

describe('Request to /auth/google route', function() {

  it('Returns 302 status', function(done) {

    request(app)
      .get('/auth/google')
      .expect(302, done)

  });

  it('Returns a google auth location', function(done) {

    request(app)
      .get('/auth/google')
      .expect('Location', /google/, done)

  });

  it('Contains a proper callback url', function(done) {

    request(app)
      .get('/auth/google')
      .expect('Location', /oauth2callback/, done)

  });
});

describe('Request to /oauth2callback route', function() {

  it('Returns 200 status', function(done) {

    request(app)
      .get('/oauth2callback?code=123abc')
      .expect(200, done)

  });

/*
 *  it('Returns a payload of information', function(done) {
 *
 *    request(app)
 *      .get('/oauth2callback?code=123abc')
 *      .expect(/payload/, done)
 *
 *  });
 */
});
