import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import "./login.css";

function ForgotPassword({ goLogin }) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // SEND OTP
  const handleSendOtp = async () => {
    if (!email || !isValidEmail(email)) {
      setDialogMessage("Please enter a valid email");
      setDialogOpen(true);
      return;
    }

    await fetch("http://localhost:5000/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    setOtpSent(true);
    setDialogMessage("OTP sent to your email");
    setDialogOpen(true);
  };

  // VERIFY OTP
  const handleVerifyOtp = async () => {
    if (!otp) {
      setDialogMessage("Please enter OTP");
      setDialogOpen(true);
      return;
    }

    const res = await fetch("http://localhost:5000/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const data = await res.json();

    if (!res.ok) {
      setDialogMessage(data.message);
      setDialogOpen(true);
    } else {
      setOtpVerified(true);
      setDialogMessage("OTP verified. Set new password.");
      setDialogOpen(true);
    }
  };

  // RESET PASSWORD
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!password || password.length < 6) {
      setDialogMessage("Password must be at least 6 characters");
      setDialogOpen(true);
      return;
    }

    await fetch("http://localhost:5000/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setDialogMessage("Password updated successfully. Please login.");
    setDialogOpen(true);
    setTimeout(goLogin, 1500);
  };

  return (
    <div className="mainbg">
      <div className="middle">
        <button type="button" className="back-link" onClick={goLogin}>
          ← Back to Login
        </button>
        <h2 className="welcome">Forgot Password</h2>

        {!otpSent && (
          <>
            <input
              className="form-control emaildiv"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="glow-on-hover"
              type="button"
              onClick={handleSendOtp}
            >
              Send OTP
            </button>
          </>
        )}

        {otpSent && !otpVerified && (
          <>
            <input
              className="form-control emaildiv"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              className="glow-on-hover"
              type="button"
              onClick={handleVerifyOtp}
            >
              Verify OTP
            </button>
          </>
        )}

        {otpVerified && (
          <form onSubmit={handleResetPassword}>
            <input
              type="password"
              className="form-control passworddiv"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="glow-on-hover">Reset Password</button>
          </form>
        )}
      </div>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Message</DialogTitle>
        <DialogContent>{dialogMessage}</DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ForgotPassword;
