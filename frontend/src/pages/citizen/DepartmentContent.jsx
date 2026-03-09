import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; // useParams to get the department ID

const DepartmentContent = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { departmentId } = useParams(); // Get department ID from the URL
  const navigate = useNavigate();

  // Fetch complaints for the department
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          return navigate("/citizen/login"); // Redirect to login if no token
        }

        // Fetch complaints from the backend for the specific department
        const response = await axios.get(`http://localhost:5000/api/citizen/complaints/department/${departmentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setComplaints(response.data); // Set the fetched complaints to the state
      } catch (err) {
        setError("Failed to fetch complaints");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [departmentId, navigate]);

  // Handle voting for a complaint
  const handleVote = async (complaintId, voteType) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return navigate("/citizen/login"); // Redirect to login if no token
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/citizen/complaints/vote",
        { complaintId, voteType },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the state after voting
      setComplaints(
        complaints.map((complaint) =>
          complaint._id === complaintId ? { ...complaint, votes: response.data.complaint.votes } : complaint
        )
      );
    } catch (err) {
      setError("Failed to vote");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Department Complaints</h2>

        {/* Error message */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Complaints Feed */}
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <div className="space-y-6">
            {complaints.length === 0 ? (
              <p className="text-center">No complaints available for this department</p>
            ) : (
              complaints.map((complaint) => (
                <div key={complaint._id} className="border-b p-4">
                  <h3 className="text-xl font-semibold">{complaint.title}</h3>
                  <p className="text-sm text-gray-500">Filed by: {complaint.name}</p>
                  <p>{complaint.description}</p>
                  <p className="text-sm text-gray-500">Status: {complaint.status}</p>

                  {/* Voting Buttons */}
                  <div className="mt-4">
                    <button
                      onClick={() => handleVote(complaint._id, "upvote")}
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    >
                      Upvote
                    </button>
                    <button
                      onClick={() => handleVote(complaint._id, "downvote")}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 ml-2"
                    >
                      Downvote
                    </button>
                  </div>

                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Votes: {complaint.votes.length}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentContent;