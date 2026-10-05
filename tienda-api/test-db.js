const pool = require('./src/config/db');

async function probarConexion() {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS r');
    console.log('✅ Conectado a MySQL:', rows[0].r);
  } catch (error) {
    console.error('❌ Error:', error.code, error.message);
  } finally {
    await pool.end();
  }
}

probarConexion();
