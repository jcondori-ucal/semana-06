# Semana 06 · Express + MySQL

Fundamentos de Desarrollo Back-End · UCAL 2026-2

Este repositorio reúne los dos proyectos de la semana 6, en la que conectamos una API de Node.js + Express a una base de datos MySQL con `mysql2` y `dotenv`, y levantamos todo con Docker Compose.

| Proyecto | Qué muestra | Recursos |
|---|---|---|
| [`api-productos-mysql/`](api-productos-mysql/) | **Parte 1.** CRUD de productos con la API separada en capas (rutas, controladores, servicios y repositorios), validación de variables de entorno, un endpoint de salud y experimentos para ver cómo persisten los datos. | `productos` |
| [`tienda-api/`](tienda-api/) | **Parte 2.** API REST de productos y usuarios. Agrega la capa de modelos, errores HTTP propios (400 / 404 / 409) y una colección de Postman. | `productos`, `usuarios` |

Cada carpeta tiene su propio README con el detalle de los endpoints, la estructura y los errores frecuentes.

## Tecnologías

- Node.js + Express 4
- MySQL 8 con el driver `mysql2/promise` (pool de conexiones)
- `dotenv` para la configuración
- Docker Compose para levantar MySQL (más Adminer en la parte 1)
- `nodemon` para desarrollo

## Requisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (ya incluye Docker Compose)
- Node.js 18 o superior y npm
- Postman, Thunder Client o la extensión REST Client de VS Code (para `requests.http`)

## Inicio rápido

Cada proyecto es independiente. Entra a la carpeta del que quieras probar:

```bash
cd api-productos-mysql      # o: cd tienda-api
cp .env.example .env        # completa las contraseñas
docker compose up -d        # levanta MySQL (y Adminer en api-productos-mysql)
npm install
npm run dev
```

La API queda en http://localhost:3000.

> **Ojo con el `.env`:** si ejecutas Node en tu máquina (fuera de Docker), usa `DB_HOST=localhost` y `DB_PORT=3307`. El contenedor de MySQL expone el puerto 3307 para no chocar con un MySQL que ya tengas instalado.

> Los dos proyectos usan los mismos puertos (3000 y 3307). Detén uno (`docker compose down`) antes de levantar el otro.

## Arquitectura por capas

Los dos proyectos siguen el mismo flujo:

```
Cliente (Postman / requests.http)
   │  HTTP + JSON
   ▼
routes/        → asocia método + URL con un controlador
controllers/   → lee req y responde con res.status().json()
services/      → reglas de negocio y validaciones
repositories/  → consultas SQL (el único lugar con SQL)
config/db.js   → pool de conexiones mysql2
   │
   ▼
MySQL (contenedor Docker)
```

## Estructura del repositorio

```
semana-06/
├── api-productos-mysql/   # Parte 1: CRUD de productos + demos + ejercicios SQL
│   ├── db/                # init.sql (tabla + datos) y practica.sql
│   ├── demos/             # memoria vs. MySQL
│   ├── src/
│   └── requests.http
└── tienda-api/            # Parte 2: productos + usuarios
    ├── database/          # schema.sql y seed.sql
    ├── src/
    └── postman_collection.json
```

## Buenas prácticas de la semana

- El archivo `.env` **no se sube a Git** (está en `.gitignore`); solo se sube `.env.example` como plantilla.
- Las consultas usan placeholders (`WHERE id = ?`) para evitar inyección SQL.
- Los scripts `.sql` montados en el contenedor solo se ejecutan la **primera vez**. Si los modificas, borra el volumen con `docker compose down -v` y vuelve a levantar.
