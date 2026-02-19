import bcrypt from 'bcryptjs';
import pool from '../db.js';
import { initDb } from '../db.js';

// Initialize DB on first request
let dbInitialized = false;
const initPromise = initDb().then(() => {
  dbInitialized = true;
}).catch(() => {
  dbInitialized = false;
});

export default async function handler(req, res) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Ensure DB is initialized
  if (!dbInitialized) {
    await initPromise;
  }

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
    const result = await pool.query(
      'SELECT id, email, password_hash FROM users WHERE email = $1',
      [email.trim().toLowerCase()]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    res.json({ user: { id: user.id, email: user.email }, success: true });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Signin failed' });
  }
}
