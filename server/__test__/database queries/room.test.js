/* eslint-disable no-undef */
const connection = require('../../src/database/config/connection');
const dbBuild = require('../../src/database/config/build');
const { addNewRoom, getRoom } = require('../../src/database/queries');

beforeEach(() => dbBuild());
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
afterAll(() => connection.end());
