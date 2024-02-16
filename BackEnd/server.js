require("dotenv").config();
const path = require("path");
var passport = require("passport");

const express = require("express");
const session = require("express-session");
const ejsMate = require("ejs-mate");
const app = express();

// Adding the security headers

const helmet = require("helmet");
app.use(helmet(
  {
    contentSecurityPolicy: false,
  }

));


const methodOverride = require("method-override");

const mongoose = require("mongoose");
const { addAbortListener } = require("events");

// Adding mongoDB Sanitize
const mongoSanitize = require("express-mongo-sanitize");
app.use(mongoSanitize());

// Adding the XSS
const xss = require("xss-clean");
app.use(xss());

const connectDB = require("./config/dbConn");




const PORT = process.env.PORT || 5050;

// handling the method override to use the patch and delete request
app.use(methodOverride("_method"));

// For parsing the URL encoded and JSON data in request body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to MongoDB
connectDB();

//serve static files
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/logo", express.static(path.join(__dirname, "/files/logo")));

// Session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    // store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
  })
);
app.use(passport.authenticate("session"));
``
// User object available at req.session.passport.user
// Information in the user object can be changed at routes/api/auth.js:43:14 in passport.serializeUser



// Public Routes
app.use("/", require("./routes/root"));
app.use("/", require("./routes/api/auth"));

// Protected Routes
app.use('/user', require('./routes/user'));
app.use('/admin', require('./routes/admin'));


// For serving the protected documents files
app.use('/file(s)?', require('./routes/documents'));



// Ignore the below routes
// StartUp Routes
app.use("/company", require("./routes/company"));

// Route for API in future uses.
app.use("/api", require("./routes/api"));

// Not Found Route
app.all('*', (req, res) => {
    res.status(404);
    res.render(path.join("public", "error.ejs"), {
        page: {
          title: "Page Not Found",
          name: "Error",
          description: "Error",
          path: "/error",
          type: "public",
          data : {
              title : "Page Not Found",
              message : "The page you are looking for is not found",
              link :{
                    url : "/",
                    text : "Go to Home"
              }
            },
        },
      });
});

// Start the server 

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}/`));
});

// Initial Skeleton file structure for the backed is Created
