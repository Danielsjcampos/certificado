
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
      [
        name, 
        document || null, 
        certificate_type || 'OUTRO', 
        phone || null, 
        email || null, 
        origin || 'Landing Page', 
        status || 'Novo Lead', 
        expiration_date || null
      ]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar lead' });
  }
});

// Settings Routes
app.get('/api/settings', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM system_settings WHERE id = 1');
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar configurações' });
  }
});

app.post('/api/settings', async (req, res) => {
  const { 
    logo_url, icon_url, meta_title, meta_description, schema_markup, 
    pixel_code, google_tag, google_analytics, client_email, 
    client_phone, client_address 
  } = req.body;

  try {
    const result = await pool.query(`
      UPDATE system_settings 
      SET logo_url = $1, icon_url = $2, meta_title = $3, meta_description = $4, 
          schema_markup = $5, pixel_code = $6, google_tag = $7, 
          google_analytics = $8, client_email = $9, client_phone = $10, 
          client_address = $11, updated_at = NOW()
      WHERE id = 1
      RETURNING *
    `, [
      logo_url, icon_url, meta_title, meta_description, 
      schema_markup, pixel_code, google_tag, google_analytics, 
      client_email, client_phone, client_address
    ]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar configurações' });
  }
});

// Update Lead Status (for Kanban)
app.patch('/api/leads/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const result = await pool.query(
      'UPDATE leads SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [status, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Lead não encontrado' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar status do lead' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
