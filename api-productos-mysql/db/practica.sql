-- =========================================================
--  Semana 6 · Práctica SQL (ejecutar en Adminer o MySQL CLI)
--  Antes de ejecutar cada bloque: ¡PREDICE el resultado!
-- =========================================================
USE tienda_ucal;

-- 1) SELECT: todos los productos
SELECT * FROM productos;

-- 2) SELECT con columnas y filtro
SELECT nombre, precio FROM productos WHERE categoria = 'Accesorios';

-- 3) SELECT con orden y límite: los 2 más caros
SELECT nombre, precio FROM productos ORDER BY precio DESC LIMIT 2;

-- 4) Predicción: ¿cuántas filas devuelve?
SELECT * FROM productos WHERE stock = 0;

-- 5) INSERT: nuevo producto (¿qué id le tocará?)
INSERT INTO productos (nombre, categoria, precio, stock)
VALUES ('Parlante JBL Go 3', 'Audio', 159.00, 20);

-- 6) UPDATE con WHERE: subir el precio del mouse
UPDATE productos SET precio = 44.90 WHERE id = 2;

-- 7) DELETE con WHERE
DELETE FROM productos WHERE id = 6;

-- ⚠️ 8) ¿Qué pasaría con este? (NO lo ejecutes 😉)
-- UPDATE productos SET precio = 0;

-- 9) Reto: productos con stock entre 1 y 15 ordenados por nombre
-- SELECT ...
