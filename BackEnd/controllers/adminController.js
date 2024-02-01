const path = require("path");
const Application = require("../model/applicationModel");
const { query } = require("express");

const validStatus = ["all","applied","approved","rejected","withdrawn","discrepancy"];

const viewALLApplications = async (req, res) => {
  const status = req.query.status||"applied";
  if(validStatus.indexOf(status)!=-1){
    const query =  status=='all'?{}:{status : status};
    try {
      const applications = await Application.find(query);
      // res.status(200).json(applications);
      // console.log(applications);
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
        },
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }  
  }
  else{
    res.status(400).json({ message: "Invalid request"});
  }
  
};

updateApplication = async (req, res) => {
  const { id } = req.params;
  const { responseType, response } = req.body;
  try {
    const application = await Application.findOne({applicationNo : id});
    if (!application) {
      return res.status(404).json({ message: "No application found" });
    }
    if (application.adminResponse !="pending" ) {
      return res.status(400).json({ message: "Application already reviewed" });
    }
    application.status = responseType;
    application.adminResponse = response;
    await application.save();
    res.redirect("/admin/applications");
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  viewALLApplications,
  updateApplication,
};

