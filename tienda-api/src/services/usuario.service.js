// Servicio: lógica de negocio; no conoce req/res ni SQL
const usuarioRepository = require('../repositories/usuario.repository');
const Usuario = require('../models/usuario.model');
const { HttpError } = require('../utils/http-error');

function validarId(id) {
  const numero = Number(id);
  if (!Number.isInteger(numero) || numero <= 0) {
    throw new HttpError(400, 'El id debe ser un entero positivo');
  }
  return numero;
}

async function listar() {
  return usuarioRepository.findAll();
}

async function obtenerPorId(id) {
  const usuario = await usuarioRepository.findById(validarId(id));
  if (!usuario) throw new HttpError(404, 'Usuario no encontrado');
  return usuario;
}

async function crear(datos) {
  const errores = Usuario.validar(datos);
  if (errores.length) throw new HttpError(400, 'Datos inválidos', errores);

  // Regla de negocio: el email no se puede repetir
  if (await usuarioRepository.findByEmail(datos.email)) {
    throw new HttpError(409, 'El email ya está registrado');
  }
  return usuarioRepository.create(datos);
}

async function actualizar(id, datos) {
  const idValido = validarId(id);
  const errores = Usuario.validar(datos);
  if (errores.length) throw new HttpError(400, 'Datos inválidos', errores);

  const otro = await usuarioRepository.findByEmail(datos.email);
  if (otro && otro.id !== idValido) {
    throw new HttpError(409, 'El email ya está registrado');
  }
  const usuario = await usuarioRepository.update(idValido, datos);
  if (!usuario) throw new HttpError(404, 'Usuario no encontrado');
  return usuario;
}

async function eliminar(id) {
  const eliminado = await usuarioRepository.remove(validarId(id));
  if (!eliminado) throw new HttpError(404, 'Usuario no encontrado');
}

module.exports = { listar, obtenerPorId, crear, actualizar, eliminar };
