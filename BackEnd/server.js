require('dotenv').config()
const path = require('path');
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const { addAbortListener } = require('events');
const connectDB = require('./config/dbConn');


const PORT = process.env.PORT || 3500;

// For parsing the URL encoded and JSON data in request body
app.use(express.urlencoded({extended: false}));
app.use(express.json());



// Connect to MongoDB
connectDB();


//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));




// Public Routes
app.use('/', require('./routes/root'));



// Protected Routes
app.use('/user', require('./routes/user'));
app.use('/admin', require('./routes/admin'));




// Ignore the below routes
// StartUp Routes
app.use('/company', require('./routes/company'));

// Route for API in future uses.
app.use('/api', require('./routes/api'));




// Not Found Route
app.all('*', (req, res) => {
    res.status(404);
    res.send("404 Not Found");
});


// Start the server

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}/`));
});


// Initial Skeleton file structure for the backed is Created