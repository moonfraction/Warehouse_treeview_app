const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemsController');

router.get('/', itemController.getItems);
router.put('/move/:id', itemController.updateItem);
router.get('/categories', itemController.getCategories);
router.get('/statuses', itemController.getStatuses);

module.exports = router;