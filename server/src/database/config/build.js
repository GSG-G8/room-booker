const { readFileSync } = require('fs');
const { join } = require('path');

const connection = require('./connection');

const dbBuild = () => {
  const dbFile = readFileSync(join(__dirname, 'build.sql')).toString();
  return connection.query(dbFile);
};

module.exports = dbBuild;
