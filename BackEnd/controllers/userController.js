const path = require("path");
const User = require("../models/userModel");
const Application = require("../models/applicationModel");
const Documents = require("../models/documentModel");
const { query } = require("express");
const { roleConfig } = require("../config/roleConfig");
const { default: mongoose } = require("mongoose");
const validStatus = ["all","applied","approved","rejected","withdrawn","discrepancy"];
const formModel = require("../models/formModel");





const newApplication = async (req, res) => {
    const formid = req.query.id;
    const userid  = req.user.id;
    const user = await User.findById(userid);
    if(!user){
        return res.status(404).json({ message: "User not found" });
    }
    
    const { applicationName, description, email, phone, address, team } = req.body;
    console.log(formid);
    const form  = await formModel.findOne({"_id" : new mongoose.Types.ObjectId(formid)}).exec();
    if(!form){
        return res.status(404).json({ message: "Application not found" });
    }
    if(form.start > new Date()){
        return res.status(403).json({ message: "Application not started yet" });
    }
    if(form.deadline < new Date()){
        return res.status(403).json({ message: "Application closed" });
    }

    const application = new Application({
        name : applicationName,
        // logo,
        description,
        applicant: user,
        email,
        phone,
        address,
        status: "applied",
        form,
    });
    if (team) {
        application.team = team;
    }
    if (req.files) {
        if (req.files?.logo) {
            console.log(req.files.logo);
            application.logo = req.files.logo[0].filename;
        }
        
        if (req.files?.document) {
            for (let file of req.files.document) {
                console.log(file);
                try {
                    const document = new Documents({
                        name: file.originalname.slice(0, file.originalname.lastIndexOf(".")),
                        // path: file.path,
                        path: file.filename,
                        type: file.mimetype,
                        uploadedBy: user
                    });
                    const newDocument = await document.save();
                    application.document.push(newDocument);
                    
                } catch (error) {
                    res.status(400).json({ message: error.message });
                }
            }

        }
    }
    console.log(`application`);
    try {
        const newApplication = await application.save();
        console.log(newApplication);
        user.applications.push(newApplication);
        await user.save();
        res.redirect("/user/applications");
        // res.status(201).json("Application submitted successfully #" + newApplication.no );
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}


const formApplication = async (req, res) => {
    const id = req.query.id;
    console.log(id);
    if (id && mongoose.Types.ObjectId.isValid(id)) {
        const application = await formModel.findById(id).select("name _id start deadline").lean();
        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }
        // if(application.start > new Date()){
        //     return res.status(403).json({ message: "Application not started yet" });
        // }
        // if(application.deadline < new Date()){
        //     return res.status(403).json({ message: "Application closed" });
        // }
        res.render(path.join("user", "applicationForm.ejs"), {
            page: {
                title: "Applications",
                name: "Applications",
                description: "Applications",
                path: "/user/applications",
                type: "user",
                data: application,
                styles: ["applicationForm.css"],
                scripts: ["applicationForm.js"],
                loggedIn: req.isAuthenticated(),
            },
        });
    }   
}

const viewApplications = async (req, res) => {
    
  const status = req.query.status||"applied";
    try {
        const query =  status=='all'?{applicant: req.user.id}:{applicant: req.user.id,status : status};
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
        res.render(path.join("user", "applications.ejs"), {
            page: {
                title: "Applications",
                name: "Applications",
                description: "Applications",
                path: "/user/applications",
                type: "user",
                data: applications,
                status: { currentStatus: "all", validStatus },
                styles: ["applications.css"],
                scripts: ["applications.js"],
                loggedIn: req.isAuthenticated(),
            },
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}




module.exports = {
    newApplication,
    formApplication,
    viewApplications,
};

