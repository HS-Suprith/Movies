import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const { Pool } = pg;

let sslConfig = { rejectUnauthorized: true };
if (process.env.DATABASE_CA_PATH) {
  try {
    sslConfig = {
      rejectUnauthorized: true,
      ca: fs.readFileSync(path.resolve(process.env.DATABASE_CA_PATH)).toString(),
    };
  } catch (e) {
    console.warn('CA file not found, using default SSL');
  }
}

const pool = new Pool({
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  database: process.env.DATABASE_NAME || 'defaultdb',
  ssl: sslConfig,
});

export async function initDb() {
  try {
    const client = await pool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          password_hash VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('Database initialized successfully');
    } catch (err) {
      console.error('Database init error:', err.message);
      throw err;
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('❌ Database connection failed!');
    console.error('Error details:', err.message);
    console.error('\nPlease check your .env file has correct Aiven credentials:');
    console.error('  - DATABASE_HOST');
    console.error('  - DATABASE_PORT');
    console.error('  - DATABASE_USER');
    console.error('  - DATABASE_PASSWORD');
    console.error('  - DATABASE_NAME');
    console.error('  - DATABASE_CA_PATH (if required)\n');
    throw err;
  }
}

export default pool;
