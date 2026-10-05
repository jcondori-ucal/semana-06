// Módulo de conexión: crea y exporta UN pool de conexiones reutilizable
const mysql = require('mysql2/promise');
const { db } = require('./env');

const pool = mysql.createPool({
  host: db.host,
  port: db.port,
  user: db.user,
  password: db.password,
  database: db.database,
  waitForConnections: true,
  connectionLimit: 10,
  decimalNumbers: true, // DECIMAL llega como number, no como string
});

// Prueba de conexión al iniciar (no imprime la contraseña)
async function probarConexion() {
  const [rows] = await pool.query('SELECT 1 + 1 AS resultado');
  console.log(`✅ Conectado a MySQL en ${db.host}:${db.port}/${db.database} (1+1=${rows[0].resultado})`);
}

module.exports = { pool, probarConexion };
