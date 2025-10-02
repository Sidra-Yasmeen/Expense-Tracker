const express = require('express');
const cors = require('cors');
const db = require('./db');
const transactionsRouter = require('./routes/transactions');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/transactions', transactionsRouter);

app.get('/api/summary', async (req, res) => {
  try {
    const [incomeRows] = await db.query("SELECT IFNULL(SUM(amount),0) as total FROM transactions WHERE type = 'income'");
    const [expenseRows] = await db.query("SELECT IFNULL(SUM(amount),0) as total FROM transactions WHERE type = 'expense'");
    const income = Number(incomeRows[0].total);
    const expenses = Number(expenseRows[0].total);
    res.json({ income, expenses, balance: income - expenses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
