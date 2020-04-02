/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../src/app');
const dbBuild = require('../src/database/config/build');

const connection = require('../src/database/config/connection.js');

beforeAll(() => dbBuild());

test('GET /patchProfile, logged in user valid request ', (done) => {
  request(app)
    .patch('/api/v1/patchProfile')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Cookie', [
      'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjIsInJvbGUiOnRydWUsImlhdCI6MTU4NTc1Njk3OH0.KslFtCQbzhtakHYZU_q1Pid-QuLlEMRwJ3dCWKG4lDk',
    ])
    .send({
      name: 'Imad2',
      password: '12345678',
    })
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      expect(res.body).toBe(true);
      return done();
    });
});

test('GET /patchProfile, logged in user invalid password', (done) => {
  request(app)
    .patch('/api/v1/patchProfile')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Cookie', [
      'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjIsInJvbGUiOnRydWUsImlhdCI6MTU4NTc1Njk3OH0.KslFtCQbzhtakHYZU_q1Pid-QuLlEMRwJ3dCWKG4lDk',
    ])
    .send({
      name: 'Imad2',
      password: 'qwe',
    })
    .expect('Content-Type', /json/)
    .expect(400)
    .end((err) => {
      if (err) return done(err);
      return done();
    });
});

test('GET /patchProfile, logged in user, name is required', (done) => {
  request(app)
    .patch('/api/v1/patchProfile')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Cookie', [
      'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjIsInJvbGUiOnRydWUsImlhdCI6MTU4NTc1Njk3OH0.KslFtCQbzhtakHYZU_q1Pid-QuLlEMRwJ3dCWKG4lDk',
    ])
    .send({
      password: '12345678',
    })
    .expect('Content-Type', /json/)
    .expect(400)
    .end((err) => {
      if (err) return done(err);
      return done();
    });
});

test('GET /patchProfile, Unauthorized user', (done) => {
  request(app)
    .patch('/api/v1/patchProfile')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .send({
      name: 'Imad2',
      password: '12345678',
    })
    .expect('Content-Type', /json/)
    .expect(401)
    .end((err) => {
      if (err) return done(err);
      return done();
    });
});

afterAll(() => connection.end());
