import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function MinisterDashboard() {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/departments",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setDepartments(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load departments");
    }
  };

  const createDepartment = async () => {
    if (!name.trim()) return;

    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/departments/create",
        { name },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setName("");
      fetchDepartments(); // refresh list
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Failed to create department"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">
          Minister Dashboard
        </h1>

        {/* CREATE DEPARTMENT */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-lg font-semibold mb-3">
            Create Department
          </h2>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Department name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 border rounded px-3 py-2"
            />

            <button
              onClick={createDepartment}
              disabled={loading}
              className="bg-orange-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>

          {error && (
            <p className="text-red-600 text-sm mt-2">{error}</p>
          )}
        </div>

        {/* DEPARTMENTS LIST */}
        <h2 className="text-xl font-semibold mb-4">
          Departments Created
        </h2>

        {departments.length === 0 ? (
          <p className="text-gray-500">
            No departments created yet.
          </p>
        ) : (
          <div className="grid gap-4">
            {departments.map((dept) => (
              <div
                key={dept._id}
                onClick={() =>
                  navigate(`/minister/departments/${dept._id}`)
                }
                className="bg-white p-4 rounded shadow cursor-pointer hover:bg-gray-50 transition"
              >
                <h3 className="text-lg font-semibold">
                  {dept.name}
                </h3>

                <p className="text-sm text-gray-600">
                  Minister: {dept.createdBy?.name || user?.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
