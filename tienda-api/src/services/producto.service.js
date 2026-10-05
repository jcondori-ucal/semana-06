// Servicio: lógica de negocio; no conoce req/res ni SQL
const productoRepository = require('../repositories/producto.repository');
const Producto = require('../models/producto.model');
const { HttpError } = require('../utils/http-error');

function validarId(id) {
  const numero = Number(id);
  if (!Number.isInteger(numero) || numero <= 0) {
    throw new HttpError(400, 'El id debe ser un entero positivo');
  }
  return numero;
}

async function listar() {
  return productoRepository.findAll();
}

async function obtenerPorId(id) {
  const producto = await productoRepository.findById(validarId(id));
  if (!producto) throw new HttpError(404, 'Producto no encontrado');
  return producto;
}

async function crear(datos) {
  const errores = Producto.validar(datos);
  if (errores.length) throw new HttpError(400, 'Datos inválidos', errores);
  return productoRepository.create(datos);
}

async function actualizar(id, datos) {
  const errores = Producto.validar(datos);
  if (errores.length) throw new HttpError(400, 'Datos inválidos', errores);
  const producto = await productoRepository.update(validarId(id), datos);
  if (!producto) throw new HttpError(404, 'Producto no encontrado');
  return producto;
}

async function eliminar(id) {
  const eliminado = await productoRepository.remove(validarId(id));
  if (!eliminado) throw new HttpError(404, 'Producto no encontrado');
}

module.exports = { listar, obtenerPorId, crear, actualizar, eliminar };
