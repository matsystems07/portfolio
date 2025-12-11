// server/db.js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://vendorvault_db_i0hu_user:UhSes28dFiRUt6ks4zoHpThCkzIdUxv4@dpg-d4oae824i8rc73euje4g-a.oregon-postgres.render.com/vendorvault_db_i0hu?sslmode=require&connect_timeout=30',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

pool.on('connect', () => {
  console.log('PostgreSQL Connected');
});

module.exports = pool;

