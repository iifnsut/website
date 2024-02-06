const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');

router.get('/:id', documentController.getDocument);
// router.delete('/:id', documentController.deleteDocument);

module.exports = router;