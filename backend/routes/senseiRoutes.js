// componenteRoutes.js
const express = require('express');
const router = express.Router();
const senseiController = require('../controllers/senseiController');

router.get('/', senseiController.getAllSensei);
router.get('/:id', senseiController.getSenseiById);
router.post('/', senseiController.createSensei);
router.put('/:id', senseiController.updateSensei);
router.delete('/:id', senseiController.deleteSensei);


module.exports = router;
