/*import { useState } from 'react'
import Login from './Login'
import UsersTable from "./UsersTable";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {
      isLoggedIn ? (<UsersTable />) : (<Login onLogin={() => setIsLoggedIn(true)} />)
      }
    </>
  );
}

export default App;*/

import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import UsersTable from "./UsersTable";

function App() {
  const [page, setPage] = useState("login");

  if (page === "users") return <UsersTable />;

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
