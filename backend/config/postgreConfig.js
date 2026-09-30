import { Pool } from "pg";
import { DB_URL } from './env.js';

// PostgreSQL connection
const poolPg = new Pool({
  connectionString: DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});


export default poolPg