const express = require('express');
const router = express.Router();
const path = require('path');
const adminController = require('../controllers/adminController');

// router.use((req, res, next) => {
//     console.log(req);
//     if (req.user) {
//         next();
//     } else {
//         res.status(403);
//         res.render(path.join("public", "error.ejs"), {
//             page: {
//                 title: "Forbidden",
//                 name: "Error",
//                 description: "Error",
//                 path: "/error",
//                 type: "public",
//                 data: {
//                     title: "Forbidden",
//                     message: "You are not allowed to access this page",
//                     link: {
//                         url: "/",
//                         text: "Go to Home"
//                     }
//                 },
//             },
//         });
//     }

// }
// );

router.get('^/$', adminController.indexPage);


router.get('^/application(s)?', adminController.viewALLApplications);
router.patch('^/application(s)?/:id', adminController.updateApplication);


module.exports = router;