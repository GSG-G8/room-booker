require('env2')('./config.env');

const { Pool } = require('pg');

let dbUrl = '';

if (process.env.NODE_ENV === 'test') {
  dbUrl = process.env.TEST_DB_URL;
} else if (process.env.NODE_ENV === 'production') {
  dbUrl = process.env.DATABASE_URL;
} else {
  dbUrl = process.env.DB_URL;
}

// eslint-disable-next-line no-console
console.log({
  dbUrl,
  POSTGRES_PORT: process.env.POSTGRES_PORT,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
});

if (!(dbUrl || process.env.POSTGRES_PORT || process.env.POSTGRES_HOST))
  throw new Error('No Database FOUND');

const options = dbUrl
  ? {
      connectionString: dbUrl,
      ssl: true,
    }
  : {
      user: 'postgres',
      database: 'postgres',
      password: 'postgres',
      port: process.env.POSTGRES_PORT,
      host: process.env.POSTGRES_HOST,
    };

module.exports = new Pool(options);
