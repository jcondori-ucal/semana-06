// Repositorio: única capa que habla con MySQL
const pool = require('../config/db');
const Usuario = require('../models/usuario.model');

async function findAll() {
  const [rows] = await pool.query('SELECT * FROM usuarios ORDER BY id');
  return rows.map(Usuario.fromRow);
}

async function findById(id) {
  const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
  return rows.length ? Usuario.fromRow(rows[0]) : null;
}

async function findByEmail(email) {
  const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
  return rows.length ? Usuario.fromRow(rows[0]) : null;
}

async function create({ nombre, email, rol = 'cliente', activo = true }) {
  const [result] = await pool.query(
    'INSERT INTO usuarios (nombre, email, rol, activo) VALUES (?, ?, ?, ?)',
    [nombre, email, rol, activo]
  );
  return findById(result.insertId);
}

async function update(id, { nombre, email, rol = 'cliente', activo = true }) {
  const [result] = await pool.query(
    'UPDATE usuarios SET nombre = ?, email = ?, rol = ?, activo = ? WHERE id = ?',
    [nombre, email, rol, activo, id]
  );
  return result.affectedRows ? findById(id) : null;
}

async function remove(id) {
  const [result] = await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

module.exports = { findAll, findById, findByEmail, create, update, remove };
