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
        website : {
            type: String,
        },
        

    },
    {
        timestamps: true,
    }
);

applicationSchema.plugin(AutoIncrement, {inc_field: 'openApplicationId'});
const OpenApplication = mongoose.model('OpenApplication', applicationSchema);
module.exports = OpenApplication;

