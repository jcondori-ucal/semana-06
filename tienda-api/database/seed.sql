-- Asegura que los acentos (á, é, ñ) se guarden correctamente
SET NAMES utf8mb4;

USE tienda_db;

INSERT INTO productos (nombre, descripcion, precio, stock)
VALUES
  ('Laptop Lenovo',  'Core i5, 16 GB RAM', 2899.90,  8),
  ('Mouse Logitech', 'Inalámbrico',          79.90, 35),
  ('Monitor LG 24',  'Full HD IPS',         649.00, 12);

INSERT INTO usuarios (nombre, email, rol)
VALUES
  ('Ana Torres',   'ana.torres@correo.com',   'admin'),
  ('Luis Ramírez', 'luis.ramirez@correo.com', 'cliente'),
  ('María Quispe', 'maria.quispe@correo.com', 'cliente');
