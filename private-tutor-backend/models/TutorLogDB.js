const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const TutorLogSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  postal: {
    type: Number,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  contact_number: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  method: {
    type: [String],
    required: true,
  },
  subjects: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  // accept: {
  //   type: Boolean,
  //   required: true,
  // },
});
module.exports = TutorLogDB = mongoose.model("tutors", TutorLogSchema);
