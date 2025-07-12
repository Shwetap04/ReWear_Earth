const express = require('express');
const router = express.Router();
const db = require('../db');

// Request a swap
router.post('/', (req, res) => {
  const { item_id, requester_id, swap_type } = req.body;

  const sql = `
    INSERT INTO swaps (item_id, requester_id, swap_type)
    VALUES (?, ?, ?)
  `;

  db.run(sql, [item_id, requester_id, swap_type], function (err) {
    if (err) {
      console.error('Error creating swap:', err.message);
      return res.status(500).json({ error: 'Failed to create swap' });
    }
    res.json({ message: 'Swap request created ✅', swap_id: this.lastID });
  });
});

// Get all swaps
router.get('/', (req, res) => {
  const sql = `
    SELECT s.*, i.title AS item_title
    FROM swaps s
    JOIN items i ON s.item_id = i.id
    ORDER BY s.created_at DESC
  `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error fetching swaps:', err.message);
      return res.status(500).json({ error: 'Failed to fetch swaps' });
    }
    res.json(rows);
  });
});

module.exports = router;
