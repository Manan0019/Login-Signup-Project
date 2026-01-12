import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import "./login.css";

function Login({ onSuccess, goSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/login-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setDialogMessage(data.message);
        setDialogOpen(true);
      } else {
        onSuccess();
      }
    } catch (error) {
      setDialogMessage("Login failed! Please try again.");
      setDialogOpen(true);
    }
  };

  return (
    <div className="mainbg">
      <div className="middle">
        <h2 className="welcome">Login</h2>

        <form onSubmit={handleSubmit}>
          <input
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

          <button className="glow-on-hover button">Login</button>

          <p className="switch newhere">
            New here?
            <button
              type="button"
              className="link-btn regibtn"
              onClick={goSignup}
            >
              Register
            </button>
          </p>
        </form>
      </div>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Login Error</DialogTitle>
        <DialogContent>{dialogMessage}</DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Login;
