const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const applicationSchema = new mongoose.Schema(
    {
        // General Information of the Applicant
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
            type: String,
            // type : mongoose.Schema.Types.ObjectId,
            // ref: 'User',
            required: true,

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
        document: {
            type: Object,
        },

        // Status of the Application
        status: {
            type: String,
            default: "pending",
            enum: [
                "pending","applied" ,"approved", "rejected", 
                "withdrawn", "discrepancy"
            ]
        },
        userResponse: {
            type: String,
            default: "pending"
        },
        adminResponse: {
            type: String,
            default: "pending"
        },

    },
    { timestamps: true }
);

applicationSchema.plugin(AutoIncrement, { 
    inc_field: 'applicationNo',
    id : 'application_seq',
    start_seq: 1000 
});

module.exports = mongoose.model('Application', applicationSchema);
