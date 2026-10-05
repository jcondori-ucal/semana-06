// Rutas: asocian método HTTP + URL con una función del controlador
const { Router } = require('express');
const productoController = require('../controllers/producto.controller');

const router = Router();

router.get('/', productoController.listar);
router.get('/:id', productoController.obtenerPorId);
router.post('/', productoController.crear);
router.put('/:id', productoController.actualizar);
router.delete('/:id', productoController.eliminar);

module.exports = router;
