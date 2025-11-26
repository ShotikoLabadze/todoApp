require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const { connect } = require("./utils/db");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

connect().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log("Server running...");
  });
});
