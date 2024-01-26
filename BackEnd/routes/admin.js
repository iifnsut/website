const express = require('express');
const router = express.Router();
const path = require('path');
const adminController = require('../controllers/adminController');

router.get('^/$', (req, res) => {
    res.send('Welcome to the Admin page');
});

router.get('^/view', adminController.viewAllCompany);


module.exports = router;