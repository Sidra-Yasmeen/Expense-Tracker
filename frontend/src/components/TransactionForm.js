import React, { useState } from 'react';

const today = new Date().toISOString().slice(0,10);

export default function TransactionForm({ onSave, initial }) {
  const [type, setType] = useState(initial?.type || 'expense');
  const [amount, setAmount] = useState(initial?.amount || '');
  const [category, setCategory] = useState(initial?.category || '');
  const [note, setNote] = useState(initial?.note || '');
  const [date, setDate] = useState(initial?.date || today);

  const submit = (e) => {
    e.preventDefault();
    if (!amount || !date) return alert('Amount and date are required');
    onSave({ type, amount: Number(amount), category, note, date });
    // reset
    setAmount(''); setCategory(''); setNote('');
  };

  return (
    <form onSubmit={submit}>
      <div className="mb-2">
        <label className="form-label">Type</label>
        <select className="form-select" value={type} onChange={e=>setType(e.target.value)}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>
      <div className="mb-2">
        <label className="form-label">Amount</label>
        <input className="form-control" value={amount} onChange={e=>setAmount(e.target.value)} type="number" step="0.01" />
      </div>
      <div className="mb-2">
        <label className="form-label">Category</label>
        <input className="form-control" value={category} onChange={e=>setCategory(e.target.value)} />
      </div>
      <div className="mb-2">
        <label className="form-label">Note</label>
        <input className="form-control" value={note} onChange={e=>setNote(e.target.value)} />
      </div>
      <div className="mb-2">
        <label className="form-label">Date</label>
        <input className="form-control" type="date" value={date} onChange={e=>setDate(e.target.value)} />
      </div>
      <button className="btn btn-primary w-100" type="submit">Save</button>
    </form>
  );
}
