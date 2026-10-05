-- Asegura que los acentos (á, é, ñ) se guarden correctamente
SET NAMES utf8mb4;

CREATE DATABASE IF NOT EXISTS tienda_db;
USE tienda_db;

CREATE TABLE IF NOT EXISTS productos (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  nombre      VARCHAR(100)  NOT NULL,
  descripcion VARCHAR(255),
  precio      DECIMAL(10,2) NOT NULL,
  stock       INT NOT NULL DEFAULT 0,
  creado_en   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS usuarios (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  nombre      VARCHAR(100) NOT NULL,
  email       VARCHAR(150) NOT NULL UNIQUE,
  rol         ENUM('cliente', 'admin') NOT NULL DEFAULT 'cliente',
  activo      BOOLEAN NOT NULL DEFAULT TRUE,
  creado_en   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
