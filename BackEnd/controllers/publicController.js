const path = require("path");

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

module.exports = {
  index,
  about,
  event,
  contact,
  startUPs,
  login,
};
