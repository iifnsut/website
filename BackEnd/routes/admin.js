const express = require('express');
const router = express.Router();
const path = require('path');
const adminController = require('../controllers/adminController');
const {fileUpload} = require('../middleware/fileUpload');
const loginAccessChecker = require('../middleware/loginAccessChecker');

const {roleConfig} = require('../config/roleConfig');


router.use(loginAccessChecker([roleConfig.admin]));

router.get('^/$', adminController.indexPage);


router.get('^/application(s)?', adminController.viewALLApplications);
router.patch('^/application(s)?/:id', adminController.updateApplication);

router.post('^/access', adminController.getAccessDetails);
router.patch('^/access', adminController.updateUsersAccess);

router.get('^/newApplicants', adminController.newApplicationForm);
// router.get('^/openApplicants', adminController.getOpenApplicants);
router.post('^/newApplicants', fileUpload, adminController.createOpenApplicant);


module.exports = router;