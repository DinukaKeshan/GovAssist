import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CitizenDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [logoutSuccess, setLogoutSuccess] = useState(false); // Added for logout success message
  const navigate = useNavigate();

  // Fetch complaints for the logged-in citizen
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/citizen/complaints", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setComplaints(response.data); // Assuming the response contains an array of complaints
      } catch (err) {
        setError("Failed to fetch complaints");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  // Redirect to create a new complaint page
  const handleNewComplaint = () => {
    navigate("/citizen/create-complaint");
  };

  // Logout function to clear the token and redirect to login
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token
    setLogoutSuccess(true); // Set logout success message
    setTimeout(() => {
      setLogoutSuccess(false); // Hide the success message after 3 seconds
      navigate("/citizen/login"); // Redirect to the login page
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Citizen Dashboard</h2>

        {/* Error message */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Success message after logout */}
        {logoutSuccess && (
          <div className="bg-green-500 text-white p-4 rounded mb-4">
            Successfully logged out! Redirecting to login page...
          </div>
        )}

        {/* Complaints Table */}
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border-b p-2 text-left">Complaint ID</th>
                <th className="border-b p-2 text-left">Department</th>
                <th className="border-b p-2 text-left">Status</th>
                <th className="border-b p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {complaints.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center p-4">No complaints found</td>
                </tr>
              ) : (
                complaints.map((complaint) => (
                  <tr key={complaint._id}>
                    <td className="border-b p-2">{complaint._id}</td>
                    <td className="border-b p-2">{complaint.department}</td>
                    <td className="border-b p-2">{complaint.status}</td>
                    <td className="border-b p-2">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={() => navigate(`/citizen/complaint/${complaint._id}`)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

        {/* Button to add a new complaint */}
        <div className="mt-6">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={handleNewComplaint}
          >
            New Complaint
          </button>
        </div>

        {/* Logout Button */}
        <div className="mt-6">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CitizenDashboard;