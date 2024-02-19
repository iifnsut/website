const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const loginAccessChecker = require('../middleware/loginAccessChecker');
const {roleConfig} = require('../config/roleConfig');

router.use(loginAccessChecker([roleConfig.admin, roleConfig.user]));

router.get('/:id', documentController.getDocument);
// router.delete('/:id', documentController.deleteDocument);

module.exports = router;