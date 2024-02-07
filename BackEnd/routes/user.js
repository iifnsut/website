const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$', (req, res) => {
    res.send('Welcome to the User page');
});

router.get('/application(s)?', (req, res) => {
    res.render(path.join("user", "applicationForm.ejs"), {
        page: {
            title: "Applications",
            name: "Applications",
            description: "Applications",
            path: "/user/applications",
            type: "user",
            styles: ["applications.css"],
            scripts: ["applicationForm.js"],
        },
    });
});

router.post('/application(s)?', (req, res) => {
    console.log(req.body);
    res.status(400).json({ message: "Invalid request" });
});


module.exports = router;