import { useState } from "react";
import axios from "axios";

export default function CreateDepartmentForm({ onCreated }) {
  const [name, setName] = useState("");
  const token = localStorage.getItem("token");

  const submit = async () => {
    if (!name) return alert("Enter department name");

    await axios.post(
      "http://localhost:5000/api/departments/create",
      { name },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setName("");
    onCreated();
  };

  return (
    <div className="bg-white p-6 rounded shadow mb-8">
      <h2 className="text-xl font-semibold mb-3">Create Department</h2>

      <div className="flex gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Department name"
          className="border p-2 rounded w-full"
        />
        <button
          onClick={submit}
          className="bg-orange-600 text-white px-4 rounded"
        >
          Create
        </button>
      </div>
    </div>
  );
}
