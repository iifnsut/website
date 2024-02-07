const mongoose = require("mongoose");

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

    // required: true,
  },
  role: {
    type: String,
    // required: true,
    enum: ["admin", "user"],
  },
  status: {
    type: Number,
    default: 1,
  },

  //  Public information

  equationalQualification: {
    type: Array,
  },
  college: {
    type: Array,
  },

  avatar: {
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
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
