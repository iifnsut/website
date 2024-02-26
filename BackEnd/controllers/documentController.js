const path = require("path");
const fs = require("fs");
const Document = require("../models/documentModel");
const User = require("../models/userModel");
const { roleConfig } = require("../config/roleConfig");

const validExtensions = ["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx"];

const addDocument = async (req, res) => {
  if (req.files?.document) {
    for (let file of req.files.document) {
      console.log(file);
      try {
        const document = new Document({
          name: file.originalname.slice(0, file.originalname.lastIndexOf(".")),
          // path: file.path,
          path: file.filename,
          type: file.mimetype,
          uploadedBy: req.user.id,
        });
        const newDocument = await document.save();
        res
          .status(201)
          .json({
            message: "Document added successfully",
            document: newDocument._id,
          });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    }
  }
};

const getDocument = async (req, res) => {
  const { id } = req.params;

  // verify the extension of the file
  try {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw Error("Whoops! File not found");
    }
    const document = await Document.findById(id).lean();
    console.log(document);
    if (!document) {
      throw Error("Whoops! File not found");
    }
    const user = await User.findById(req.user.id).exec();
    if (!user) {
      throw Error("Whoops! File not found");
    }
    if (user.status === roleConfig.blocked) {
      throw Error("Your account is blocked");
    }
    if (!user.roles.includes(roleConfig.admin)) {
      if (
        document.uploadedBy.toString() !== req.user.id.toString() ||
        req.user.name !== user.name
      ) {
        throw Error("You are not allowed to access this page");
      }
    }

    // const extension = document.name.split(".").pop();
    // if (!validExtensions.includes(extension)) {
    //     return res.status(400).json({ message: "Invalid file extension" });
    // }
    // verify the file path

    const filePath = path.join(
      __dirname,
      "..",
      "files",
      "documents",
      document.path
    );
    if (!fs.existsSync(filePath)) {
      throw new Error("Whoops! File not found");
    }
    // const document = await fs.readFileSync(filePath);
    // Send file to the user using streams
    switch (document.type) {
      case "pdf":
        // Remove the content type header
        res.contentType("application/pdf");
        break;
      case "application/pdf":
        res.contentType("application/pdf");
        break;
      case "text/plain":
        res.contentType("text/plain");
        break;
      case "application/msword":
        res.contentType("application/msword");
        break;
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        res.contentType(
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        );
        break;
      default:
        res.contentType("application/octet-stream");
        break;
    }

    fs.createReadStream(filePath).pipe(res);
  } catch (error) {
    res.status(500).render(path.join("public", "error.ejs"), {
      page: {
        title: "Document Error",
        name: "Error",
        description: "Error",
        path: "/admin/applications",
        type: "public",
        data: {
          title: "Go Back to Home Page",
          message: error.message,
          link: {
            url: `${req.user.roles.includes(roleConfig.admin) ? "/admin/applications" : "/user/applications"}`,
            text: "Go Back to Home Page",
          },
        },
        logggedIn: req.isAuthenticated(),
      },
    });
  }
};

const deleteDocument = async (req, res) => {
  const { id } = req.params;
  try {
    const document = await Document.findByIdAndDelete(id);
    if (!document) {
      return res.status(404).json({ message: "No document found" });
    }
    res.status(200).json({ message: "Document deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    addDocument,
  getDocument,
  deleteDocument,
};
