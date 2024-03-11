const path = require("path");
const formModel = require("../models/formModel");


const index = (req, res) => {
  res.render(path.join("public", "index.ejs"), {
    page: {
      title: "NSUT IIF",
      name: "Home",
      description: "Home",
      path: "/",
      type: "public",
      scripts: ["index.js"],
      loggedIn: req.isAuthenticated(),
    },
  });
};

const about = (req, res) => {
  res.render(path.join("public", "about.ejs"), {
    page: {
      title: "About NSUT IIF",
      name: "About",
      description: "About",
      path: "/about",
      type: "public",
      styles: ["about.css"],
      loggedIn: req.isAuthenticated(),
    },
  });
};

const event = (req, res) => {
  res.render(path.join("public", "event.ejs"), {
    page: {
      title: "Event",
      name: "Event",
      description: "Event",
      path: "/event",
      type: "public",
      loggedIn: req.isAuthenticated(),
    },
  });
};

const contact = (req, res) => {
  res.render(path.join("public", "contact.ejs"), {
    page: {
      title: "Contact",
      name: "Contact",
      description: "Contact",
      path: "/contact",
      type: "public",
      loggedIn: req.isAuthenticated(),
    },
  });
};
const startUPs = (req, res) => {
  res.render(path.join("public", "startup.ejs"), {
    page: {
      title: "Startups at NSUT IIF",
      name: "Startups",
      description: "Startups",
      path: "/startups",
      type: "public",
      scripts: ["startups.js"],
      loggedIn: req.isAuthenticated(),
    },
  });
};
const login = (req, res) => {
  res.render(path.join("public", "login.ejs"), {
    page: {
      title: "login at NSUT IIF",
      name: "login",
      description: "login",
      path: "/login",
      type: "public",
      loggedIn: req.isAuthenticated(),
    },
  });
};

const apply = async (req, res) => {  
  const today = new Date().toLocaleDateString('sv');
  try {
    const applications = await formModel.find({deadline : {$gte : today}}).lean();
    res.render(path.join("public", "apply.ejs"), {
      page: {
        title: "Apply at NSUT IIF",
        name: "Apply",
        description: "Apply",
        path: "/apply",
        type: "public",
        data: applications,
        loggedIn: req.isAuthenticated(),
      },
    });
  }
  catch (error) {
    // next(error)
    const x = 0;
  }
}


module.exports = {
  index,
  about,
  event,
  contact,
  startUPs,
  login,
  apply
};
