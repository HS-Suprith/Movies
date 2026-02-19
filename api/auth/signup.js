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
    const hash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, created_at',
      [email.trim().toLowerCase(), hash]
    );
    const user = result.rows[0];
    res.status(201).json({ user: { id: user.id, email: user.email } });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Email already registered' });
    }
    res.status(500).json({ error: err.message || 'Signup failed' });
  }
}
