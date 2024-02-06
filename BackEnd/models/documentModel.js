const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx"]
        },
        path: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: "pending",
            enum: ["pending", "approved", "rejected"]
        },
        uploadedBy: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Document', documentSchema);