const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/index(.html)?', (req, res) => {
    res.send('Welcome to the home page');
});

router.get('/about(.html)?', (req, res) => {
    res.send('Welcome to the about page');
});

router.get('/event(.html)?', (req, res) => {
    res.send('Welcome to the event page');
});


module.exports = router;