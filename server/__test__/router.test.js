/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../src/app');
const dbBuild = require('../src/database/config/build');

const connection = require('../src/database/config/connection.js');

beforeAll(() => dbBuild());

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
afterAll(() => connection.end());
