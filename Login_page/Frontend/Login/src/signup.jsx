import React, { useState } from "react";
import "./login.css";

function Signup({ goLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
    } else {
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

          {error && <p className="error">{error}</p>}

          <button className="glow-on-hover">Register</button>

          <p className="switch">
            Already have an account?{" "}
            <span onClick={goLogin}>Login</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
