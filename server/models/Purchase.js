const mongoose = require("mongoose");
module.exports = mongoose.model(
  "Purchase",
  new mongoose.Schema({
    equipmentType: String,
    quantity: Number,
    base: String,
    date: { type: Date, default: Date.now },
  }),
);
