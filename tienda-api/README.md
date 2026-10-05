# Tienda API — Node.js + Express + MySQL (Docker Compose)

API REST de **productos** y **usuarios** con arquitectura por capas.
Proyecto de ejemplo de la **semana 6 – parte 2** del curso *Fundamentos de Desarrollo Back-End* (UCAL).

## Requisitos

- Docker Desktop (incluye Docker Compose)
- Postman o Thunder Client

## Puesta en marcha

```bash
cp .env.example .env        # y edita las claves
docker compose up -d --build
```

- API: http://localhost:3000
- MySQL (Workbench): `localhost:3307`, usuario y clave del `.env`

Comandos útiles:

| Comando | Para qué sirve |
|---|---|
| `docker compose logs -f api` | Ver los logs de la API (nodemon recarga al guardar) |
| `docker compose exec api npm run test:db` | Probar la conexión a MySQL (`SELECT 1 + 1`) |
| `docker compose exec mysql mysql -u root -p tienda_db` | Abrir la consola de MySQL |
| `docker compose down` | Detener los contenedores (los datos se conservan) |
| `docker compose down -v` | Detener y **borrar la base de datos** (se vuelve a crear con `database/*.sql`) |

> Los scripts de `database/` solo se ejecutan la **primera vez**, cuando el volumen está vacío.
> Si cambias `schema.sql` o `seed.sql`, ejecuta `docker compose down -v` y vuelve a levantar.

## Arquitectura por capas

```
Cliente (Postman)
   │  HTTP + JSON
   ▼
routes/        → asocia método + URL con un controlador
controllers/   → lee req (params, body) y responde con res.status().json()
services/      → reglas de negocio (validar, 404, email único → 409)
repositories/  → consultas SQL con el pool de mysql2
models/        → entidad (Producto, Usuario): fromRow() y validar()
config/db.js   → pool de conexiones (mysql2/promise + dotenv)
   │
   ▼
MySQL (contenedor)
```

```
tienda-api/
├── database/
│   ├── schema.sql          # CREATE DATABASE / CREATE TABLE
│   └── seed.sql            # registros de prueba
├── src/
│   ├── config/db.js
│   ├── models/             # producto.model.js, usuario.model.js
│   ├── repositories/
│   ├── services/
│   ├── controllers/
│   ├── routes/
│   ├── utils/http-error.js # HttpError + responderError
│   └── app.js
├── test-db.js
├── postman_collection.json
├── Dockerfile
├── docker-compose.yml
├── .env.example
└── .gitignore
```

## Endpoints

| Método | Ruta | Respuesta |
|---|---|---|
| GET | `/api/db-check` | 200 `{ estado, productos }` |
| GET | `/api/productos` | 200 lista |
| GET | `/api/productos/:id` | 200 · 400 id inválido · 404 |
| POST | `/api/productos` | 201 · 400 datos inválidos |
| PUT | `/api/productos/:id` | 200 · 400 · 404 |
| DELETE | `/api/productos/:id` | 204 · 404 |
| GET | `/api/usuarios` | 200 lista |
| GET | `/api/usuarios/:id` | 200 · 400 · 404 |
| POST | `/api/usuarios` | 201 · 400 · 409 email repetido |
| PUT | `/api/usuarios/:id` | 200 · 400 · 404 · 409 |
| DELETE | `/api/usuarios/:id` | 204 · 404 |

Ejemplos de body:

```json
// POST /api/productos
{ "nombre": "Teclado Redragon", "descripcion": "Mecánico", "precio": 159.5, "stock": 20 }

// POST /api/usuarios   (rol: "cliente" | "admin")
{ "nombre": "Pedro Salas", "email": "pedro.salas@correo.com", "rol": "cliente" }
```

Importa `postman_collection.json` en Postman para tener todas las peticiones listas.

## Errores frecuentes

| Error | Causa | Solución |
|---|---|---|
| `ECONNREFUSED` | MySQL aún no arranca o el host es incorrecto | Esperar el healthcheck; dentro de Docker `DB_HOST=mysql` |
| `ER_ACCESS_DENIED_ERROR` | Clave del `.env` distinta a la del volumen ya creado | `docker compose down -v` y volver a levantar |
| `ER_NO_SUCH_TABLE` | El volumen se creó antes que los `.sql` | `docker compose down -v` |
| Puerto 3000/3307 ocupado | Otra app usa ese puerto | Cambiar el puerto izquierdo en `docker-compose.yml` |
