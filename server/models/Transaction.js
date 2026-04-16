// ================================
// server/models/Transaction.js
// ================================
const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Transaction",
  new mongoose.Schema({
    type: String, // purchase transfer assignment expend
    equipmentType: String,
    quantity: Number,
    fromBase: String,
    toBase: String,
    base: String,
    doneBy: String,
    date: {
      type: Date,
      default: Date.now,
    },
  })
);