import dotenv from 'dotenv'

dotenv.config()

const POSTGRES_DB_DBNAME = process.env.POSTGRES_DB_DBNAME;
const POSTGRES_DB_ENTRY = process.env.POSTGRES_DB_ENTRY
const POSTGRES_DB_PORT = process.env.POSTGRES_DB_PORT;
const PORT = process.env.PORT;

export {
  POSTGRES_DB_DBNAME,
  POSTGRES_DB_PORT,
  POSTGRES_DB_ENTRY,
  PORT
}
