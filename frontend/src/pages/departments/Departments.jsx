import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/departments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDepartments(res.data);
    } catch (err) {
      console.error("Failed to load departments", err);
      setError("Failed to load departments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (id) => {
    // Navigate to the department detail page with complaints
    navigate(`/departments/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto py-10 px-4">
        <h2 className="text-2xl font-bold mb-6">Government Departments</h2>

        {loading ? (
          <p className="text-gray-500">Loading departments...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : departments.length === 0 ? (
          <p className="text-gray-500">No departments available.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {departments.map((dept) => (
              <div
                key={dept._id}
                onClick={() => handleClick(dept._id)}
                className="bg-white p-4 rounded shadow cursor-pointer hover:bg-gray-50 transition"
              >
                <h3 className="text-lg font-bold">{dept.name}</h3>
                <p className="text-gray-600 mt-1">
                  Minister:{" "}
                  <span className="font-medium">
                    {dept.createdBy?.name || "Unknown"}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
