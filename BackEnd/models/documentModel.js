const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: [
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'text/plain',
            ]
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