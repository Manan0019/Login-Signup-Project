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
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // ✅ Email validation helper
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // ✅ Send OTP
  const handleSendOtp = async () => {
    if (!email) {
      setDialogMessage("Please enter your email");
      setDialogOpen(true);
      return;
    }

    if (!isValidEmail(email)) {
      setDialogMessage("Please enter a valid email address");
      setDialogOpen(true);
      return;
    }

    try {
      await fetch("http://localhost:5000/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      setOtpSent(true);
      setDialogMessage("OTP sent to your email");
      setDialogOpen(true);
    } catch (error) {
      setDialogMessage("Failed to send OTP. Please try again.");
      setDialogOpen(true);
    }
  };

  // ✅ Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp) {
      setDialogMessage("Please enter the OTP");
      setDialogOpen(true);
      return;
    }

    try {
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
        setDialogMessage("Email verified successfully");
        setDialogOpen(true);
      }
    } catch (error) {
      setDialogMessage("OTP verification failed");
      setDialogOpen(true);
    }
  };

  // ✅ Final register
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otpVerified) {
      setDialogMessage("Please verify your email first");
      setIsSuccess(false);
      setDialogOpen(true);
      return;
    }

    if (!password) {
      setDialogMessage("Please enter your password");
      setIsSuccess(false);
      setDialogOpen(true);
      return;
    }

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
          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            className="form-control emaildiv"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            disabled={otpSent}
          />

          {/* SEND OTP */}
          {!otpSent && (
            <button
              type="button"
              className="glow-on-hover button"
              onClick={handleSendOtp}
            >
              Send OTP
            </button>
          )}

          {/* OTP INPUT */}
          {otpSent && !otpVerified && (
            <>
              <input
                placeholder="Enter OTP"
                className="form-control passworddiv"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />

              <button
                type="button"
                className="glow-on-hover button"
                onClick={handleVerifyOtp}
              >
                Verify OTP
              </button>
            </>
          )}

          {/* PASSWORD */}
          {otpVerified && (
            <>
              <input
                type="password"
                placeholder="Set Password"
                className="form-control passworddiv"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button className="glow-on-hover button">Register</button>
            </>
          )}

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

      {/* DIALOG */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>
          {isSuccess ? "Registration Successful" : "Message"}
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
