
const router = require("express").Router();
const auth = require("../middleware/auth");
const Asset = require("../models/Asset");
const Transaction = require("../models/Transaction");

router.get(
  "/",
  auth(["admin", "logistics", "commander"]),
  async (req, res) => {
    if (req.user.role === "admin") {
      const assets = await Asset.find();
      const logs = await Transaction.find()
        .sort({ date: -1 })
        .limit(10);

      return res.json({
        role: "admin",
        assets,
        logs,
      });
    }

    if (req.user.role === "logistics") {
      const logs = await Transaction.find({
        type: { $in: ["purchase", "transfer"] },
      })
        .sort({ date: -1 })
        .limit(10);

      return res.json({
        role: "logistics",
        logs,
      });
    }

    const assets = await Asset.find({
      base: req.user.base,
    });

    const logs = await Transaction.find({
      base: req.user.base,
    })
      .sort({ date: -1 })
      .limit(10);

    return res.json({
      role: "commander",
      base: req.user.base,
      assets,
      logs,
    });
  }
);

module.exports = router;