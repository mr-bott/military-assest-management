
const mongoose = require("mongoose");

module.exports = mongoose.model(
  "User",
  new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String, // admin logistics commander
    base: String, // Alpha Beta Campa
  })
);