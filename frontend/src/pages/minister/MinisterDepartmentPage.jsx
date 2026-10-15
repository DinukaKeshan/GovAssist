import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";

// Priority sorting order
const PRIORITY_RANK = {
  HIGH: 1,
  MEDIUM: 2,
  LOW: 3,
};

// Priority badge colors
const PRIORITY_COLOR = {
  HIGH: "bg-red-100 text-red-700",
  MEDIUM: "bg-yellow-100 text-yellow-700",
  LOW: "bg-green-100 text-green-700",
};

export default function MinisterDepartmentPage() {
  const { id } = useParams();

  const [department, setDepartment] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        const res = await axios.get(
          `http://localhost:5000/api/departments/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const dept = res.data.department;
        let comps = res.data.complaints || [];

        // Sort complaints by priority
        comps.sort((a, b) => {
          const pA = PRIORITY_RANK[a.priority || "MEDIUM"];
          const pB = PRIORITY_RANK[b.priority || "MEDIUM"];
          return pA - pB;
        });

        setDepartment(dept);
        setComplaints(comps);
      } catch (err) {
        console.error(err);
        setError("Failed to load department data");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDepartment();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="max-w-5xl mx-auto py-10 px-4">
          <p className="text-gray-500">Loading department...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="max-w-5xl mx-auto py-10 px-4">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  // Department not found
  if (!department) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="max-w-5xl mx-auto py-10 px-4">
          <p className="text-gray-500">Department not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto py-10 px-4">
        {/* Department Header */}
        <h2 className="text-2xl font-bold mb-2">
          Department: {department.name}
        </h2>

        <p className="text-gray-600 mb-6">
          Minister:{" "}
          <span className="font-semibold">
            {department.createdBy?.name || "Unknown"}
          </span>
        </p>

        {/* Complaints */}
        <h3 className="text-xl font-bold mb-4">
          Citizen Complaints
        </h3>

        {complaints.length === 0 ? (
          <p className="text-gray-500">
            No complaints submitted for this department.
          </p>
        ) : (
          <div className="space-y-4">
            {complaints.map((complaint) => (
              <div
                key={complaint._id}
                className="bg-white p-4 rounded shadow"
              >
                <p className="mb-1">
                  <strong>Citizen:</strong>{" "}
                  {complaint.citizen?.user?.name || "Unknown"}
                </p>

                <p className="mb-1">
                  <strong>Title:</strong> {complaint.name}
                </p>

                <p className="mb-2">
                  <strong>Description:</strong>{" "}
                  {complaint.description}
                </p>

                <div className="flex items-center gap-3">
                  <span>
                    <strong>Status:</strong>{" "}
                    {complaint.status}
                  </span>

                  <span
                    className={`px-2 py-1 rounded text-sm font-semibold ${
                      PRIORITY_COLOR[
                        complaint.priority || "MEDIUM"
                      ]
                    }`}
                  >
                    {complaint.priority || "MEDIUM"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
