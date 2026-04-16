const mongoose = require("mongoose");
module.exports = mongoose.model(
  "Transfer",
  new mongoose.Schema({
    equipmentType: String,
    quantity: Number,
    fromBase: String,
    toBase: String,
    date: { type: Date, default: Date.now },
  }),
);
