const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const caPath = path.join(__dirname, "../../ca.pem");

const db = mysql.createPool({
  uri: process.env.DATABASE_URL,
  ssl: {
    ca: fs.readFileSync(caPath),
  },
});

const connect = async () => {
  try {
    const conn = await db.getConnection();
    console.log("✅ Connected to Aiven MySQL");
    conn.release();
  } catch (err) {
    console.error("❌ Aiven MySQL connection failed:", err);
  }
};

module.exports = { db, connect };
