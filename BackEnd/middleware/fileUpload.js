const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === "document") {
            cb(null, path.join("files", "documents"));
        } else if (file.fieldname === "logo") {
            cb(null, path.join("files", "logo"));
        }
    }
});


const checkFileType = (file, cb) => {
    const fileTypes = /pdf|doc|docx|txt/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb("Error: Documents Only!");
    }
}

const fileUpload = (req, res, next) => {
    console.log(req.body);
    upload(req, res, (err) => {
        if (err) {
            res.status(400).json({ message: err });
        } else {
            next();
        }
    });
}

const logoStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join("files", "logo"));
    }
});

const checkImgFileType = (file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb("Error: Images Only!");
    }
}


const logoUpload = multer({
    storage: logoStorage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        checkImgFileType(file, cb);
    },
}).single("logo");

const logoFileUpload = (req, res, next) => {
    console.log(req.body);
    logoUpload(req, res, (err) => {
        if (err) {
            res.status(400).json({ message: err });
        } else {
            // console.log(req.file);
            next();
        }
    });
}

const upload = multer({
    storage: storage,
    limits: { fileSize: "2mb" },
    // limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        if (file.fieldname === "document") {
            checkFileType(file, cb);
        } else if (file.fieldname === "logo") {
            checkImgFileType(file, cb);
        }
    },
}).fields([{ name: "document", maxCount: 10 }, { name: "logo", maxCount: 1 }]);

module.exports = { fileUpload };