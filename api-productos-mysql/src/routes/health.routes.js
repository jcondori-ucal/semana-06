const { Router } = require('express');
const { pool } = require('../config/db');

const router = Router();

// GET /api/health/db -> verifica que la API "ve" a MySQL
router.get('/db', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT NOW() AS hora_servidor, DATABASE() AS bd');
    res.json({ estado: 'OK', ...rows[0] });
  } catch (e) {
    res.status(503).json({ estado: 'ERROR', detalle: e.code });
  }
});

module.exports = router;
