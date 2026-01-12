import React, { useState } from "react";
import Login from "./login";
import Signup from "./signup";
import UsersTable from "./UsersTable";
import "./styles.css";

function App() {
  const [page, setPage] = useState("login");

  return (
    <div className="app-bg">
      <div className="bg-shapes">
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
      </div>

      {page === "login" && (
        <Login
          onSuccess={() => setPage("users")}
          goSignup={() => setPage("signup")}
        />
      )}

      {page === "signup" && (
        <Signup goLogin={() => setPage("login")} />
      )}

      {page === "users" && (
        <UsersTable onLogout={() => setPage("login")} />
      )}
    </div>
  );
}

export default App;
