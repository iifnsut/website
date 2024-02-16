const mongoose = require("mongoose");

const Document = require("./documentModel");
const Application = require("./applicationModel");

const { roleConfig } = require("../config/roleConfig");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  // Geneal information
  name: {
    type: String,
    // required: true,
  },
  gender: {
    type: String,
    // required: true,
    enum: ["male", "female", "other"],
  },
  dob: {
    type: Date,
    // required: true,
  },
  address: {
    type: String,
    // required: true,
  },
  phone: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    // required: true,
  },

  //  Private information
  googleId: {
    type: String,
    // required: true,
  },
  AdharaNo: {
    type: Number,
    // required: true,
  },
  panNo: {
    type: String,
    // required: true,
  },
  password: {
    type: String,
  //  Private information
  },
  googleId: {
    type: String,
    // required: true,
  },
  AdharaNo: {
    type: Number,
    // required: true,
  },
  panNo: {
    type: String,
    // required: true,
  },
  password: {
    type: String,

    // required: true,
  },
  roles: {
    type: Number,
    // required: true,
    enum: [Object.values(roleConfig)],
    default: roleConfig.user,
    require: true,
  },
  status: {
    type: Number,
    default: 1,
  },

  //  Public information

  equationalQualification: [{
    instituteName: {
      type: String,
      // required: true,
    },
    degree: {
      type: String,
      // required: true,
    },
    branch: {
      type: String,
      // required: true,
    },
    year: {
      type: Number,
      // required: true,
    },
    percentage: {
      type: Number,
      min: 0,
      max: 100,
      // required: true,
    }
  }
  ],
  

  avatar: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  document: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Document,
  },
  applications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: Application,
  }]},
  { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;

