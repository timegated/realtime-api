import Pool from 'pg-pool'
import { POSTGRES_DB_DBNAME, POSTGRES_DB_ENTRY, POSTGRES_DB_PORT } from './variables';

const pool2 = new Pool({
  database: POSTGRES_DB_DBNAME,
  user: 'postgres',
  password: POSTGRES_DB_ENTRY,
  port: POSTGRES_DB_PORT,
  ssl: true,
  max: 20,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 10000,
  maxUses: 7500
});

export { pool2 };