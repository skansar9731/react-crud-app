import { useState, useEffect } from "react";
import { formSchema } from "../config/formSchema";
import api from "../api";
import { toast } from "react-toastify";

export default function UserForm({ selectedUser, refresh }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (selectedUser) {
      setFormData(selectedUser);
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async () => {
  for (let field of formSchema) {
    if (field.required && !formData[field.name]) {
      toast.error(`${field.label} is required`);
      return;
    }
  }

  if (formData.id) {
    await api.put(`/${formData.id}`, formData);
    toast.success("User updated successfully");
  } else {
    await api.post("/", formData);
    toast.success("User added successfully");
  }

  setFormData({});
  refresh();
};

  return (
    <div className="card p-3">
      <h4>User Form</h4>

      {formSchema.map((field) => (
        <input
          key={field.name}
          name={field.name}
          placeholder={field.label}
          className="form-control mb-2"
          value={formData[field.name] || ""}
          onChange={handleChange}
        />
      ))}

      <button onClick={handleSubmit} className="btn btn-success">
        Save
      </button>
    </div>
  );
}
