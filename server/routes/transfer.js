
const router = require("express").Router();
const auth = require("../middleware/auth");
const Asset = require("../models/Asset");
const Transaction = require("../models/Transaction");

router.post(
  "/",
  auth(["admin", "logistics"]),
  async (req, res) => {
    const {
      fromBase,
      toBase,
      equipmentType,
      quantity,
    } = req.body;

    const from = await Asset.findOne({
      base: fromBase,
      equipmentType,
    });

    if (!from || from.quantity < quantity)
      return res.json({
        msg: "Not Enough Stock",
      });

    from.quantity -= Number(quantity);
    await from.save();

    let to = await Asset.findOne({
      base: toBase,
      equipmentType,
    });

    if (to) {
      to.quantity += Number(quantity);
      await to.save();
    } else {
      await Asset.create({
        base: toBase,
        equipmentType,
        quantity,
      });
    }

    await Transaction.create({
      type: "transfer",
      equipmentType,
      quantity,
      fromBase,
      toBase,
      doneBy: req.user.name,
    });

    res.json({ msg: "Transferred" });
  }
);

module.exports = router;