# Semana 6 · API Express + MySQL (mysql2 + dotenv + Docker Compose)

Fundamentos de Desarrollo Back-End · UCAL 2026-2

## ¿Qué contiene?
```
api-productos-mysql/
├── docker-compose.yml     # MySQL 8 + API + Adminer
├── Dockerfile             # imagen de la API
├── .env.example           # plantilla de variables (SÍ se sube a Git)
├── .env                   # credenciales reales (NO se sube: .gitignore)
├── .gitignore
├── db/
│   ├── init.sql           # crea la tabla productos + datos de prueba
│   └── practica.sql       # ejercicios SELECT / INSERT / UPDATE / DELETE
├── demos/
│   └── 01-memoria-vs-mysql.js
├── requests.http          # pruebas de endpoints
└── src/
    ├── server.js          # arranca: prueba conexión -> listen
    ├── app.js             # express + rutas + middleware de errores
    ├── config/env.js      # dotenv + validación de variables
    ├── config/db.js       # pool de conexiones mysql2/promise
    ├── routes/            # producto.routes.js, health.routes.js
    ├── controllers/       # HTTP <-> servicio
    ├── services/          # reglas de negocio
    └── repositories/      # SQL (único lugar donde hay consultas)
```

## Opción A · Todo con Docker Compose (recomendado)
```bash
cp .env.example .env        # y edita las contraseñas
docker compose up -d --build
docker compose logs -f api  # debe decir: ✅ Conectado a MySQL ...
```
- API: http://localhost:3000/api/productos
- Salud BD: http://localhost:3000/api/health/db
- Adminer: http://localhost:8080 → Servidor `db`, usuario/clave de tu `.env`, BD `tienda_ucal`

## Opción B · MySQL en Docker, Node en tu PC (para live coding)
```bash
docker compose up -d db adminer
# en .env cambia: DB_HOST=localhost  y  DB_PORT=3307
npm install
npm run dev
```

## Endpoints
| Método | Ruta | SQL |
|---|---|---|
| GET | /api/productos | `SELECT * FROM productos` |
| GET | /api/productos/:id | `SELECT ... WHERE id = ?` |
| POST | /api/productos | `INSERT INTO productos ...` |
| PUT | /api/productos/:id | `UPDATE productos SET ... WHERE id = ?` |
| DELETE | /api/productos/:id | `DELETE FROM productos WHERE id = ?` |

## Experimentos para clase (predice antes de ejecutar)
1. `docker compose restart api` → ¿se pierden los productos creados? (No: están en MySQL)
2. `docker compose down` y luego `up -d` → ¿y ahora? (Siguen: el volumen `mysql_data` persiste)
3. `docker compose down -v` → ¿y ahora? (Se borra el volumen; `init.sql` vuelve a correr)
4. Pon una contraseña errónea en `.env` y `docker compose up -d --force-recreate api` → mira `docker compose logs api` (`ER_ACCESS_DENIED_ERROR`)
5. Borra `DB_PASSWORD` del `.env` → la API se niega a arrancar (validación en `config/env.js`)
6. `node demos/01-memoria-vs-mysql.js` dos veces → memoria siempre 1, MySQL va sumando

## Errores frecuentes
| Error | Causa probable |
|---|---|
| `ECONNREFUSED` | MySQL aún no arranca o host/puerto incorrecto |
| `ER_ACCESS_DENIED_ERROR` | usuario/contraseña del `.env` no coinciden |
| `ER_BAD_DB_ERROR` | `DB_NAME` no existe |
| `ER_NO_SUCH_TABLE` | no corrió `init.sql` (el volumen ya existía → `down -v`) |
| `ENOTFOUND db` | corres Node fuera de Docker con `DB_HOST=db` → usa `localhost` |

> Cambiaste `.env` y no hay efecto: recrea el contenedor (`up -d --force-recreate api`). MySQL solo lee `MYSQL_*` la **primera** vez que crea el volumen.
