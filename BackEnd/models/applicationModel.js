const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Documents = require('./documentModel');
const User = require('./userModel');
const OpenApplicant = require('./openApplicantModel');




const applicationSchema = new mongoose.Schema(
    {
        // General Information of the Applicant
        form: {
            type : mongoose.Schema.Types.ObjectId,
            ref: 'OpenApplicant',
        },
        name: {
            type: String,
            required: true,
        },
        logo: {
            type: String,
        },
        description: {
            type: String,
        },
        // Details of the Applicant
        applicant: {
            type : mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        address: {
            type: String,
        },

        // Team Details
        team: {
            type: Array,
        },
        // Document Details
        document: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: Documents,
            }
        ],
        // Status of the Application
        status: {
            type: String,
            default: "pending",
            enum: [
                "pending","applied" ,"approved", "rejected", 
                "withdrawn", "discrepancy", "resubmitted"
            ]
        },
        pitch: 
            {
            pitchStatus: {
                type: String,
                default: "not submitted",
                enum: [
                    "pending","approved", "rejected", "not submitted"
                ]},
            date: {
                type: Date,
            },
            time: {
                type: String,
            }
        },
        userResponse: {
            type: String,
            default: "pending"
        },
        adminResponse: {
            type: String,
            default: "pending"
        },
        logs: [{
            date: {
                type: Date,
                default: Date.now,
            },
            status: {
                type: String,
                enum: [
                    "pending","applied" ,"approved", "rejected", 
                    "withdrawn", "discrepancy", "resubmitted"
                ]
            },
            user: {
                type: String,
                enum: [
                    "applicant", "admin"
                ]
            },
            message: {
                type: String,
            },
        }],

    },
    { timestamps: true }
);




applicationSchema.plugin(AutoIncrement, { 
    inc_field: 'no',
    id : 'application_seq',
    start_seq: 1000 
});

module.exports = mongoose.model('Application', applicationSchema);
