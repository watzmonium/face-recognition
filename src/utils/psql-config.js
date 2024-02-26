import config from './config'
import pg from 'pg';
const Pool = pg.Pool;

const pool = new Pool({
  user: config.PSQL_USERNAME,
  password: config.PSQL_PW,
  host: config.PSQL_HOST,
  database: config.PSQL_DB,
});

module.exports = pool;
