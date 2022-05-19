const mongoose = require("mongoose");

const trainerSchema = new mongoose.Schema({
  fullname: {
    type: String,
  },
  age: {
    type: Number,
  },
  mobile: {
    type: String,
  },

  package: {
    type: String,
  },
  salary: {
    type: Number,
  },
  // user: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
});

module.exports = mongoose.model("Trainer", trainerSchema);
