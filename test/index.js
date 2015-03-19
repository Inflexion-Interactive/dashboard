var request = require('supertest'),
    mocha = require('mocha'),
    app = require('./../lib/index');

describe('Request to root', function() {
  it('Returns 200 status code', function(done) {

    request(app)
      .get('/')
      .expect(200)
      .end(function(error) {
        if (error) throw error;
        done();
      });
  });
});

