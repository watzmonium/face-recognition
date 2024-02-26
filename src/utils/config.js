import 'dotenv/config';

const PORT = process.env.PORT;
const API_KEYS = process.env.API_KEYS;
const PSQL_DB = process.env.PSQL_DB
const PSQL_HOST = process.env.PSQL_HOST
const PSQL_USERNAME = process.env.PSQL_USERNAME;
const PSQL_PW = process.env.PSQL_PW;

export default { PORT, API_KEYS, PSQL_DB, PSQL_HOST, PSQL_USERNAME, PSQL_PW };
