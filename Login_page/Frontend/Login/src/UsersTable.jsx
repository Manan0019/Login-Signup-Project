import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import "./login.css";

function UsersTable({ onLogout }) {
  const [users, setUsers] = useState([]);

  // Dialog state
  const [open, setOpen] = useState(false);

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
      <div className="middle" style={{ width: "650px" }}>
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <h2 className="welcome" style={{ margin: 0 }}>
            Users List
          </h2>

          <Button
            variant="outlined"
            color="error"
            onClick={() => setOpen(true)}
          >
            Sign Out
          </Button>
        </div>

        {/* TABLE */}
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

      {/* 🔔 SIGN OUT CONFIRMATION DIALOG */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Sign Out</DialogTitle>
        <DialogContent>
          Are you sure you want to sign out?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>No</Button>
          <Button
            color="error"
            onClick={() => {
              setOpen(false);
              onLogout(); // 🔁 back to login
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UsersTable;
