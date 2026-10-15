import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SelectRole() {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const submitRole = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      "/api/auth/set-role",
      { role },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    localStorage.setItem("user", JSON.stringify(res.data.user));
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Select Your Role
        </h2>

        {["CITIZEN", "AGENT", "MINISTER"].map((r) => (
          <button
            key={r}
            onClick={() => setRole(r)}
            className={`w-full mb-3 py-2 rounded border 
              ${role === r ? "bg-blue-600 text-white" : "bg-gray-100"}`}
          >
            {r}
          </button>
        ))}

        <button
          disabled={!role}
          onClick={submitRole}
          className="w-full mt-4 bg-green-600 text-white py-2 rounded disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
