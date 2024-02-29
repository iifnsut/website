const User = require("../models/userModel");
const path = require("path");
const {roleConfig} = require("../config/roleConfig");

const loginAccessChecker = (role) => {
  return async (req, res, next) => {
    if (req.isAuthenticated()) {
      try {
        const user = await User.findById(req.user.id).lean();
        if (!user) {
          err = new Error("User not found");
          err.status = 404;
          throw err;
        }
        
        if(user.status === roleConfig.blocked){
            err = new Error("Your account is blocked");
            err.status = 403;
            throw err;
        }
        if(req.user.name !== user.name){
          return res.status(403).json({ message: "You are not allowed to access this page" });
      }
        if (user.roles.some((r) => role.includes(r)) && req.user.roles.some((r) => role.includes(r))){
          return next();
        }else{  
          if(req.xhr || req.query.format === "json" || req.headers.accept.indexOf('json') > -1){
            return res.status(403).json({ message: "You are not allowed to access this page" });
          }else{
          err = new Error("You are not allowed to access this page");

          err.status = 403;
        throw err;
          }
        }
      } catch (err) {
        next(err);
      }
    }else{
      // console.log(req.xhr)
      if(req.xhr || req.query.format === "json" || req.headers.accept.indexOf('json') > -1){
        return res.status(401).json({ message: "Unauthorized" });
      }
    return res.redirect("/login");
    }
  };
};





module.exports = loginAccessChecker ;
