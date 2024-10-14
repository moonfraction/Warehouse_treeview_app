const express = require('express');
const router = express.Router();
const godownController = require('../controllers/godownsController');

// Get all godowns
router.get('/', godownController.getGodownTree);
router.get('/all', godownController.getGodowns);
router.post('/', godownController.createGodown);
router.get('/:id', godownController.getGodownById);
router.delete('/:id', godownController.deleteGodown);
router.put('/:id', godownController.updateGodown);
router.delete('/', godownController.deleteAllGodowns);


module.exports = router;