
const router = require("express").Router();
const auth = require("../middleware/auth");
const Asset = require("../models/Asset");

router.get(
  "/",
  auth(["admin", "commander"]),
  async (req, res) => {
    if (req.user.role === "admin") {
      const data = await Asset.find();
      return res.json(data);
    }

    const data = await Asset.find({
      base: req.user.base,
    });

    res.json(data);
  }
);

module.exports = router;