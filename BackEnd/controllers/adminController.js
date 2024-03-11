const path = require("path");
const Application = require("../models/applicationModel");
const { query } = require("express");
const { roleConfig } = require("../config/roleConfig");
const User = require("../models/userModel");  
const forms = require("../models/formModel");
const validStatus = ["all","applied","approved","rejected","withdrawn","discrepancy"];
const mongoose = require("mongoose");

const viewALLApplications = async (req, res) => {
  const status = req.query.status||"applied";
  if(validStatus.indexOf(status)!=-1){
    const query =  status=='all'?{status: {$ne : "pending"}}:{status : status};
    try {
      const applications = await Application.find(query).populate([
        {
          path: "document",
          select: "name path",
      },
      {
          path: "applicant",
          select: "name  _id",
      }
      ]).lean();
      // res.status(200).json(applications);
      res.render(path.join("admin", "applications.ejs"), {
        page: {
          title: "Applications",
          name: "Applications",
          description: "Applications",
          path: "/admin/applications",
          type: "admin",
          data: applications,
          status: {currentStatus: status,validStatus},
          styles : ["applications.css"],
          scripts: ["applications.js"],
          loggedIn: req.isAuthenticated(),
        },
      });
    } catch (error) {
      res.status(500);
      res.render(path.join("public", "error.ejs"), {
        page: {
          title: "Page Not Found",
          name: "Error",
          description: "Error",
          path: "admin/applications",
          type: "public",
          data : {
              title : "Error Occured",
              message : error.message,
              link :{
                    url : "/admin/applications",
                    text : "Go to Applications"
              }
            },
          
      loggedIn: req.isAuthenticated(),
        },
      });
    }  
  }
  else{
    res.status(400).json({ message: "Invalid request"});
  }
  
};

const updateApplication = async (req, res) => {
  const { id } = req.params;
  const { responseType, response,pitchDate } = req.body;
  try {
    const application = await Application.findOne({no : id}).exec();
    if (!application) {
      return res.status(404).render(path.join("public", "error.ejs"), {
        page: {
          title: "Application Not Found",
          name: "Error",
          description: "Error",
          path: "admin/applications",
          type: "public",
          data : {
              title : "Application Not Found",
              message : "Application with the given ID not found",
              link :{
                    url : "/admin/applications",
                    text : "Go to Applications"
              }
            },
        },
      });;
    }
    if (application.adminResponse !="pending" && application.status!="applied") {
      return res.status(400).json({ message: "Application already reviewed" });
    }
    application.status = responseType;
    application.adminResponse = response;
    console.log(responseType);
    if(responseType=="approved"){
      application.pitch.pitchStatus = "pending";
      console.log(pitchDate);
      application.pitch.date = pitchDate;
    }
    await application.save();
    res.redirect("/admin/applications");
  }
  catch (error) {
    res.status(500);
      res.render(path.join("public", "error.ejs"), {
        page: {
          title: "Page Not Found",
          name: "Error",
          description: "Error",
          path: "admin/applications",
          type: "public",
          data : {
              title : "Error Occured",
              message : error.message,
              link :{
                    url : "/admin/applications",
                    text : "Go to Applications"
              }
            },
        },
      });
  }
}


const indexPage = async (req, res ) => {
  let openApplicationNo = await forms.countDocuments({ deadline : {$gte : new Date()}, status : {$ne : "closed"}}).lean();
  console.log(openApplicationNo);
  res.render(path.join("admin", "index.ejs"), {
    page: {
      title: "Admin",
      name: "Admin",
      description: "Admin",
      path: "/admin",
      type: "admin",
      scripts : ["adminindex.js"],
      data : {
        name : req.user.name,
        openApplicationNo : openApplicationNo,
      }
    },
  });
}



// Add and Remove Admin Access and Permissions along with blocking and unblocking users
const getAccessDetails = async (req, res) => {
  if (!req.body.email) {
    return res.status(400).json({ message: "Email not provided" });
  }
  const { email } = req.body;
  console.log(email);
  try {
    const user = await User.findOne({ email }).select("name email roles status _id").lean();
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // changing roles to keyname
    user.roles = user.roles.map((role) => {
      const key = Object.keys(roleConfig).find((key) => roleConfig[key] === role);
      return key;
    });

    res.status(200).json(user);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const updateUsersAccess = async (req, res) => {
  const { email, roles, status } = req.body;
  console.log(email, roles, status, "update access");
  try {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.roles = roles.map((role) => roleConfig[role]);
    user.status = status?status: 0;
    await user.save();
    res.status(200).json({ message: "User roles and status updated" });
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Form for creating new Open Applicants
const newApplicationForm = (req, res) => {
  res.render(path.join("admin", "newApplicationForm.ejs"), {
    page: {
      title: "New Applicants",
      name: "New Applicants",
      description: "new Applicants",
      path: "/admin/newApplicants",
      type: "admin",
      scripts: [
        "https://cdn.ckeditor.com/ckeditor5/41.1.0/decoupled-document/ckeditor.js",
        "newopenApplicarionform.js"
    ],
      loggedIn: req.isAuthenticated(),
    },
  });
}

// fetching and creating new Open Applicants
const getforms = async (req, res) => {
  try {
    const forms = await forms.find({}).exec();
    res.status(200).json(forms);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}


const createform = async (req, res) => {
  const { name, description, link, start, deadline } = req.body;
  try {
    const newform = new forms({
      name,
      description,
      website : link,
      start : new Date(start),
      deadline : new Date(deadline),
      applicant :  new mongoose.Types.ObjectId(req.user._id),
    });
    await newform.save();
    console.log(newform);
    res.status(201).json({ message: "New Open Applicant created" });
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// New Event Form
const newEventForm = (req, res) => {
  res.render(path.join("admin", "newEventForm.ejs"), {
    page: {
      title: "New Event",
      name: "New Event",
      description: "New Event",
      path: "/admin/newEvent",
      type: "admin",
      styles: ["photoPreview.css"],
      scripts: [ 'photoPreview.js'],
      loggedIn: req.isAuthenticated(),
    },
  });
}

// saving new Event
const createEvent = async (req, res) => {
  const { name, description, date, location, type ,link, form } = req.body;
  try {
    const newEvent = new Event({
      name,
      description,
      event_date: new Date(date),
      event_location: location,
      event_type: type,
    });
    if (link) {
      newEvent.event_link = link;
    }
    if (form) {
      newEvent.form = mongoose.Types.ObjectId(form);
    }
    await newEvent.save();
    res.status(201).json({ message: "New Event created" });
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}




module.exports = {
  viewALLApplications,
  updateApplication,
  indexPage,
  getAccessDetails,
  updateUsersAccess,
  newApplicationForm,
  getforms,
  createform,
  newEventForm,
};

