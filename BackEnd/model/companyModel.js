const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const companySchema = new Schema({
    name: {
        type: String,
        // required: true,
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
        // required: true,
    },
    email: {
        type: String,
        // required: true,
    },
    website: {
        type: String,
    },
    logo: {
        type: String,
        // required: true,
    },
    description: {
        type: String,
        // required: true,
    },
    document: {
        type: Array,
        // required: true,
    },
    team: {
        type: Array,
        // required: true,
    },
    status: {
        type: Number,
        default: 1
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    // created_by: {
        // type: String,
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'User'
        // required: true,
    // },
    updated_at: {
        type: Date,
        default: Date.now
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

module.exports = mongoose.model('Company', companySchema);