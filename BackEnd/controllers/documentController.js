
const path = require('path');
const fs = require('fs');
const Document = require('../models/documentModel');


const validExtensions = ["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx"];

const getDocument = async (req, res) => {
    const { id } = req.params;
    // verify the extension of the file
    try {
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            throw Error("Whoops! File not found");
        }
        const document = await Document.findById(id).exec();
        console.log(document);
        if (!document) {
            throw Error("Whoops! File not found");
        }
        // const extension = document.name.split(".").pop();
        // if (!validExtensions.includes(extension)) {
        //     return res.status(400).json({ message: "Invalid file extension" });
        // }
        // verify the file path

        const filePath = path.join(__dirname,'..','files','documents',document.path);
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
                res.contentType("application/vnd.openxmlformats-officedocument.wordprocessingml.document");
                break;
            default:
                res.contentType("application/octet-stream");
                break;
        }

        fs.createReadStream(filePath).pipe(res);
    }
    catch (error) {
        res.status(500).render(path.join("public", "error.ejs"), {
            page: {
              title: "Document Error",
              name: "Error",
              description: "Error",
              path: "/admin/applications",
              type: "public",
              data : {
                  title : "No document Found",
                  message : error.message,
                  link :{
                        url : "/admin/applications",
                        text : "Go to Applications"
                  }
                },
            },
          });;
    }

}

const deleteDocument = async (req, res) => {
    const { id } = req.params;
    try {
        const document = await Document.findByIdAndDelete(id);
        if (!document) {
            return res.status(404).json({ message: "No document found" });
        }
        res.status(200).json({ message: "Document deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getDocument,
    deleteDocument,
};