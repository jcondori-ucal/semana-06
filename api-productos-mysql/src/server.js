const { port } = require('./config/env');
const app = require('./app');
const { probarConexion } = require('./config/db');

async function iniciar() {
  try {
    await probarConexion();
    app.listen(port, () => console.log(`🚀 API escuchando en http://localhost:${port}`));
  } catch (e) {
    console.error('❌ No se pudo conectar a MySQL:', e.code || e.message);
    process.exit(1);
  }
}

iniciar();
