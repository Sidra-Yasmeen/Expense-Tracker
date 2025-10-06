const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const { type } = req.query;
    let sql = 'SELECT * FROM transactions ORDER BY date DESC, id DESC';
    const params = [];
    if (type && (type === 'income' || type === 'expense')) {
      sql = 'SELECT * FROM transactions WHERE type = ? ORDER BY date DESC, id DESC';
      params.push(type);
    }
    const [rows] = await db.query(sql, params);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { type, amount, category, note, date } = req.body;
    if (!type || !amount || !date) {
      return res.status(400).json({ error: 'type, amount and date are required' });
    }
    const [result] = await db.query('INSERT INTO transactions (type, amount, category, note, date) VALUES (?, ?, ?, ?, ?)', [type, amount, category || null, note || null, date]);
    const [rows] = await db.query('SELECT * FROM transactions WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { type, amount, category, note, date } = req.body;
    await db.query('UPDATE transactions SET type = ?, amount = ?, category = ?, note = ?, date = ? WHERE id = ?', [type, amount, category, note, date, id]);
    const [rows] = await db.query('SELECT * FROM transactions WHERE id = ?', [id]);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM transactions WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
