// Controlador: recibe req, llama al servicio y responde con res
const productoService = require('../services/producto.service');
const { responderError } = require('../utils/http-error');

async function listar(req, res) {
  try {
    const productos = await productoService.listar();
    res.status(200).json(productos);
  } catch (error) {
    responderError(res, error);
  }
}

async function obtenerPorId(req, res) {
  try {
    const producto = await productoService.obtenerPorId(req.params.id);
    res.status(200).json(producto);
  } catch (error) {
    responderError(res, error);
  }
}

async function crear(req, res) {
  try {
    const producto = await productoService.crear(req.body);
    res.status(201).json(producto);
  } catch (error) {
    responderError(res, error);
  }
}

async function actualizar(req, res) {
  try {
    const producto = await productoService.actualizar(req.params.id, req.body);
    res.status(200).json(producto);
  } catch (error) {
    responderError(res, error);
  }
}

async function eliminar(req, res) {
  try {
    await productoService.eliminar(req.params.id);
    res.status(204).send();
  } catch (error) {
    responderError(res, error);
  }
}

module.exports = { listar, obtenerPorId, crear, actualizar, eliminar };
