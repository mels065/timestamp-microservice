const request = require('supertest');
const express = require('express');

describe('server routing', function () {
  let server;
  beforeEach(() => {
    delete require.cache[require.resolve('../app')];
    server = require('../app');
  });

  afterEach((done) => {
    server.close(done);
  })

  it('responds', function serverTest (done) {
    request(server)
      .get('/')
      .expect(200, done);
  });

  it('responds to /:timestamp', function timestampTest (done) {
    request(server)
      .get('/December 4, 1988')
      .expect(200, done);
  });

  it('responds to 404 with anything else', function notFoundTest (done) {
    request(server)
      .get('/December 4, 1988/hello')
      .expect(404, done);
  });
});
