const express = require('express');
const productoRoutes = require('./routes/producto.routes');
const healthRoutes = require('./routes/health.routes');

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.json({ mensaje: 'API Semana 6 - Express + MySQL 🚀' }));
app.use('/api/health', healthRoutes);
app.use('/api/productos', productoRoutes);

// Middleware de errores (lo profundizamos en la semana 10)
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(err.status || 500).json({ error: err.status ? err.message : 'Error interno del servidor' });
});

module.exports = app;
