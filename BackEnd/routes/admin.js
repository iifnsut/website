const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$', (req, res) => {
    res.send('Welcome to the Admin page');
});



module.exports = router;