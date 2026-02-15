export default function UserList({ users, onEdit, onDelete }) {
  return (
    <div className="mt-4">
      <h5 className="text-center mb-3">User List</h5>

      {users.map((user) => (
        <div key={user.id} className="card p-3 mb-3 shadow-sm">

          <div><strong>First:</strong> {user.firstName}</div>
          <div><strong>Last:</strong> {user.lastName}</div>
          <div><strong>Phone:</strong> {user.phone}</div>
          <div><strong>Email:</strong> {user.email}</div>

          <div className="d-flex gap-2 mt-3">
            <button
              className="btn btn-warning w-50"
              onClick={() => onEdit(user)}
            >
              Edit
            </button>

            <button
              className="btn btn-danger w-50"
              onClick={() => onDelete(user.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
