const express = require('express');
const router = express.Router();
const db = require('../db');

// Sign up user
router.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  const sql = `
    INSERT INTO users (name, email, password)
    VALUES (?, ?, ?)
  `;

  db.run(sql, [name, email, password], function (err) {
    if (err) {
      if (err.message.includes('UNIQUE')) {
        return res.status(409).json({ error: 'Email already registered' });
      }
      return res.status(500).json({ error: 'Signup failed' });
    }

    res.status(201).json({ message: 'User registered ✅', user_id: this.lastID });
  });
});

// Login user
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const sql = `
    SELECT * FROM users WHERE email = ? AND password = ?
  `;

  db.get(sql, [email, password], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Login failed' });
    }
    if (!row) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.json({
      message: 'Login successful ✅',
      user_id: row.id,
      name: row.name,
      email: row.email,
      points: row.points,
      is_admin: row.is_admin
    });
  });
});

module.exports = router;
