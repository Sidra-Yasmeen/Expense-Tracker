import React, { useState } from 'react';
import TransactionForm from './TransactionForm';

export default function TransactionList({ transactions, onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null);

  return (
    <div>
      <h5>Transactions</h5>
      {transactions.length === 0 && <p>No transactions yet.</p>}
      <div className="list-group">
        {transactions.map(t => (
          <div key={t.id} className="list-group-item d-flex justify-content-between align-items-start">
            <div>
              <div className="fw-bold">{t.category || (t.type === 'income' ? 'Income' : 'Expense')}</div>
              <div className="small">{t.note}</div>
              <div className="small text-muted">{new Date(t.date).toLocaleDateString()}</div>
            </div>
            <div className="text-end">
              <div className={t.type === 'income' ? 'text-success' : 'text-danger'}>pkr {Number(t.amount).toFixed(2)}</div>
              <div className="btn-group mt-2">
                <button className="btn btn-sm btn-outline-secondary" onClick={()=> setEditingId(editingId === t.id ? null : t.id)}>Edit</button>
                <button className="btn btn-sm btn-outline-danger" onClick={()=> { if(confirm('Delete this?')) onDelete(t.id); }}>Delete</button>
              </div>
            </div>
            {editingId === t.id && (
              <div className="w-100 mt-2">
                <TransactionForm initial={t} onSave={(data)=> { onUpdate(t.id, data); setEditingId(null); }} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
