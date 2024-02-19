const User = require("../models/userModel");
const path = require("path");
const {roleConfig} = require("../config/roleConfig");

const loginAccessChecker = (role) => {
  return async (req, res, next) => {
    if (req.isAuthenticated()) {
      try {
        const user = await User.findById(req.user.id).exec();
        
        if(user.status === roleConfig.blocked){
            err = new Error("Your account is blocked");
            err.status = 403;
            throw err;
        }
        if (user.roles.some((r) => role.includes(r)) && req.user.roles.some((r) => role.includes(r))){
          return next();
        }else{
          err = new Error("You are not allowed to access this page");

          err.status = 403;
        throw err;
        }
      } catch (err) {
        next(err);
      }
    }else{
    return res.redirect("/login");
    }
  };
};

module.exports = loginAccessChecker ;
