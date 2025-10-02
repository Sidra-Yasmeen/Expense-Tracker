import React, { useEffect, useState } from 'react';
import API from './api';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ income: 0, expenses: 0, balance: 0 });
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [tRes, sRes] = await Promise.all([
        API.get('/transactions'),
        API.get('/summary')
      ]);
      setTransactions(tRes.data);
      setSummary(sRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const addTransaction = async (data) => {
    try {
      await API.post('/transactions', data);
      await fetchAll();
    } catch (err) { 
      console.error(err);
    }
  };

  const updateTransaction = async (id, data) => {
    try {
      await API.put('/transactions/' + id, data);
      await fetchAll();
    } catch (err) { 
      console.error(err);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await API.delete('/transactions/' + id);
      await fetchAll();
    } catch (err) { 
      console.error(err);
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="app-container">
      {/* Background Elements */}
      <div className="background-elements">
        <div className="bg-circle bg-circle-1"></div>
        <div className="bg-circle bg-circle-2"></div>
        <div className="bg-circle bg-circle-3"></div>
      </div>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
        <div className="container">
          <div className="navbar-brand">
            <div className="logo-container">
              <div className="logo">
                <i className="fas fa-wallet"></i>
              </div>
              <div>
                <h1 className="logo-text">Expense Tracker</h1>
                <p className="logo-subtitle">Manage your finances efficiently</p>
              </div>
            </div>
          </div>
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#dashboard">
                  <i className="fas fa-home me-1"></i> Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#transactions">
                  <i className="fas fa-list me-1"></i> Transactions
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#reports">
                  <i className="fas fa-chart-bar me-1"></i> Reports
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Dashboard */}
      <main className="main-dashboard">
        <div className="container-fluid">
          {/* Dashboard Header */}
          <div className="dashboard-header">
            <div className="row align-items-center">
              <div className="col-md-6">
                <h2 className="dashboard-title">Financial Overview</h2>
                <p className="dashboard-subtitle">Track and manage your expenses with ease</p>
              </div>
              <div className="col-md-6 text-end">
                <div className="date-time">
                  <i className="far fa-calendar-alt me-2"></i>
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="summary-cards">
            <div className="row g-4">
              {/* Income Card */}
              <div className="col-md-4">
                <div className="summary-card income-card">
                  <div className="card-body">
                    <div className="card-top">
                      <div className="card-icon income-icon">
                        <i className="fas fa-arrow-up"></i>
                      </div>
                      <div className="card-menu">
                        <div className="dropdown">
                          <button className="btn btn-sm" type="button" data-bs-toggle="dropdown">
                            <i className="fas fa-ellipsis-v"></i>
                          </button>
                          <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">View Details</a></li>
                            <li><a className="dropdown-item" href="#">Export</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <h3 className="card-title">Income</h3>
                    <div className="card-amount">{formatCurrency(summary.income)}</div>
                    <div className="card-chart">
                      <div className="chart-bar" style={{ height: '40%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expense Card */}
              <div className="col-md-4">
                <div className="summary-card expense-card">
                  <div className="card-body">
                    <div className="card-top">
                      <div className="card-icon expense-icon">
                        <i className="fas fa-arrow-down"></i>
                      </div>
                      <div className="card-menu">
                        <div className="dropdown">
                          <button className="btn btn-sm" type="button" data-bs-toggle="dropdown">
                            <i className="fas fa-ellipsis-v"></i>
                          </button>
                          <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">View Details</a></li>
                            <li><a className="dropdown-item" href="#">Export</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <h3 className="card-title">Expenses</h3>
                    <div className="card-amount">{formatCurrency(summary.expenses)}</div>
                    <div className="card-chart">
                      <div className="chart-bar" style={{ height: '65%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Balance Card */}
              <div className="col-md-4">
                <div className="summary-card balance-card">
                  <div className="card-body">
                    <div className="card-top">
                      <div className="card-icon balance-icon">
                        <i className="fas fa-balance-scale"></i>
                      </div>
                      <div className="card-menu">
                        <div className="dropdown">
                          <button className="btn btn-sm" type="button" data-bs-toggle="dropdown">
                            <i className="fas fa-ellipsis-v"></i>
                          </button>
                          <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">View Details</a></li>
                            <li><a className="dropdown-item" href="#">Export</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <h3 className="card-title">Balance</h3>
                    <div className={`card-amount ${summary.balance >= 0 ? 'positive' : 'negative'}`}>
                      {formatCurrency(summary.balance)}
                    </div>
                    <div className="card-chart">
                      <div className="chart-bar" style={{ height: '30%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="main-content">
            <div className="row">
              {/* Add Transaction Form */}
              <div className="col-lg-4">
                <div className="content-card add-transaction-card">
                  <div className="card-header">
                    <h4 className="card-title">
                      <i className="fas fa-plus-circle me-2"></i>
                      Add Transaction
                    </h4>
                  </div>
                  <div className="card-body">
                    <TransactionForm onSave={addTransaction} />
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="content-card quick-stats-card mt-4">
                  <div className="card-header">
                    <h4 className="card-title">
                      <i className="fas fa-chart-pie me-2"></i>
                      Quick Stats
                    </h4>
                  </div>
                  <div className="card-body">
                    <div className="stats-grid">
                      <div className="stat-item">
                        <div className="stat-value">{transactions.length}</div>
                        <div className="stat-label">Total Transactions</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-value">
                          {transactions.filter(t => t.amount > 0).length}
                        </div>
                        <div className="stat-label">Income Transactions</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-value">
                          {transactions.filter(t => t.amount < 0).length}
                        </div>
                        <div className="stat-label">Expense Transactions</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transactions List */}
              <div className="col-lg-8">
                <div className="content-card transactions-list-card">
                  <div className="card-header">
                    <div className="d-flex justify-content-between align-items-center">
                      <h4 className="card-title mb-0">
                        <i className="fas fa-list-alt me-2"></i>
                        Recent Transactions
                      </h4>
                      <div className="card-actions">
                        <div className="input-group search-box">
                          <input type="text" className="form-control" placeholder="Search transactions..." />
                          <button className="btn btn-outline-secondary" type="button">
                            <i className="fas fa-search"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    {loading ? (
                      <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-3">Loading transactions...</p>
                      </div>
                    ) : (
                      <TransactionList
                        transactions={transactions}
                        onDelete={deleteTransaction}
                        onUpdate={updateTransaction}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="footer-logo">
                <i className="fas fa-wallet"></i>
                <span>Expense Tracker</span>
              </div>
              <p className="footer-text">
                Manage your finances efficiently with our intuitive expense tracking solution.
              </p>
            </div>
            <div className="col-md-6">
              <div className="footer-links">
                <h5>Quick Links</h5>
                <ul className="list-unstyled">
                  <li><a href="#dashboard">Dashboard</a></li>
                  <li><a href="#transactions">Transactions</a></li>
                  <li><a href="#reports">Reports</a></li>
                  <li><a href="#settings">Settings</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="row">
              <div className="col-12">
                <p>&copy; {new Date().getFullYear()} Expense Tracker. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}