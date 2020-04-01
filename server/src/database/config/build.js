const { readFileSync } = require('fs');
const { join } = require('path');

const connection = require('./connection');

const dbBuild = () => {
  const dbFile = readFileSync(join(__dirname, 'build.sql')).toString();
  const fakeData = readFileSync(join(__dirname, 'fakedata.sql')).toString();

  return connection.query(dbFile).then(() => connection.query(fakeData));
};

module.exports = dbBuild;
