const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

const otpStore = {};

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root", // change if needed
  database: "login",
});

db.connect((err) => {
  if (err) {
    console.log("MySQL connection failed:", err.message);
  } else {
    console.log("MySQL connected successfully");
  }
});

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "mananbhayani3@gmail.com",
    pass: "hgcgklnjsonklhmf", 
  },
});


app.post("/send-otp", (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);

  otpStore[email] = {
    otp,
    expires: Date.now() + 5 * 60 * 1000,
  };

  transporter.sendMail({
    from: "mananbhayani3@gmail.com",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
  });

  res.json({ message: "OTP sent" });
});

app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  const record = otpStore[email];

  if (!record)
    return res.status(400).json({ message: "OTP not found" });

  if (Date.now() > record.expires || record.otp != otp)
    return res.status(400).json({ message: "Invalid or expired OTP" });

  delete otpStore[email];
  res.json({ message: "OTP verified" });
});

app.post("/reset-password", (req, res) => {
  const { email, password } = req.body;

  const sql = "UPDATE users SET password = ? WHERE email = ?";
  db.query(sql, [password, email], (err) => {
    if (err) {
      return res.status(500).json({ message: "Update failed" });
    }
    res.json({ message: "Password updated" });
  });
});


/* ================= REGISTER ================= */
app.post("/register", (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  const checkSql = "SELECT * FROM users WHERE email = ?";
  db.query(checkSql, [email], (err, result) => {
    if (result.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const insertSql = "INSERT INTO users (email, password) VALUES (?, ?)";
    db.query(insertSql, [email, password], () => {
      res.json({ message: "Registration successful" });
    });
  });
});

/* ================= LOGIN VERIFY ================= */
app.post("/login-verify", (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, result) => {
    if (result.length === 0) {
      return res.status(400).json({ message: "Email not registered" });
    }

    if (result[0].password !== password) {
      return res.status(400).json({ message: "Password incorrect" });
    }

    res.json({ message: "Login successful" });
  });
});

/* ================= USERS LIST ================= */
app.get("/users", (req, res) => {
  const sql = "SELECT id, email FROM users";
  db.query(sql, (err, result) => {
    res.json(result);
  });
});

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const sql = "UPDATE users SET email = ? WHERE id = ?";

  db.query(sql, [email, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database update failed" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully" });
  });
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM users WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Delete failed" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  });
});







app.listen(5000, () => {
  console.log("Server running on port 5000");
});
