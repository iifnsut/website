const express = require('express');
const router = express.Router();
const path = require('path');
const adminController = require('../controllers/adminController');

router.get('^/$', (req, res) => {
    res.send('Welcome to the Admin page');
});


router.get('^/application(s)?', adminController.viewALLApplications);
router.patch('^/application(s)?/:id', adminController.updateApplication);


module.exports = router;