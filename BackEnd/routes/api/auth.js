var express = require("express");
const { login } = require("../../controllers/publicController");
var passport = require("passport");
const User = require("../../models/userModel");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env["GOOGLE_CLIENT_ID"],
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        var user = await User.findOne({ googleId: profile.id });
        if (!user) {
          console.log("no user");
          const checkEmail = await User.findOneAndUpdate(
            { email: profile.emails[0].value },
            { googleId: profile.id }
          );
          if (checkEmail) {
            console.log("found email");
          } else {
            console.log("not found email");
            console.log(
              profile.emails[0].value,
              profile.displayName,
              profile.id
            );
            await User.create({
              name: profile.displayName,
              googleId: profile.id,
              email: profile.emails[0].value,
            });
          }
          user = await User.findOne({ googleId: profile.id });
          console.log(JSON.stringify(user));
        }
        return cb(null, user);
      } catch (err) {
        return cb(err);
      }
    }
  )
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { 
      name: user.name, 
      id : user._id,
      roles : user.roles
  });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

var router = express.Router();

router.get("/login(.html)?", login);
router.get(
  "/login/federated/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/");
  }
);

router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

// router.get("/logout", function (req, res, next) {
//   req.logout(function (err) {
//     if (err) {
//       return next(err);
//     }
//     res.redirect("/");
//   });
// });

module.exports = router;
