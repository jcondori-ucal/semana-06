// Controlador: recibe req, llama al servicio y responde con res
const usuarioService = require('../services/usuario.service');
const { responderError } = require('../utils/http-error');

async function listar(req, res) {
  try {
    const usuarios = await usuarioService.listar();
    res.status(200).json(usuarios);
  } catch (error) {
    responderError(res, error);
  }
}

async function obtenerPorId(req, res) {
  try {
    const usuario = await usuarioService.obtenerPorId(req.params.id);
    res.status(200).json(usuario);
  } catch (error) {
    responderError(res, error);
  }
}

async function crear(req, res) {
  try {
    const usuario = await usuarioService.crear(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    responderError(res, error);
  }
}

async function actualizar(req, res) {
  try {
    const usuario = await usuarioService.actualizar(req.params.id, req.body);
    res.status(200).json(usuario);
  } catch (error) {
    responderError(res, error);
  }
}

async function eliminar(req, res) {
  try {
    await usuarioService.eliminar(req.params.id);
    res.status(204).send();
  } catch (error) {
    responderError(res, error);
  }
}

module.exports = { listar, obtenerPorId, crear, actualizar, eliminar };
