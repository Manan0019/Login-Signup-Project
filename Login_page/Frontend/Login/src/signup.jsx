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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      // ❌ Error dialog
      setDialogMessage(data.message);
      setIsSuccess(false);
      setDialogOpen(true);
    } else {
      // ✅ Success dialog
      setDialogMessage("Thank you for registering! Please login to continue.");
      setIsSuccess(true);
      setDialogOpen(true);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);

    // ✅ Redirect ONLY after success
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
            placeholder="Email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />

          <input
            type="password"
            placeholder="Password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="glow-on-hover">Register</button>

          <p className="switch">
            Already have an account?
            <button
              type="button"
              className="link-btn"
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
