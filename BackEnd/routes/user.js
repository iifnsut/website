const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$', (req, res) => {
    res.send('Welcome to the User page');
});



module.exports = router;