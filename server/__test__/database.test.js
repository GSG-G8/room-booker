/* eslint-disable no-undef */
const connection = require('../src/database/config/connection');
const dbBuild = require('../src/database/config/build');
const { checkEmail } = require('../src/database/queries');

beforeAll(() => dbBuild());

test('testing checkemail query so it expect to return the row from userbooking by the email given', () =>
  checkEmail('lina@gazaskygeeks.com').then((result) => {
    const { password, name } = result.rows[0];
    expect(password).toEqual(
      '$2b$10$lT17vapkQ4VF1BRSMnfSDuHTfdO7wCCnhVwpeyZklQcNkicGQiz/C'
    );
    expect(name).toEqual('Lina');
  }));

afterAll(() => connection.end());
