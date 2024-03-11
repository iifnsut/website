const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const formSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        organization: {
            type: String,
            // required: true,
        },
        start: {
            type: Date,
            required: true,
        },
        deadline: {
            type: Date,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        applicant: {
            type : mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        link : {
            type: String,
        },
        status: {
            type: String,
            default: "ongoing",
            enum: [
                "upcoming","ongoing" ,"closed"
            ]
        }       

    },
    {
        timestamps: true,
    }
);

formSchema.plugin(AutoIncrement, {inc_field: 'formId', start_seq: 1000, prefix: 'F-'});
const form = mongoose.model('OpenApplication', formSchema);
module.exports = form;

