const express = require("express");
const cors = require("cors");
const { connect } = require("./utils/db");

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

connect().then(() => {
  console.log("MongoDB connected ✅");

  app.use("/api/auth", authRoutes);
  app.use("/api/tasks", taskRoutes);
});

app.get("/", (req, res) => res.send("Backend is running!"));

module.exports = app;
