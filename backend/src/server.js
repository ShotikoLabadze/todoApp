const express = require("express");
const cors = require("cors");
const { connect } = require("./utils/db");

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

connect().catch((err) => {
  console.error("MongoDB connection failed:", err);
});

module.exports = app;
