-- Se ejecuta automáticamente SOLO la primera vez que se crea el volumen de MySQL
CREATE DATABASE IF NOT EXISTS tienda_ucal
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE tienda_ucal;

CREATE TABLE IF NOT EXISTS productos (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  nombre      VARCHAR(100)  NOT NULL,
  categoria   VARCHAR(50)   NOT NULL,
  precio      DECIMAL(10,2) NOT NULL,
  stock       INT           NOT NULL DEFAULT 0,
  activo      BOOLEAN       NOT NULL DEFAULT TRUE,
  creado_en   DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO productos (nombre, categoria, precio, stock) VALUES
  ('Laptop Lenovo IdeaPad 3', 'Computo',     2499.90, 8),
  ('Mouse Logitech M170',     'Accesorios',    39.90, 50),
  ('Teclado mecánico Redragon','Accesorios',  189.00, 15),
  ('Monitor LG 24"',          'Computo',      599.00, 0),
  ('Audífonos Sony WH-CH520', 'Audio',        229.00, 12);
