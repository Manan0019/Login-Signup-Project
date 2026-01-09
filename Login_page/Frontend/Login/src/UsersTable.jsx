import React, { useEffect, useState } from "react";
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
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [email, setEmail] = useState("");

  const fetchUsers = () => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then(setUsers)
      .catch(console.error);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setEditingUser(user);
    setEmail(user.email || "");
  };

  const handleUpdate = async () => {
    if (!editingUser) return;

    try {
      const res = await fetch(
        `http://localhost:5000/users/${editingUser.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (res.ok) {
        setEditingUser(null);
        fetchUsers();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mainbg">
      <div className="middle users">
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
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

        {/* EDIT CARD */}
        {editingUser && (
          <div className="edit-card">
            <h3>Edit User</h3>

            <input
              className="edit-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="edit-actions">
              <button className="glow-on-hover" onClick={handleUpdate}>
                Save Changes
              </button>

              <button
                className="cancel-btn"
                onClick={() => setEditingUser(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* TABLE */}
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Edit</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.email}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEditClick(u)}
                  >
                    ✏️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SIGN OUT DIALOG */}
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
              onLogout();
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
