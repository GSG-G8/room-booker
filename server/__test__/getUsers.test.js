/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../src/app');
const dbBuild = require('../src/database/config/build');

const connection = require('../src/database/config/connection.js');

beforeAll(() => dbBuild());

test('GET /getUsers, admin user, responds with json array ', (done) => {
  request(app)
    .get('/api/v1/getUsers')
    .set('Accept', 'application/json')
    .set('Cookie', [
      'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjIsInJvbGUiOnRydWUsImlhdCI6MTU4NTc1Njk3OH0.KslFtCQbzhtakHYZU_q1Pid-QuLlEMRwJ3dCWKG4lDk',
    ])
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      expect(Array.isArray(res.body)).toBe(true);
      return done();
    });
});

test('GET /getUsers, normal user ', (done) => {
  request(app)
    .get('/api/v1/getUsers')
    .set('Accept', 'application/json')
    .set('Cookie', [
      'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEsInJvbGUiOmZhbHNlLCJpYXQiOjE1ODU3NTc0MTd9.kuihES127CG-8PdqEFlVJo1TYYlwBv_S5c4OR_rXhzY',
    ])
    .expect('Content-Type', /json/)
    .expect(403)
    .end((err) => {
      if (err) return done(err);
      return done();
    });
});

afterAll(() => connection.end());
