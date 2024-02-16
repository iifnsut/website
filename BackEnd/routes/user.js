const express = require('express');
const router = express.Router();
const path = require('path');
const { fileUpload } = require('../middleware/fileUpload');
const { newApplication, formApplication } = require('../controllers/userController');

router.get('^/$', (req, res) => {
    res.send('Welcome to the User page');
    console.log(req.user);
});

router.get('/application(s)?', formApplication);

router.post('/application(s)?', fileUpload, newApplication);
module.exports = router;