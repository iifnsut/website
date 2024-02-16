const path = require("path");
const User = require("../models/userModel");
const Application = require("../models/applicationModel");
const Documents = require("../models/documentModel");
const { query } = require("express");
const { roleConfig } = require("../config/roleConfig");
const validStatus = ["all","applied","approved","rejected","withdrawn","discrepancy"];




const newApplication = async (req, res) => {
    // console.log(req.files);
    // if(!req.user && !req.user.id ){
    //     res.status(403).json({ message: "Forbidden" });
    // }
    const id = "65cf542f4e5a2ca71152a7e5";
    // const User = await User.findById(req.user._id).exec();
    const user = await User.findById(id);
    if(!user){
        res.status(404).json({ message: "User not found" });
    }
    
    const { applicationName, description, email, phone, address, team } = req.body;
    console.log(applicationName, description, email, phone, address);
    const application = new Application({
        name : applicationName,
        // logo,
        description,
        applicant: user.name,
        email,
        phone,
        address,
        status: "applied",
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
        res.status(201).json("Application submitted successfully");
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}


const formApplication = async (req, res) => {
    res.render(path.join("user", "applicationForm.ejs"), {
        page: {
            title: "Applications",
            name: "Applications",
            description: "Applications",
            path: "/user/applications",
            type: "user",
            // styles: ["applicationForm.css"],
            scripts: ["applicationForm.js"],
        },
    });
}

const viewApplications = async (req, res) => {
    try {
        const applications = await Application.find({applicant : req.user.name}).populate('document').exec();
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    newApplication,
    formApplication,
    viewApplications,
};

