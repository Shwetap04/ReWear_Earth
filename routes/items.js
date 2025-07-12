const express = require('express');
const router = express.Router();
const db = require('../db');

// Add item
router.post('/', (req, res) => {
  const {
    user_id,
    title,
    description,
    category,
    type,
    size,
    condition,
    tags,
    image_url
  } = req.body;

  const sql = `
    INSERT INTO items (user_id, title, description, category, type, size, condition, tags, image_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [user_id, title, description, category, type, size, condition, tags, image_url];

  db.run(sql, values, function (err) {
    if (err) {
      console.error('Error inserting item:', err.message);
      return res.status(500).json({ error: 'Failed to add item' });
    }
    res.json({ message: 'Item added successfully ✅', item_id: this.lastID });
  });
});

// Get all items
router.get('/', (req, res) => {
  db.all('SELECT * FROM items ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      console.error('Error fetching items:', err.message);
      return res.status(500).json({ error: 'Failed to fetch items' });
    }
    res.json(rows);
  });
});

module.exports = router;
