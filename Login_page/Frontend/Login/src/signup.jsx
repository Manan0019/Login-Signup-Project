import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import "./login.css";

function Signup({ goLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔴 EMAIL EMPTY CHECK
    if (!email) {
      setDialogMessage("Please enter your email");
      setIsSuccess(false);
      setDialogOpen(true);
      return;
    }

    // 🔴 EMAIL FORMAT CHECK
    if (!isValidEmail(email)) {
      setDialogMessage("Please enter a valid email address");
      setIsSuccess(false);
      setDialogOpen(true);
      return;
    }

    // 🔴 PASSWORD EMPTY CHECK
    if (!password) {
      setDialogMessage("Please enter your password");
      setIsSuccess(false);
      setDialogOpen(true);
      return;
    }

    // 🔴 PASSWORD LENGTH CHECK (recommended)
    if (password.length < 6) {
      setDialogMessage("Password must be at least 6 characters long");
      setIsSuccess(false);
      setDialogOpen(true);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setDialogMessage(data.message);
        setIsSuccess(false);
        setDialogOpen(true);
      } else {
        setDialogMessage(
          "Thank you for registering! Please login to continue."
        );
        setIsSuccess(true);
        setDialogOpen(true);
      }
    } catch (error) {
      setDialogMessage("Registration failed. Please try again.");
      setIsSuccess(false);
      setDialogOpen(true);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);

    if (isSuccess) {
      goLogin();
    }
  };

  return (
    <div className="mainbg">
      <div className="middle">
        <h2 className="welcome">Register</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="form-control emaildiv"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />

          <input
            type="password"
            placeholder="Password"
            className="form-control passworddiv"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="glow-on-hover button">Register</button>

          <p className="switch newhere">
            Already have an account?
            <button
              type="button"
              className="link-btn regibtn"
              onClick={goLogin}
            >
              Login
            </button>
          </p>
        </form>
      </div>

      {/* 🔔 THANK YOU / ERROR DIALOG */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>
          {isSuccess ? "Registration Successful" : "Registration Error"}
        </DialogTitle>

        <DialogContent>{dialogMessage}</DialogContent>

        <DialogActions>
          <Button onClick={handleDialogClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Signup;
