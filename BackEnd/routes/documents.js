const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const loginAccessChecker = require('../middleware/loginAccessChecker');
const {roleConfig} = require('../config/roleConfig');
const { fileUpload } = require('../middleware/fileUpload');;
router.use(loginAccessChecker([roleConfig.admin, roleConfig.user]));

router.get('/:id', documentController.getDocument);

router.post('/', fileUpload, documentController.addDocument);

// router.delete('/:id', documentController.deleteDocument);

module.exports = router;