
const router = require("express").Router();
const auth = require("../middleware/auth");
const Asset = require("../models/Asset");
const Transaction = require("../models/Transaction");

router.post(
  "/",
  auth(["admin", "logistics"]),
  async (req, res) => {
    const { base, equipmentType, quantity } =
      req.body;

    let item = await Asset.findOne({
      base,
      equipmentType,
    });

    if (item) {
      item.quantity += Number(quantity);
      await item.save();
    } else {
      await Asset.create({
        base,
        equipmentType,
        quantity,
      });
    }

    await Transaction.create({
      type: "purchase",
      equipmentType,
      quantity,
      base,
      doneBy: req.user.name,
    });

    res.json({ msg: "Purchased" });
  }
);

module.exports = router;