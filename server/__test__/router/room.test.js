/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../src/app');
const dbBuild = require('../../src/database/config/build');
const connection = require('../../src/database/config/connection.js');

beforeEach(() => dbBuild());

test('rooms endpoint with existing room name', (done) => {
  request(app)
    .post('/api/v1/rooms')
    .set({
      'Content-Type': 'application/json',
    })
    .set('Cookie', [
      'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjIsInJvbGUiOnRydWUsInVzZXJuYW1lIjoiSW1hZCIsImlhdCI6MTU5MDkyMTI0M30.NorLKiqhAW3T8h1N2TdK8ZZx2tkQZj157lz0GxQSHwI',
    ])
    .send(JSON.stringify({ name: 'Tokyo' }))
    .expect(400)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) return done(err);
      expect(res.body.message).toBe('Tokyo already exist');
      return done();
    });
});

test('Adding new room', (done) => {
  request(app)
    .post('/api/v1/rooms')
    .set({
      'Content-Type': 'application/json',
    })
    .send(JSON.stringify({ name: 'Cairo' }))
    .set('Cookie', [
      'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjIsInJvbGUiOnRydWUsInVzZXJuYW1lIjoiSW1hZCIsImlhdCI6MTU5MDkyMTI0M30.NorLKiqhAW3T8h1N2TdK8ZZx2tkQZj157lz0GxQSHwI',
    ])
    .expect(201)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) return done(err);
      expect(res.body).toBe('room added successfully');
      return done();
    });
});

afterAll(() => connection.end());
