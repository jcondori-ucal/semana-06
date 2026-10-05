// Carga las variables del archivo .env en process.env
require('dotenv').config();

// Validamos que existan las variables obligatorias (fail fast)
const requeridas = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
const faltantes = requeridas.filter((k) => !process.env[k]);
if (faltantes.length > 0) {
  console.error(`❌ Faltan variables de entorno: ${faltantes.join(', ')}`);
  console.error('   Copia .env.example como .env y complétalo.');
  process.exit(1);
}

module.exports = {
  port: Number(process.env.PORT) || 3000,
  db: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
};
