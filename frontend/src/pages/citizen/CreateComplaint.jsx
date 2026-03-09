import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateComplaint = () => {
  const [title, setTitle] = useState(""); // Title state for complaint
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState(""); // For the selected district
  const [department, setDepartment] = useState(""); // The department will be selected from the dropdown
  const [departments, setDepartments] = useState([]); // For storing available departments
  const [priority, setPriority] = useState("MEDIUM");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [citizenName, setCitizenName] = useState(""); // State to store citizen's name
  const [citizenEmail, setCitizenEmail] = useState(""); // State to store citizen's email
  const navigate = useNavigate();

  // Static list of Sri Lankan districts
  const districtsList = [
    "Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya", "Galle", 
    "Matara", "Hambantota", "Jaffna", "Kilinochchi", "Mannar", "Vavuniya", "Batticaloa", 
    "Ampara", "Trincomalee", "Kurunegala", "Puttalam", "Anuradhapura", "Polonnaruwa", 
    "Badulla", "Moneragala", "Ratnapura", "Kegalle", "Mullaitivu", "Nuware Eliya"
  ];

  // Fetch the available departments and citizen's details when the page loads
  useEffect(() => {
    const fetchDepartmentsAndCitizenDetails = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        return navigate("/citizen/login"); // Redirect to login if no token
      }

      try {
        // Fetch departments
        const response = await axios.get("http://localhost:5000/api/admin/departments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDepartments(response.data); // Set the fetched departments to the state

        // Fetch citizen's data
        const citizenResponse = await axios.get("http://localhost:5000/api/citizen/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCitizenName(citizenResponse.data.name); // Set citizen's name
        setCitizenEmail(citizenResponse.data.email); // Set citizen's email
      } catch (err) {
        setError("Failed to fetch departments or citizen details");
      }
    };

    fetchDepartmentsAndCitizenDetails();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token, authorization denied");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/citizen/complaints/add",
        {
          title, // Include title in the complaint data
          description,
          phoneNumber,
          address,
          district,
          department,
          priority,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess("Complaint submitted successfully!");
      setTimeout(() => {
        navigate("/citizen/dashboard"); // Redirect to the citizen dashboard after successful submission
      }, 2000);
    } catch (err) {
      setError("Failed to submit complaint");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Create New Complaint</h2>

        {/* Citizen's Name and Email Display */}
        <div className="mb-4">
          <label className="block text-sm font-semibold">Citizen Information</label>
          <div className="p-2 bg-gray-100 rounded">
            <p><strong>Name:</strong> {citizenName}</p>
            <p><strong>Email:</strong> {citizenEmail}</p>
          </div>
        </div>

        {/* Error and Success Messages */}
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Title</label>
            <input
              type="text"
              className="w-full border-gray-300 p-2 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold">Description</label>
            <textarea
              className="w-full border-gray-300 p-2 rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold">Phone Number</label>
            <input
              type="text"
              className="w-full border-gray-300 p-2 rounded"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold">Address</label>
            <input
              type="text"
              className="w-full border-gray-300 p-2 rounded"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold">District</label>
            <select
              className="w-full border-gray-300 p-2 rounded"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              required
            >
              <option value="">Select District</option>
              {districtsList.map((districtName, index) => (
                <option key={index} value={districtName}>
                  {districtName}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold">Department</label>
            <select
              className="w-full border-gray-300 p-2 rounded"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept._id} value={dept._id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold">Priority</label>
            <select
              className="w-full border-gray-300 p-2 rounded"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
            >
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="LOW">Low</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit Complaint
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateComplaint;