const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dns = require("dns");
require("dotenv").config();

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL;

const allowedOrigins = [
  FRONTEND_URL,
  
];



const corsOptions = {
  origin: function (origin, callback) {
    // allow Postman / mobile apps / server calls
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("CORS Not Allowed"));
  },

  credentials: true,

  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],

  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error:", err));

app.use("/api/auth", require("./routes/auth"));

app.use("/api/dashboard", require("./routes/dashboard"));

app.use("/api/purchase", require("./routes/purchase"));

app.use("/api/transfer", require("./routes/transfer"));

app.use("/api/assignment", require("./routes/assignment"));

app.use("/api/assets", require("./routes/assets"));

app.get("/", (req, res) => {
  res.send("Military Asset API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Running On Port ${PORT}`));
