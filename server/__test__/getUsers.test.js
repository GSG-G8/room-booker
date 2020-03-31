const request = require('supertest');
const app = require('../src/app');

describe('GET /getUsers', () => {
  it('responds with json, array', (done) => {
    request(app)
      .get('/api/v1/getUsers')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(Array.isArray(res.body)).toBe(true);
        return done();
      });
  });
});
