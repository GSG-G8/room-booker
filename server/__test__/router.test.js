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

test('getProfile endpoint with Check Active user ', (done) => {
  request(app)
    .get('/api/v1/profile')
    .expect(200)
    .set('Cookie', [
      'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjIsInJvbGUiOnRydWUsImlhdCI6MTU4NTc2ODUyN30.RTKSH_6Jp-rl5bzYbAZ24OosxW-a8lVDac39fDr1u7E',
    ])
    .expect('Content-type', /json/)
    .end((err, res) => {
      if (err) return done(err);
      const { data } = res.body;
      expect(data.id).toBe(2);
      expect(data.name).toBe('Imad');
      expect(data.email).toBe('amoodaa@gazaskygeeks.com');
      expect(data.is_admin).toBeTruthy();
      expect(data.is_active).toBeTruthy();
      return done();
    });
});

test('getProfile endpoint with Check not Active user', (done) => {
  request(app)
    .get('/api/v1/getProfile')
    .set('Cookie', [
      'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjIsInJvbGUiOnRydWUsImlhdCI6MTU4NTc2ODUyN30.RTKSH_6Jp-rl5bzYbAZ24OosxW-a8lVDac39fDr1u7E',
    ])
    .expect(401)
    .expect('Content-type', /json/)
    .end((err, res) => {
      if (err) return done(err);
      const { data } = res.body;
      expect(data.id).toBe(2);
      expect(data.name).toBe('Imad');
      expect(data.email).toBe('amoodaa@gazaskygeeks.com');
      expect(data.is_admin).toBeFalsy();
      expect(data.is_active).toBeFalsy(); //  ('Imad', 'amoodaa@gazaskygeeks.com', True, True),
      return done();
    });
});
afterAll(() => connection.end());
