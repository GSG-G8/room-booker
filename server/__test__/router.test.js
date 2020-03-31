/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../src/app');

test('login endpoint with correct data', (done) => {
  request(app)
    .post('/api/v1/login')
    .set({
      'Content-Type': 'application/json',
    })
    .send(
      JSON.stringify({ email: 'lina@gazaskygeeks.com', password: '123456' })
    )
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) return done(err);
      expect(res.body).toBe('good job');
      return done();
    });
});

test('login endpoint with wrong password', (done) => {
  request(app)
    .post('/api/v1/login')
    .set({
      'Content-Type': 'application/json',
    })
    .send(
      JSON.stringify({ email: 'lina@gazaskygeeks.com', password: '1234567' })
    )
    .expect(401)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) return done(err);
      expect(res.body.message).toBe('invalid password');
      return done();
    });
});
