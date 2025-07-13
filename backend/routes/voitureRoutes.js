const express = require('express');
const router = express.Router();
const voitureController = require('../controllers/voitureController');

// Routes CRUD de base
router.get('/', voitureController.getAllVoitures);
router.get('/:id', voitureController.getVoitureById);
router.post('/', voitureController.addVoiture);
router.put('/:id', voitureController.updateVoiture);
router.delete('/:id', voitureController.deleteVoiture);



module.exports = router;