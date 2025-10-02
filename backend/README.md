# Backend (Node.js + Express + MySQL)

## Requirements
- Node.js (16+)
- MySQL (or MariaDB)

## Setup
1. Create a database (e.g. `expense_tracker`)
2. Run the SQL to create table:

```sql
CREATE TABLE transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type ENUM('income','expense') NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  category VARCHAR(100),
  note TEXT,
  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

3. Copy `.env.example` to `.env` and set your DB credentials.
4. Install dependencies:
   ```
   cd backend
   npm install
   ```
5. Start server:
   ```
   npm run dev
   ```

The server listens on port 5000 by default.
