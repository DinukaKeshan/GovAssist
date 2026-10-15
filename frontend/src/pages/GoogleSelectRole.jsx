import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function GoogleSelectRole() {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  // ✅ SAVE TOKEN FROM URL ON LOAD
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      alert("Authentication failed");
      navigate("/login");
      return;
    }

    localStorage.setItem("token", token);
  }, [navigate]);

  const submitRole = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/auth/set-role",
        { role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Role selection failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-6 text-center">
          Select Your Role
        </h2>

        {["CITIZEN", "AGENT", "MINISTER"].map((r) => (
          <button
            key={r}
            onClick={() => setRole(r)}
            className={`w-full mb-3 py-2 rounded border ${
              role === r
                ? "bg-blue-600 text-white"
                : "bg-gray-100"
            }`}
          >
            {r}
          </button>
        ))}

        <button
          disabled={!role}
          onClick={submitRole}
          className="w-full bg-green-600 text-white py-2 rounded disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
