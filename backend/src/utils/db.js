const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const connect = async () => {
  try {
    await db.getConnection();
    console.log("✅ Connected to MySQL");
  } catch (err) {
    console.error("❌ MySQL connection failed:", err);
  }
};
module.exports = { db, connect };
