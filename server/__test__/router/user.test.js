/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../src/app');
const dbBuild = require('../../src/database/config/build');
const connection = require('../../src/database/config/connection.js');
const { getUserById } = require('../../src/database/queries');

beforeEach(() => dbBuild());

test('activate user route /users/:id', (done) => {
  request(app)
    .patch('/api/v1/users/4')
    .set({
      'Content-Type': 'application/json',
    })
    .set('Cookie', [
      'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjIsInJvbGUiOnRydWUsInVzZXJuYW1lIjoiSW1hZCIsImlhdCI6MTU5MDkyMTI0M30.NorLKiqhAW3T8h1N2TdK8ZZx2tkQZj157lz0GxQSHwI',
    ])
    .send(JSON.stringify({ active: true }))
    .expect(200)
    .end((err) => {
      if (err) return done(err);
      getUserById(4).then(({ rows }) => expect(rows[0].is_active).toBe(true));
      return done();
    });
});

test('GET /profile with Check not Active user', (done) => {
  request(app)
    .get('/api/v1/profile')
    .set('Content-Type', 'application/json')
    .expect(401)
    .expect('Content-type', /json/)
    .end((err) => {
      if (err) return done(err);
      return done();
    });
});

test('GET /profile with Check Active user', (done) => {
  request(app)
    .get('/api/v1/profile')
    .set('Content-Type', 'application/json')
    .set('Cookie', [
      'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjIsInJvbGUiOnRydWUsInVzZXJuYW1lIjoiSW1hZCIsImlhdCI6MTU5MDkyMTI0M30.NorLKiqhAW3T8h1N2TdK8ZZx2tkQZj157lz0GxQSHwI',
    ])
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) return done(err);

      const data = res.body;
      expect(data.id).toBe(2);
      expect(data.name).toBe('Imad');
      expect(data.email).toBe('amoodaa@gazaskygeeks.com');
      expect(data.is_admin).toBeTruthy();
      expect(data.is_active).toBeTruthy();

      return done();
    });
});

test('GET /profile, logged in user valid request ', (done) => {
  request(app)
    .patch('/api/v1/profile')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Cookie', [
      'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjIsInJvbGUiOnRydWUsInVzZXJuYW1lIjoiSW1hZCIsImlhdCI6MTU5MDkyMTI0M30.NorLKiqhAW3T8h1N2TdK8ZZx2tkQZj157lz0GxQSHwI',
    ])
    .send({
      name: 'Imad2',
      oldPassword: '123456',
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

test('GET /profile, logged in user invalid password', (done) => {
  request(app)
    .patch('/api/v1/profile')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Cookie', [
      'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjIsInJvbGUiOnRydWUsInVzZXJuYW1lIjoiSW1hZCIsImlhdCI6MTU5MDkyMTI0M30.NorLKiqhAW3T8h1N2TdK8ZZx2tkQZj157lz0GxQSHwI',
    ])
    .send({
      name: 'Imad2',
      oldPassword: '123456',
      password: 'qwe',
    })
    .expect('Content-Type', /json/)
    .expect(400)
    .end((err) => {
      if (err) return done(err);
      return done();
    });
});

test('GET /profile, logged in user, name is required', (done) => {
  request(app)
    .patch('/api/v1/profile')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Cookie', [
      'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjIsInJvbGUiOnRydWUsInVzZXJuYW1lIjoiSW1hZCIsImlhdCI6MTU5MDkyMTI0M30.NorLKiqhAW3T8h1N2TdK8ZZx2tkQZj157lz0GxQSHwI',
    ])
    .send({
      oldPassword: '123456',
      password: '12345678',
    })
    .expect('Content-Type', /json/)
    .expect(400)
    .end((err) => {
      if (err) return done(err);
      return done();
    });
});

test('GET /profile, user does not exists', (done) => {
  request(app)
    .patch('/api/v1/profile')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Cookie', [
      'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOi0xLCJyb2xlIjpmYWxzZSwiaWF0IjoxNTg2MDg2MzAyfQ.tPi_QBtUkUlpbg0nXH94bwkOaDZCOj6WLRCZLyTMK8Q',
    ])
    .send({
      name: 'Imad2',
      oldPassword: '123456',
      password: '123456',
    })
    .expect('Content-Type', /json/)
    .expect(404)
    .end((err) => {
      if (err) return done(err);
      return done();
    });
});

test('GET /profile, Unauthorized user', (done) => {
  request(app)
    .patch('/api/v1/profile')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .send({
      name: 'Imad2',
      oldPassword: '123456',
      password: '12345678',
    })
    .expect('Content-Type', /json/)
    .expect(401)
    .end((err) => {
      if (err) return done(err);
      return done();
    });
});

test('delete user by id 3 ', (done) => {
  request(app)
    .delete('/api/v1/users/3')
    .set({
      'Content-Type': 'application/json',
    })
    .set('Cookie', [
      'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjIsInJvbGUiOnRydWUsInVzZXJuYW1lIjoiSW1hZCIsImlhdCI6MTU5MDkyMTI0M30.NorLKiqhAW3T8h1N2TdK8ZZx2tkQZj157lz0GxQSHwI',
    ])
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) return done(err);
      expect(res.body.msg).toBe('The user has delete successfully');
      return done();
    });
});

test('GET /users, admin user, responds with json array ', (done) => {
  request(app)
    .get('/api/v1/users')
    .set('Accept', 'application/json')
    .set('Cookie', [
      'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjIsInJvbGUiOnRydWUsInVzZXJuYW1lIjoiSW1hZCIsImlhdCI6MTU5MDkyMTI0M30.NorLKiqhAW3T8h1N2TdK8ZZx2tkQZj157lz0GxQSHwI',
    ])
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      expect(Array.isArray(res.body)).toBe(true);
      return done();
    });
});

test('GET /users, normal user ', (done) => {
  request(app)
    .get('/api/v1/users')
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
