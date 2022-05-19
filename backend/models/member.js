const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  fullname: {
    type: String,
  },
  age: {
    type: Number,
  },
  mobile: {
    type: String,
  },
  hightWight: {
    type: Number,
  },
  illness: {
    type: String,
  },
  package: {
    type: String,
  },
  payment: {
    type: Number,
  },
  trainer: {
    type: String,
  },
  // user: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
});

module.exports = mongoose.model("Member", memberSchema);
