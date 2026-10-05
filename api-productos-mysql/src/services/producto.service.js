// Lógica de negocio: reglas simples antes de tocar la BD
const repo = require('../repositories/producto.repository');

function validar({ nombre, categoria, precio }) {
  if (!nombre || !categoria || precio === undefined) {
    const err = new Error('nombre, categoria y precio son obligatorios');
    err.status = 400;
    throw err;
  }
  if (Number(precio) <= 0) {
    const err = new Error('El precio debe ser mayor a 0');
    err.status = 400;
    throw err;
  }
}

const listar = () => repo.findAll();
const obtener = (id) => repo.findById(id);

async function crear(data) {
  validar(data);
  return repo.create(data);
}

async function actualizar(id, data) {
  validar(data);
  return repo.update(id, { stock: 0, ...data });
}

const eliminar = (id) => repo.remove(id);

module.exports = { listar, obtener, crear, actualizar, eliminar };
