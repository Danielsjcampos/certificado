
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function seed() {
  console.log('Resetting and Seeding database with PG...');
  try {
    // Drop existing tables to avoid conflicts during setup
    await pool.query('DROP TABLE IF EXISTS leads CASCADE;');
    await pool.query('DROP TABLE IF EXISTS users CASCADE;');

    // Create tables
    await pool.query(`
      CREATE TABLE users (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        name TEXT NOT NULL,
        role TEXT DEFAULT 'broker',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    await pool.query(`
      CREATE TABLE leads (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name TEXT NOT NULL,
        document VARCHAR(18) NOT NULL,
        certificate_type TEXT,
        phone VARCHAR(20),
        email TEXT,
        origin TEXT,
        status TEXT DEFAULT 'Aguardando Documentação',
        expiration_date DATE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    // Insert Dev User
    await pool.query("INSERT INTO users (username, password, name, role) VALUES ('admin', 'devpassword123', 'Dev Admin', 'admin');");

    console.log('Admin user seeded (Username: admin / Password: devpassword123)');

    // Insert initial leads
    await pool.query("INSERT INTO leads (name, document, certificate_type, phone, email, origin, status, expiration_date) VALUES ('João Silva Tech ME', '12.345.678/0001-90', 'A1', '(11) 98888-7777', 'contato@joaosilva.com.br', 'Google Ads', 'Aguardando Documentação', '2025-05-20'), ('Maria Oliveira CPF', '123.456.789-00', 'A3', '(21) 97777-6666', 'maria.oliveira@gmail.com', 'Indicação', 'Agendado', '2025-10-15');");
    
    console.log('Initial leads seeded.');

  } catch (err) {
    console.error('Seed error:', err);
  } finally {
    await pool.end();
  }
}

seed();
