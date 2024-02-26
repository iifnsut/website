const mongoose = require("mongoose");

const Document = require("./documentModel");
const Application = require("./applicationModel");

const { roleConfig } = require("../config/roleConfig");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  // Geneal information
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  dob: {
    type: Date,
  },
  address: [{
    houseNo: {
      type: String,
    },
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    pincode: {
      type: Number,
    },
    country: {
      type: String,
    },
  
  }],
  phone: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },

  //  Private information
  googleId: {
    type: String,
    required: true,
  },
  AdharaNo: {
    type: Number,
  },
  panNo: {
    type: String,
  },
  password: {
    type: String,
  //  Private information
  },
  avatar: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  isComplete: {
    type: Boolean,
    default: false,
  },
  
  roles: {
    type: Array,
    // required: true,
    default: [roleConfig.user],
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


  // Private information
  document: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Document,
  },
  applications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: Application,
  }]},
  { timestamps: true });


module.exports = mongoose.model("User", userSchema);

