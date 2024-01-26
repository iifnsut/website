const express = require('express');
const router = express.Router();
const path = require('path');
const companyController = require('../controllers/companyController');

router.get('^/$', (req, res) => {
    // res.send('Welcome to the company page');
    res.render(path.join(__dirname, '..', 'views', 'testCompanyForm.ejs', ), {rd: Math.floor(Math.random() * 1000)});
});
router.post('/', companyController.createNewCompany);



module.exports = router;