import React, { useState } from "react";
import Login from "./login";
import Signup from "./signup";
import UsersTable from "./UsersTable";

function App() {
  const [page, setPage] = useState("login");

  const handleLogout = () => {
    setPage("login"); // 🔁 back to start
  };

  if (page === "users") {
    return <UsersTable onLogout={handleLogout} />;
  }

  return page === "login" ? (
    <Login
      goSignup={() => setPage("signup")}
      onSuccess={() => setPage("users")}
    />
  ) : (
    <Signup goLogin={() => setPage("login")} />
  );
}

export default App;
