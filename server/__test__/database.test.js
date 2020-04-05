/* eslint-disable no-undef */
const connection = require('../src/database/config/connection');
const dbBuild = require('../src/database/config/build');
const {
  checkEmail,
  deleteUser,
  addNewRoom,
  getRoom,
  deleteBookingById,
  getBookingbydate,
} = require('../src/database/queries');

beforeEach(() => dbBuild());

test('testing checkemail query so it expect to return the row from userbooking by the email given', () =>
  checkEmail('lina@gazaskygeeks.com').then((result) => {
    const { password, name } = result.rows[0];
    expect(password).toEqual(
      '$2b$10$lT17vapkQ4VF1BRSMnfSDuHTfdO7wCCnhVwpeyZklQcNkicGQiz/C'
    );
    expect(name).toEqual('Lina');
  }));

test('test get room query to get the row by given name', () =>
  getRoom('Tokyo').then((result) => {
    const { name } = result.rows[0];
    expect(name).toEqual('Tokyo');
  }));

test('add room query', () =>
  addNewRoom('Cairo')
    .then(() => getRoom('Cairo'))
    .then((result) => {
      const { name } = result.rows[0];
      expect(name).toEqual('Cairo');
    }));

test('deleteUserById query', () =>
  deleteUser('3').then((result) => {
    expect(result.rowCount).toBe(1);
  }));

test('deleteBookingById query', () =>
  deleteBookingById('1').then((result) => {
    expect(result.rowCount).toBe(1);
  }));

test('test getBookingbydate query to get the booked room at specific date', () =>
  getBookingbydate('2020-04-05').then(({ rows }) => {
    expect(rows.length).toBe(4);
    expect(rows[0].description).toBe('meeting');
  }));
afterAll(() => connection.end());
