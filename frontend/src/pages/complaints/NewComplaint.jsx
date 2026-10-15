import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function NewComplaint() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    phoneNumber: "",
    address: "",
    thirdPartyName: "",
    thirdPartyPhoneNumber: "",
    thirdPartyAddress: "",
  });

  // ✅ Popup state
  const [showPopup, setShowPopup] = useState(false);
  const [confirmation, setConfirmation] = useState({
    department: "",
    priority: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitComplaint = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/complaints/create",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ✅ Store response data for popup
      setConfirmation({
        department: response.data.assignedDepartment,
        priority: response.data.priority,
      });

      setShowPopup(true);

    } catch (err) {
      console.error("Create complaint error:", err);
      alert(err.response?.data?.message || "Failed to submit complaint");
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-3xl mx-auto bg-white p-6 mt-10 rounded shadow">
        <h2 className="text-2xl font-bold mb-6">Submit a Complaint</h2>

        <form onSubmit={submitComplaint} className="space-y-4">
          <input
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          <input
            name="phoneNumber"
            placeholder="Phone Number"
            value={form.phoneNumber}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          <textarea
            name="address"
            placeholder="Home Address"
            value={form.address}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          <textarea
            name="description"
            placeholder="Complaint Description"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          <h3 className="font-semibold mt-4">Third Party (Optional)</h3>

          <input
            name="thirdPartyName"
            placeholder="Third Party Name"
            value={form.thirdPartyName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            name="thirdPartyPhoneNumber"
            placeholder="Third Party Phone"
            value={form.thirdPartyPhoneNumber}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <textarea
            name="thirdPartyAddress"
            placeholder="Third Party Address"
            value={form.thirdPartyAddress}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Submit Complaint
          </button>
        </form>
      </div>

      {/* ✅ Confirmation Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full text-center">
            <h2 className="text-xl font-bold mb-4 text-green-600">
              Complaint Submitted Successfully ✅
            </h2>

            <p className="mb-2">
              <strong>Assigned Department:</strong>
              <br />
              {confirmation.department}
            </p>

            <p className="mb-4">
              <strong>Priority:</strong>
              <br />
              {confirmation.priority}
            </p>

            <button
              onClick={closePopup}
              className="bg-blue-600 text-white px-6 py-2 rounded"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}