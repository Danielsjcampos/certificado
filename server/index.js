
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Database Connection
const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(cors());
app.use(express.json());

// Auth Route (Simple for now)
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
    
    if (result.rows.length > 0) {
      const user = result.rows[0];
      res.json({ 
        id: user.id, 
        username: user.username, 
        name: user.name, 
        role: user.role 
      });
    } else {
      res.status(401).json({ error: 'Usuário ou senha inválidos' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

// Leads Routes
app.get('/api/leads', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM leads ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar leads' });
  }
});

app.post('/api/leads', async (req, res) => {
  const { name, document, certificate_type, phone, email, origin, status, expiration_date } = req.body;
  
  try {
    const result = await pool.query(
      'INSERT INTO leads (name, document, certificate_type, phone, email, origin, status, expiration_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [name, document, certificate_type, phone, email, origin, status, expiration_date]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar lead' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
