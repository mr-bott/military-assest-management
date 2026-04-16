
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/seed", async (req, res) => {
  await User.deleteMany({});

  await User.insertMany([
    {
      name: "Admin",
      email: "admin@mail.com",
      password: "123456",
      role: "admin",
      base: "HQ",
    },
    {
      name: "Logistics",
      email: "log@mail.com",
      password: "123456",
      role: "logistics",
      base: "HQ",
    },
    {
      name: "Commander Alpha",
      email: "alpha@mail.com",
      password: "123456",
      role: "commander",
      base: "Alpha",
    },
    {
      name: "Commander Beta",
      email: "beta@mail.com",
      password: "123456",
      role: "commander",
      base: "Beta",
    },
    {
      name: "Commander Campa",
      email: "campa@mail.com",
      password: "123456",
      role: "commander",
      base: "Campa",
    },
  ]);

  res.json({ msg: "Users Seeded" });
});

router.post("/login", async (req, res) => {
  const user = await User.findOne(req.body);

  if (!user)
    return res.status(400).json({
      msg: "Invalid Credentials",
    });

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
      base: user.base,
      name: user.name,
    },
   process.env.JWT_SECERET
  );

  res.json({ token, user });
});

module.exports = router;