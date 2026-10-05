// Capa de acceso a datos: aquí (y solo aquí) vive el SQL
const { pool } = require('../config/db');

async function findAll() {
  const [rows] = await pool.query('SELECT * FROM productos ORDER BY id');
  return rows;
}

async function findById(id) {
  // ? = placeholder: mysql2 escapa el valor (evita SQL Injection)
  const [rows] = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
  return rows[0] || null;
}

async function create({ nombre, categoria, precio, stock }) {
  const [result] = await pool.query(
    'INSERT INTO productos (nombre, categoria, precio, stock) VALUES (?, ?, ?, ?)',
    [nombre, categoria, precio, stock ?? 0]
  );
  return findById(result.insertId);
}

async function update(id, { nombre, categoria, precio, stock }) {
  const [result] = await pool.query(
    'UPDATE productos SET nombre = ?, categoria = ?, precio = ?, stock = ? WHERE id = ?',
    [nombre, categoria, precio, stock, id]
  );
  if (result.affectedRows === 0) return null;
  return findById(id);
}

async function remove(id) {
  const [result] = await pool.query('DELETE FROM productos WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

module.exports = { findAll, findById, create, update, remove };
