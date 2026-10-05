// Demo Tema 1: ¿qué pasa con los datos al reiniciar?
// Ejecuta:  node demos/01-memoria-vs-mysql.js   (dos veces seguidas)
require('dotenv').config();
const mysql = require('mysql2/promise');

const enMemoria = [];               // vive en la RAM del proceso
enMemoria.push({ visita: new Date().toISOString() });

(async () => {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST === 'db' ? 'localhost' : process.env.DB_HOST,
    port: process.env.DB_HOST === 'db' ? 3307 : Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  await conn.query('CREATE TABLE IF NOT EXISTS visitas (id INT AUTO_INCREMENT PRIMARY KEY, fecha DATETIME DEFAULT CURRENT_TIMESTAMP)');
  await conn.query('INSERT INTO visitas () VALUES ()');
  const [[{ total }]] = await conn.query('SELECT COUNT(*) AS total FROM visitas');

  console.log(`🧠 Visitas en memoria (arreglo): ${enMemoria.length}`);
  console.log(`💾 Visitas en MySQL (tabla):     ${total}`);
  await conn.end();
})();
