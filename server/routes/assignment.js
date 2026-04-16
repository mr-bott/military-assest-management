
const router = require("express").Router();
const auth = require("../middleware/auth");
const Asset = require("../models/Asset");
const Transaction = require("../models/Transaction");

router.post(
  "/",
  auth(["admin", "commander"]),
  async (req, res) => {
    const {
      equipmentType,
      quantity,
      soldier,
    } = req.body;

    const base =
      req.user.role === "admin"
        ? req.body.base
        : req.user.base;

    const item = await Asset.findOne({
      base,
      equipmentType,
    });

    if (!item || item.quantity < quantity)
      return res.json({
        msg: "Insufficient Stock",
      });

    item.quantity -= Number(quantity);
    await item.save();

    await Transaction.create({
      type: "assignment",
      equipmentType,
      quantity,
      base,
      doneBy: soldier,
    });

    res.json({ msg: "Assigned" });
  }
);

module.exports = router;