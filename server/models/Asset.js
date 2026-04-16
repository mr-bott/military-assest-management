
const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Asset",
  new mongoose.Schema({
    base: String,
    equipmentType: String,
    quantity: Number,
  })
);