const mongoose = require("mongoose");
module.exports = mongoose.model(
  "Assignment",
  new mongoose.Schema({
    equipmentType: String,
    quantity: Number,
    personnel: String,
    base: String,
    expended: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
  }),
);
