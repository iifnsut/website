const express = require('express');
const router = express.Router();
const path = require('path');
const eventController = require('../controllers/eventController');
const {roleConfig} = require('../config/roleConfig');
const loginAccessChecker = require('../middleware/loginAccessChecker');
const multer  = require('multer');
const upload = multer();
const methodOverride = require('method-override');
router.use(methodOverride('_method'));

// router.get('^/event/:id', eventController.viewEvent);
router.use(loginAccessChecker([roleConfig.admin, roleConfig.subAdmin]));
router.get('^/$', eventController.index);
router.post('^/$',upload.none(), eventController.createEvent);
router.get('^/new', eventController.newEventForm);
router.delete('^/:id', eventController.deleteEvent)
// router.get('^/event/edit/:id', eventController.editEventForm);
// router.patch('^/event/:id', eventController.updateEvent);


module.exports = router;