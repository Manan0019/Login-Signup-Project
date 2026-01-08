/*import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import "./login.css";

function UsersTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "password", headerName: "Password", width: 200 },
  ];

  return (
    <div className="mainbg">
      <div className="middle" style={{ width: "600px" }}>
        <h2 className="welcome">Users List</h2>

        <Paper sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={users}        
            columns={columns}   
            pageSizeOptions={[5, 10]}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Paper>
      </div>
    </div>
  );
}

export default UsersTable;*/

import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import "./login.css";

function UsersTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "email", headerName: "Email", width: 300 },
  ];

  return (
    <div className="mainbg">
      <div className="middle" style={{ width: "600px" }}>
        <h2 className="welcome">Users List</h2>

        <Paper sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={users}
            columns={columns}
            pageSizeOptions={[5, 10]}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
          />
        </Paper>
      </div>
    </div>
  );
}

export default UsersTable;

