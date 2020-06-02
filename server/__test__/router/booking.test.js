/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../src/app');
const dbBuild = require('../../src/database/config/build');
const connection = require('../../src/database/config/connection.js');

beforeEach(() => dbBuild());

test('make new booking no overlapping', (done) => {
  request(app)
    .post('/api/v1/booking')
    .set({
      'Content-Type': 'application/json',
    })
    .set('Cookie', [
      'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjIsInJvbGUiOnRydWUsInVzZXJuYW1lIjoiSW1hZCIsImlhdCI6MTU5MDkyMTI0M30.NorLKiqhAW3T8h1N2TdK8ZZx2tkQZj157lz0GxQSHwI',
    ])
    .send(
      JSON.stringify({
        roomId: 1,
        title: 'Meeting',
        remindMe: false,
        description: 'New Meeting',
        time: [
          {
            startTime: '2021-04-14 12:00:00',
            endTime: '2021-04-14 14:00:00',
          },
        ],
      })
    )
    .expect(201)
    .end((err) => {
      if (err) return done(err);
      return done();
    });
});

test('make new booking no overlapping between 2021-04-14 14:30:00-2021-04-14 16:00:00 ', (done) => {
  request(app)
    .post('/api/v1/booking')
    .set({
      'Content-Type': 'application/json',
    })
    .set('Cookie', [
      'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjIsInJvbGUiOnRydWUsInVzZXJuYW1lIjoiSW1hZCIsImlhdCI6MTU5MDkyMTI0M30.NorLKiqhAW3T8h1N2TdK8ZZx2tkQZj157lz0GxQSHwI',
    ])
    .send(
      JSON.stringify({
        roomId: 1,
        title: 'Meeting',
        remindMe: false,
        description: 'New Meeting',
        time: [
          {
            startTime: '2021-04-14 14:30:00',
            endTime: '2021-04-14 16:00:00',
          },
        ],
      })
    )
    .expect(201)
    .end((err) => {
      if (err) return done(err);
      return done();
    });
});

test('make new booking no overlapping between 2021-04-13 14:30:00-2021-04-13 16:00:00 ', (done) => {
  request(app)
    .post('/api/v1/booking')
    .set({
      'Content-Type': 'application/json',
    })
    .set('Cookie', [
      'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjIsInJvbGUiOnRydWUsInVzZXJuYW1lIjoiSW1hZCIsImlhdCI6MTU5MDkyMTI0M30.NorLKiqhAW3T8h1N2TdK8ZZx2tkQZj157lz0GxQSHwI',
    ])
    .send(
      JSON.stringify({
        roomId: 1,
        title: 'Meeting',
        remindMe: false,
        description: 'New Meeting',
        time: [
          {
            startTime: '2021-04-13 14:30:00',
            endTime: '2021-04-13 16:00:00',
          },
        ],
      })
    )
    .expect(201)
    .end((err) => {
      if (err) return done(err);
      return done();
    });
});

test('make new booking with overlapping between 2020-04-14 16:00:00-2020-04-14 16:30:00  ', (done) => {
  request(app)
    .post('/api/v1/booking')
    .set({
      'Content-Type': 'application/json',
    })
    .set('Cookie', [
      'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjIsInJvbGUiOnRydWUsInVzZXJuYW1lIjoiSW1hZCIsImlhdCI6MTU5MDkyMTI0M30.NorLKiqhAW3T8h1N2TdK8ZZx2tkQZj157lz0GxQSHwI',
    ])
    .send(
      JSON.stringify({
        roomId: 1,
        title: 'Meeting',
        remindMe: false,
        description: 'New Meeting',
        time: [
          {
            startTime: '2020-04-14 16:00:00',
            endTime: '2020-04-14 16:30:00',
          },
        ],
      })
    )
    .expect(400)
    .end((err) => {
      if (err) return done(err);
      return done();
    });
});

test('make new booking with overlapping between 2020-04-14 14:00:00-2020-04-14 15:00:00 ', (done) => {
  request(app)
    .post('/api/v1/booking')
    .set({
      'Content-Type': 'application/json',
    })
    .set('Cookie', [
      'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjIsInJvbGUiOnRydWUsInVzZXJuYW1lIjoiSW1hZCIsImlhdCI6MTU5MDkyMTI0M30.NorLKiqhAW3T8h1N2TdK8ZZx2tkQZj157lz0GxQSHwI',
    ])
    .send(
      JSON.stringify({
        roomId: 1,
        title: 'Meeting',
        remindMe: false,
        description: 'New Meeting',
        time: [
          {
            startTime: '2020-04-14 14:00:00',
            endTime: '2020-04-14 15:00:00',
          },
        ],
      })
    )
    .expect(400)
    .end((err) => {
      if (err) return done(err);
      return done();
    });
});

