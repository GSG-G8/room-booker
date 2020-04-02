/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../src/app');
const dbBuild = require('../src/database/config/build');

const connection = require('../src/database/config/connection.js');

beforeEach(() => dbBuild());

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
    // eslint-disable-next-line no-unused-vars
    .end((err, res) => {
      if (err) return done(err);
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

test('/signup  with correct data', (done) => {
  request(app)
    .post('/api/v1/signUp')
    .set({
      'Content-Type': 'application/json',
    })
    .send(
      JSON.stringify({
        name: 'lina',
        email: 'lina123@gazaskygeeks.com',
        password: '123456',
        confirmpassword: '123456',
      })
    )
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) return done(err);
      expect(res.body.message).toBe('signed up successfully');
      return done();
    });
});

test('/signup with not valid email ', (done) => {
  request(app)
    .post('/api/v1/signup')
    .set({
      'Content-Type': 'application/json',
    })
    .send(
      JSON.stringify({
        name: 'lina',
        email: 'lina@gaza.com',
        password: '123456',
        confirmpassword: '123456',
      })
    )
    .expect(400)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) return done(err);
      expect(res.body.message).toBe(
        '"email" with value "lina@gaza.com" fails to match the required pattern: /(\\w*@gazaskygeeks.\\w*)/'
      );
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
      'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjIsInJvbGUiOnRydWUsImlhdCI6MTU4NTc2ODUyN30.RTKSH_6Jp-rl5bzYbAZ24OosxW-a8lVDac39fDr1u7E',
    ])
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) return done(err);
      expect(res.body.msg).toBe('The user has delete successfully');
      return done();
    });
});

test('delete booking by id "1" from admin ', (done) => {
  request(app)
    .delete('/api/v1/booking/1')
    .set({
      'Content-Type': 'application/json',
    })
    .set('Cookie', [
      'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjIsInJvbGUiOnRydWUsImlhdCI6MTU4NTg3MDgyMH0.DLsC4bCJB61TSmq9dX8wyposTZPUYIG1tDiui4Spo1g',
    ])
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) return done(err);
      expect(res.body.msg).toBe('The Booking has delete successfully');
      return done();
    });
});

test('delete booking by id 1 from un authorized user ', (done) => {
  request(app)
    .delete('/api/v1/booking/1')
    .set({
      'Content-Type': 'application/json',
    })
    .expect(401)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) return done(err);
      expect(res.body.message).toBe('Unauthorized');
      return done();
    });
});

test('rooms endpoint with existing room name', (done) => {
  request(app)
    .post('/api/v1/rooms')
    .set({
      'Content-Type': 'application/json',
    })
    .set('Cookie', [
      'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjIsInJvbGUiOnRydWUsImlhdCI6MTU4NTgxNTc1MX0.SpdrsYcfCym_CIgCM4nocmHMULnF0yVx2DzkoMRFFqM',
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
      'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjIsInJvbGUiOnRydWUsImlhdCI6MTU4NTgxNTc1MX0.SpdrsYcfCym_CIgCM4nocmHMULnF0yVx2DzkoMRFFqM',
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
