const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL);

app.use("/api/auth", require("./routes/auth"));
app.use("/api/dashboard", require("./routes/dashboard"));
app.use("/api/purchase", require("./routes/purchase"));
app.use("/api/transfer", require("./routes/transfer"));
app.use("/api/assignment", require("./routes/assignment"));
app.use("/api/assets", require("./routes/assets"));

app.listen(5000, () => console.log("Server Running"));