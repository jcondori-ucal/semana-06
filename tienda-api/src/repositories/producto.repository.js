// Repositorio: única capa que habla con MySQL
const pool = require('../config/db');
const Producto = require('../models/producto.model');

async function findAll() {
  const [rows] = await pool.query('SELECT * FROM productos ORDER BY id');
  return rows.map(Producto.fromRow);
}

async function findById(id) {
  const [rows] = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
  return rows.length ? Producto.fromRow(rows[0]) : null;
}

async function create({ nombre, descripcion = null, precio, stock = 0 }) {
  const [result] = await pool.query(
    'INSERT INTO productos (nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?)',
    [nombre, descripcion, precio, stock]
  );
  return findById(result.insertId);
}

async function update(id, { nombre, descripcion = null, precio, stock = 0 }) {
  const [result] = await pool.query(
    'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ? WHERE id = ?',
    [nombre, descripcion, precio, stock, id]
  );
  return result.affectedRows ? findById(id) : null;
}

async function remove(id) {
  const [result] = await pool.query('DELETE FROM productos WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

module.exports = { findAll, findById, create, update, remove };
