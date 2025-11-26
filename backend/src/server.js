const express = require("express");
const app = express();
const cors = require("cors");
const { connect } = require("./utils/db");

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

connect();

module.exports = app;
