const path = require("path");
const Application = require("../models/applicationModel");
const { query } = require("express");

const validStatus = ["all","applied","approved","rejected","withdrawn","discrepancy"];

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


const indexPage = (req, res ) => {
  res.render(path.join("admin", "index.ejs"), {
    page: {
      title: "Admin",
      name: "Admin",
      description: "Admin",
      path: "/admin",
      type: "admin",
    },
  });
}

module.exports = {
  viewALLApplications,
  updateApplication,
  indexPage,
};

