const express = require('express');
const router = express.Router();
const path = require('path');
const { fileUpload } = require('../middleware/fileUpload');
const { newApplication, formApplication } = require('../controllers/userController');

const loginAccessChecker = require('../middleware/loginAccessChecker');
const { roleConfig } = require('../config/roleConfig');

router.use(loginAccessChecker([roleConfig.user]));


router.get('^/$', (req, res) => {
    res.send('Welcome to the User page : ' + req.user.name);
});

router.get('/application(s)?', formApplication);

router.post('/application(s)?', fileUpload, newApplication);
module.exports = router;