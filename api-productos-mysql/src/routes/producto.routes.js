const { Router } = require('express');
const ctrl = require('../controllers/producto.controller');

const router = Router();
router.get('/', ctrl.listar);         // SELECT
router.get('/:id', ctrl.obtener);     // SELECT ... WHERE id = ?
router.post('/', ctrl.crear);         // INSERT
router.put('/:id', ctrl.actualizar);  // UPDATE
router.delete('/:id', ctrl.eliminar); // DELETE

module.exports = router;
