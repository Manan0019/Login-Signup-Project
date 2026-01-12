/*import React, { useState } from "react";
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

export default Login;*/

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import "./login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      dialogOpen: false,
      dialogMessage: "",
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      const res = await fetch("http://localhost:5000/login-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        this.setState({ dialogOpen: true, dialogMessage: data.message });
      } else {
        this.props.onSuccess();
      }
    } catch (error) {
      this.setState({
        dialogOpen: true,
        dialogMessage: "Login failed! Please try again.",
      });
    }
  };
  render() {
    const { email, password, dialogOpen, dialogMessage } = this.state;
    const { onSuccess, goSignup } = this.props;

    return (
      <div className="mainbg">
        <div className="middle">
          <h2 className="welcome">Login</h2>

          <form onSubmit={this.handleSubmit}>
            <input
              placeholder="Email"
              className="form-control emaildiv"
              value={email}
              onChange={(e) => this.setState({ email: e.target.value })}
              autoFocus
            />

            <input
              type="password"
              placeholder="Password"
              className="form-control passworddiv"
              value={password}
              onChange={(e) => this.setState({ password: e.target.value })}
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

        <Dialog
          open={dialogOpen}
          onClose={() => this.setState({ dialogOpen: false })}
        >
          <DialogTitle>Login Error</DialogTitle>
          <DialogContent>{dialogMessage}</DialogContent>
          <DialogActions>
            <Button onClick={() => this.setState({ dialogOpen: false })}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default Login;
