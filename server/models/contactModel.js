// server/models/contactModel.js
const pool = require('../db');

exports.saveContact = async (name, email, message) => {
  const query = `
    INSERT INTO contacts (name, email, message, created_at) 
    VALUES ($1, $2, $3, NOW())
    RETURNING id, name, email, created_at
  `;
  
  const result = await pool.query(query, [name, email, message]);
  console.log("✅ Contact saved to DB:", result.rows[0]);
  
  return result.rows[0];
};
