import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";

// Optional: frontend priority ranking
const PRIORITY_RANK = {
  HIGH: 1,
  MEDIUM: 2,
  LOW: 3,
};

// Optional: color mapping
const PRIORITY_COLOR = {
  HIGH: "bg-red-100 text-red-700",
  MEDIUM: "bg-yellow-100 text-yellow-700",
  LOW: "bg-green-100 text-green-700",
};

export default function DepartmentPage() {
  const { id } = useParams();

  const [department, setDepartment] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:5000/api/departments/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Backend returns { department, complaints }
        const dept = response.data.department;
        let comps = response.data.complaints || [];

        // Sort complaints by priority (HIGH → MEDIUM → LOW)
        comps.sort((a, b) => {
          const prioA = PRIORITY_RANK[a.priority || "MEDIUM"];
          const prioB = PRIORITY_RANK[b.priority || "MEDIUM"];
          return prioA - prioB;
        });

        setDepartment(dept);
        setComplaints(comps);
      } catch (err) {
        console.error("Failed to load department:", err);
        setError("Failed to load department data");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDepartment();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="max-w-5xl mx-auto py-10 px-4">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="max-w-5xl mx-auto py-10 px-4">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );

  if (!department)
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="max-w-5xl mx-auto py-10 px-4">
          <p className="text-gray-500">Department not found.</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-5xl mx-auto py-10 px-4">
        <h2 className="text-2xl font-bold mb-6">
          Department: {department.name}
        </h2>

        <p className="text-gray-600 mb-4">
          Minister:{" "}
          <span className="font-medium">
            {department.createdBy?.name || "Unknown"}
          </span>
        </p>

        <h3 className="text-xl font-bold mb-4">Complaints</h3>

        {complaints.length === 0 ? (
          <p className="text-gray-500">No complaints for this department.</p>
        ) : (
          <div className="space-y-4">
            {complaints.map((complaint) => (
              <div
                key={complaint._id}
                className="bg-white p-4 rounded shadow"
              >
                <p>
                  <strong>Citizen:</strong>{" "}
                  {complaint.citizen?.user?.name || "Unknown"}
                </p>
                <p>
                  <strong>Title:</strong> {complaint.name}
                </p>
                <p>
                  <strong>Description:</strong> {complaint.description}
                </p>
                <p className="flex items-center gap-2">
                  <strong>Status:</strong> {complaint.status}
                  <span
                    className={`px-2 py-1 rounded text-sm font-semibold ${
                      PRIORITY_COLOR[complaint.priority || "MEDIUM"]
                    }`}
                  >
                    {complaint.priority || "MEDIUM"}
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
