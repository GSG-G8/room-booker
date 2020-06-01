/* eslint-disable no-undef */
const connection = require('../src/database/config/connection');
const dbBuild = require('../src/database/config/build');
const {
  checkEmail,
  deleteUserById,
  addNewRoom,
  getRoom,
  deleteBookingById,
  getBookingbydate,
  getUserById,
  activateUser,
  makeAdmin,
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
  deleteUserById('3').then((result) => {
    expect(result.rowCount).toBe(1);
  }));

test('deleteBookingById query', () =>
  deleteBookingById('1').then((result) => {
    expect(result.rowCount).toBe(1);
  }));

test('test getBookingbydate query to get the booked room at specific date', () =>
  getBookingbydate('2020-04-14').then(({ rows }) => {
    expect(rows.length).toBe(5);
    expect(rows[0].title).toBe('meeting');
  }));

test('test getUserById', () =>
  getUserById('1').then(({ rows }) => {
    expect(rows.length).toBe(1);
    expect(rows[0].email).toBe('lina@gazaskygeeks.com');
  }));

test('test getUserById', () =>
  getUserById('-1').then(({ rows }) => {
    expect(rows.length).toBe(0);
  }));

test('activate user query', () =>
  activateUser(4, true)
    .then((result) => {
      expect(result.rowCount).toBe(1);
    })
    .then(() => getUserById(4))
    .then(({ rows }) => expect(rows[0].is_active).toBe(true)));

test('active admin query', () =>
  makeAdmin(4, true)
    .then((result) => {
      expect(result.rowCount).toBe(1);
    })
    .then(() => getUserById(4))
    .then(({ rows }) => expect(rows[0].is_admin).toBe(true)));

afterAll(() => connection.end());
