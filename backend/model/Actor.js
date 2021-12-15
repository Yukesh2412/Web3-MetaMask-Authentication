const mongoose = require("mongoose");

const actorSchema = new mongoose.Schema({
  // id: {
  //   type: String,
  // },
  // email: {
  //   type: String,
  //   required: true,
  // },
  // password: {
  //   type: String,
  //   required: true,
  // },
  blockchain_address: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Actor", actorSchema);
