/* eslint-disable no-undef */
const connection = require('../../src/database/config/connection');
const dbBuild = require('../../src/database/config/build');
const {
  deleteBookingById,
  getBookingbydate,
} = require('../../src/database/queries');

beforeEach(() => dbBuild());

test('deleteBookingById query', () =>
  deleteBookingById('1').then((result) => {
    expect(result.rowCount).toBe(1);
  }));

test('test getBookingbydate query to get the booked room at specific date', () =>
  getBookingbydate('2020-04-14').then(({ rows }) => {
    expect(rows.length).toBe(5);
    expect(rows[0].title).toBe('meeting');
  }));

afterAll(() => connection.end());
