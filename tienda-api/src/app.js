const express = require('express');
require('dotenv').config();
const pool = require('./config/db');
const productoRoutes = require('./routes/producto.routes');
const usuarioRoutes = require('./routes/usuario.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// JSON mal formado en el body -> 400 en lugar de 500
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ mensaje: 'El body no es un JSON válido' });
  }
  next(err);
});

app.get('/', (req, res) => {
  res.json({ mensaje: 'API Tienda funcionando', endpoints: ['/api/productos', '/api/usuarios', '/api/db-check'] });
});

// Ruta de verificación de la conexión (semana 6)
app.get('/api/db-check', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT COUNT(*) AS total FROM productos');
    res.json({ estado: 'ok', productos: rows[0].total });
  } catch (error) {
    res.status(500).json({ estado: 'error', codigo: error.code });
  }
});

app.use('/api/productos', productoRoutes);
app.use('/api/usuarios', usuarioRoutes);

// Endpoint no definido
app.use((req, res) => {
  res.status(404).json({ mensaje: `Ruta no encontrada: ${req.method} ${req.originalUrl}` });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
