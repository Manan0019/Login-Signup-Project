/*import React, { useState } from "react";
import UsersTable from "./UsersTable";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      alert(data.message);

      setIsLoggedIn(true);

    } catch (error) {
      alert("Something went wrong");
    }
  };

  if (isLoggedIn) {
    return <UsersTable />;
  }

  return (
    <div className="mainbg">
      <div className="middle">
        <div className="welcome">Welcome Back!</div>

        <form onSubmit={handleSubmit}>
          <div className="emaildiv">
            <label className="lab">Email address</label>
            <input
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="passworddiv">
            <label className="lab">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="glow-on-hover">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;*/

import React, { useState } from "react";
import "./login.css";

function Login({ onSuccess, goSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("http://localhost:5000/login-verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
    } else {
      onSuccess();
    }
  };

  return (
    <div className="mainbg">
      <div className="middle">
        <h2 className="welcome">Login</h2>

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

          <button className="glow-on-hover">Login</button>

          <p className="switch">
            New here?
            <button
              type="button"
              className="link-btn"
              onClick={goSignup}
            >
            Register
          </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;

