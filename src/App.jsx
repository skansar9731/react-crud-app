import { useEffect, useState } from "react";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import api from "./api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const loadUsers = async () => {
    const res = await api.get("/");
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const confirmDelete = async () => {
    await api.delete(`/${deleteId}`);
    toast.success("User deleted");
    setDeleteId(null);
    loadUsers();
  };

  return (
    <>
      <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light mb-3 mt-3">
        <div className="d-flex justify-content-center w-100">
          <div className="card shadow-lg p-4" style={{ width: "600px" }}>

            <h3 className="text-center mb-3">User Management</h3>

            <UserForm
              selectedUser={selectedUser}
              refresh={loadUsers}
              toast={toast}
            />

            <div style={{ maxHeight: "300px", overflowY: "auto" }}>
              <UserList
                users={users}
                onEdit={setSelectedUser}
                onDelete={(id) => setDeleteId(id)}
              />
            </div>

          </div>
        </div>
      </div>

      {deleteId && (
        <div className="modal fade show d-block" style={{ background: "#00000080" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-4">
              <h5>Confirm Delete</h5>
              <p>Are you sure?</p>

              <div className="text-end">
                <button className="btn btn-secondary me-2" onClick={() => setDeleteId(null)}>
                  Cancel
                </button>

                <button className="btn btn-danger" onClick={confirmDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </>
  );
}

export default App;
