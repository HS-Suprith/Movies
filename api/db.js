import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const { Pool } = pg;

// For Vercel, CA cert comes as environment variable string, not file
// Vercel env vars may strip newlines - restore them from \n literals
let sslConfig = { rejectUnauthorized: true };

// Check DISABLE_SSL_VERIFY first - skip all cert verification
if (process.env.DISABLE_SSL_VERIFY === 'true') {
  sslConfig = {
    rejectUnauthorized: false,
    checkServerIdentity: () => undefined,
  };
} else if (process.env.DATABASE_CA_CERT) {
  let cert = process.env.DATABASE_CA_CERT;
  if (!cert.includes('\n') && cert.includes('\\n')) {
    cert = cert.replace(/\\n/g, '\n');
  }
  sslConfig = {
    rejectUnauthorized: true,
    ca: cert,
  };
} else if (process.env.DATABASE_CA_PATH) {
  // Local development: CA cert as file path
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
    throw err;
  }
}

export default pool;
