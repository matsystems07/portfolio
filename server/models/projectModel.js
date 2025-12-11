// server/models/projectModel.js
const db = require('../db');

exports.getAll = async () => {
  const query = `SELECT * FROM projects ORDER BY id ASC;`;
  const result = await db.query(query);
  return result.rows;
};

exports.getById = async (id) => {
  const query = `SELECT * FROM projects WHERE id = $1;`;
  const result = await db.query(query, [id]);
  return result.rows[0];
};
