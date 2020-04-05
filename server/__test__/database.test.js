/* eslint-disable no-undef */
const connection = require('../src/database/config/connection');
const dbBuild = require('../src/database/config/build');
const {
  checkEmail,
  deleteUser,
  addNewRoom,
  getRoom,
  activeUser,
  activeAdmin,
  getUserById,
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

test('activate user query', () =>
  activeUser(4, true)
    .then((result) => {
      expect(result.rowCount).toBe(1);
    })
    .then(() => getUserById(4))
    .then(({ rows }) => expect(rows[0].is_active).toBe(true)));

test('active admin  query', () =>
  activeAdmin(4, true)
    .then((result) => {
      expect(result.rowCount).toBe(1);
    })
    .then(() => getUserById(4))
    .then(({ rows }) => expect(rows[0].is_admin).toBe(true)));

afterAll(() => connection.end());
