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
  const [deleteUser, setDeleteUser] = useState(null);

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
      const res = await fetch(`http://localhost:5000/users/${editingUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setEditingUser(null);
        fetchUsers();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!deleteUser) return;

    await fetch(`http://localhost:5000/users/${deleteUser.id}`, {
      method: "DELETE",
    });

    setDeleteUser(null);
    fetchUsers();
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / itemsPerPage);

  return (
    <div className="mainbg">
      <div className="middle users">
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

        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {currentUsers.map((u) => (
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
                <td>
                  <button className="edit-btn" onClick={() => setDeleteUser(u)}>
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          className="pagination-controls"
          style={{
            marginTop: "10px",
            display: "flex",
            gap: "10px",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      <Dialog open={!!deleteUser} onClose={() => setDeleteUser(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteUser(null)}>No</Button>
          <Button color="error" onClick={handleDelete}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Sign Out</DialogTitle>
        <DialogContent>Are you sure you want to sign out?</DialogContent>
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
