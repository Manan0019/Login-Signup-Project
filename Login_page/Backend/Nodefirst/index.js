const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "login",
});

db.connect((err) => {
  if (err) {
    console.log("MySQL connection failed:", err.message);
  } else {
    console.log("MySQL connected successfully");
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "INSERT INTO users (email, password) VALUES (?, ?)";

  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Database error" });
    } else {
      res.json({ message: "Data stored successfully" });
    }
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
