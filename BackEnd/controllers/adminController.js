const Company = require('../model/companyModel');
// const User = require('../model/user');
const path = require('path');


// View all Company
const viewAllCompany = async (req, res) => {
    try {
        const company = await Company.find({status:1}).sort({updated_by: "desc"}).exec();
        // res.status(200).json(company);
        res.render(path.join(__dirname, '..', 'views', 'adminDashBoard.ejs', ), {company});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// View a single Company
const viewSingleCompany = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        res.status(200).json(company);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


exports.viewAllCompany = viewAllCompany;
