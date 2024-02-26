const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const applicationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        organization: {
            type: String,
            required: true,
        },
        openDate: {
            type: Date,
            required: true,
        },
        closeDate: {
            type: Date,
            required: true,
        },
        description: {
            type: String,
        },
        applicant: {
            type : mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        website : {
            type: String,
        },
        requiredDocuments: {
            type: Array,
        },
        logo : {
            type: String,
        },
        logs : {
            type: Array,
        },

        // document: [
        //     {
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref: 'Document',
        //     }
        // ],


    },
    {
        timestamps: true,
    }
);

applicationSchema.plugin(AutoIncrement, {inc_field: 'openApplicationId'});
const OpenApplication = mongoose.model('OpenApplication', applicationSchema);
module.exports = OpenApplication;

