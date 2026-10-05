// Controlador: traduce HTTP <-> servicio
const service = require('../services/producto.service');

async function listar(req, res, next) {
  try {
    res.json(await service.listar());
  } catch (e) { next(e); }
}

async function obtener(req, res, next) {
  try {
    const producto = await service.obtener(req.params.id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(producto);
  } catch (e) { next(e); }
}

async function crear(req, res, next) {
  try {
    res.status(201).json(await service.crear(req.body));
  } catch (e) { next(e); }
}

async function actualizar(req, res, next) {
  try {
    const producto = await service.actualizar(req.params.id, req.body);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(producto);
  } catch (e) { next(e); }
}

async function eliminar(req, res, next) {
  try {
    const ok = await service.eliminar(req.params.id);
    if (!ok) return res.status(404).json({ error: 'Producto no encontrado' });
    res.status(204).send();
  } catch (e) { next(e); }
}

module.exports = { listar, obtener, crear, actualizar, eliminar };
