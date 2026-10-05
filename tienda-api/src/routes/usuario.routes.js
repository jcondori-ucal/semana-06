// Rutas: asocian método HTTP + URL con una función del controlador
const { Router } = require('express');
const usuarioController = require('../controllers/usuario.controller');

const router = Router();

router.get('/', usuarioController.listar);
router.get('/:id', usuarioController.obtenerPorId);
router.post('/', usuarioController.crear);
router.put('/:id', usuarioController.actualizar);
router.delete('/:id', usuarioController.eliminar);

module.exports = router;
