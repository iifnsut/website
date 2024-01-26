const Company = require('../model/companyModel');
// const User = require('../model/user');

// Create and Save a new Company
const createNewCompany = async (req, res) => {
    try {
        console.log(req.body);
        const { name, address, phone, email, website, logo, description, document, created_by } = req.body;
        const company = new Company({
            name,
            address,
            phone,
            email,
            website,
            logo,
            description,
            document,
            team : [created_by],
            created_by
            // created_by: req.user._id,
            // updated_by: req.user._id,
        });
        const newCompany = await company.save();
        // res.status(201).json(newCompany);
        console.log(newCompany);
        res.status(201).redirect('/company');
    } catch (error) {
        res.status(409).json({ message: error.message });
    }

};


// Delete a Company with the specified id in the request
const deleteCompany = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (company) {
            await company.remove();
            res.status(200).json({ message: 'Company removed' });
        } else {
            res.status(404).json({ message: 'Company not found' });
        }
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};



exports.createNewCompany = createNewCompany;