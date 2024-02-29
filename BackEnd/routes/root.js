const express = require('express');
const router = express.Router();
const path = require('path');
const publicController = require('../controllers/publicController');

router.get('^/$|/index(.html)?', publicController.index);

router.get('/about(.html)?', publicController.about);

router.get('/event(.html)?', publicController.event);

router.get('/contact(.html)?', publicController.contact);

router.get('/startups(.html)?', publicController.startUPs);

router.get("/apply(.html)?", publicController.apply);




module.exports = router;