test('make new booking with overlapping', (done) => {
  request(app)
    .post('/api/v1/booking')
    .set({
      'Content-Type': 'application/json',
    })
    .set('Cookie', [
      'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjIsInJvbGUiOnRydWUsInVzZXJuYW1lIjoiSW1hZCIsImlhdCI6MTU5MDkyMTI0M30.NorLKiqhAW3T8h1N2TdK8ZZx2tkQZj157lz0GxQSHwI',
    ])
    .send(
      JSON.stringify({
        roomId: 1,
        title: 'Meeting',
        remindMe: false,
        description: 'New Meeting',
        time: [
          {
            startTime: '2020-04-14 14:00:00',
            endTime: '2020-04-14 16:00:00',
          },
        ],
      })
    )
    .expect(400)
    .end((err) => {
      if (err) return done(err);
      return done();
    });
});

test('make new booking with expire date ', (done) => {
  request(app)
    .post('/api/v1/booking')
    .set({
      'Content-Type': 'application/json',
    })
    .set('Cookie', [
      'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjIsInJvbGUiOnRydWUsInVzZXJuYW1lIjoiSW1hZCIsImlhdCI6MTU5MDkyMTI0M30.NorLKiqhAW3T8h1N2TdK8ZZx2tkQZj157lz0GxQSHwI',
    ])
    .send(
      JSON.stringify({
        roomId: 1,
        title: 'Meeting',
        remindMe: false,
        description: 'New Meeting',
        time: [
          {
            startTime: '2020-04-04 14:00:00',
            endTime: '2020-04-04 16:00:00',
          },
        ],
      })
    )
    .expect(400)
    .end((err) => {
      if (err) return done(err);
      return done();
    });
});
test('test for when the user inputs intersecting times ', (done) => {
  request(app)
    .post('/api/v1/booking')
    .set({
      'Content-Type': 'application/json',
    })
    .set('Cookie', [
      'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjIsInJvbGUiOnRydWUsInVzZXJuYW1lIjoiSW1hZCIsImlhdCI6MTU5MDkyMTI0M30.NorLKiqhAW3T8h1N2TdK8ZZx2tkQZj157lz0GxQSHwI',
    ])
    .send(
      JSON.stringify({
        roomId: 1,
        title: 'Meeting',
        remindMe: false,
        description: 'New Meeting',
        time: [
          {
            startTime: '2020-04-13 14:30:00',
            endTime: '2020-04-13 16:00:00',
          },
          {
            startTime: '2020-04-13 15:00:00',
            endTime: '2020-04-13 16:00:00',
          },
          {
            startTime: '2020-04-13 15:30:00',
            endTime: '2020-04-13 16:00:00',
          },
        ],
      })
    )
    .expect(400)
    .end((err) => {
      if (err) return done(err);
      return done();
    });
});

test('test for 100%  valid input ', (done) => {
  request(app)
    .post('/api/v1/booking')
    .set({
      'Content-Type': 'application/json',
    })
    .set('Cookie', [
      'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjIsInJvbGUiOnRydWUsInVzZXJuYW1lIjoiSW1hZCIsImlhdCI6MTU5MDkyMTI0M30.NorLKiqhAW3T8h1N2TdK8ZZx2tkQZj157lz0GxQSHwI',
    ])
    .send(
      JSON.stringify({
        roomId: 1,
        title: 'Meeting',
        remindMe: false,
        description: 'New Meeting',
        time: [
          {
            startTime: '2021-04-13 12:00:00',
            endTime: '2021-04-13 12:30:00',
          },
          {
            startTime: '2021-04-13 01:00:00',
            endTime: '2021-04-13 02:00:00',
          },
          {
            startTime: '2021-04-13 15:30:00',
            endTime: '2021-04-13 16:00:00',
          },
        ],
      })
    )
    .expect(201)
    .end((err) => {
      if (err) return done(err);
      return done();
    });
});

test('GET /booking/:date with date have not room booked', (done) => {
  request(app)
    .get('/api/v1/booking/2020-04-07')
    .set({
      'Content-Type': 'application/json',
    })
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
test('GET /booking/:date with date have room booked', (done) => {
  request(app)
    .get('/api/v1/booking/2020-04-14')
    .set({
      'Content-Type': 'application/json',
    })
    .set('Cookie', [
      'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjIsInJvbGUiOnRydWUsInVzZXJuYW1lIjoiSW1hZCIsImlhdCI6MTU5MDkyMTI0M30.NorLKiqhAW3T8h1N2TdK8ZZx2tkQZj157lz0GxQSHwI',
    ])
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body[0].start_time).toBe('2020-04-14T06:00:00.000Z');
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

afterAll(() => connection.end());
