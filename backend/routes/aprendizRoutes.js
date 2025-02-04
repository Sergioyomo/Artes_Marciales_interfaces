// tipoRoutes.js
const express = require('express');
const router = express.Router();
const aprendizController = require('../controllers/aprendizController');

router.get('/', aprendizController.getAllAprendiz);
router.get('/:id', aprendizController.getAprendizById);
router.post('/', aprendizController.createAprendiz);
router.put('/:id', aprendizController.updateAprendiz);
router.delete('/:id', aprendizController.deleteAprendiz);

module.exports = router;
