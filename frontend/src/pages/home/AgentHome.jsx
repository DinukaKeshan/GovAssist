import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

export default function AgentHome() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="flex flex-col items-center justify-center py-24">
        <h2 className="text-3xl font-bold mb-4">
          Welcome, {user.name}
        </h2>

        <p className="text-gray-600 mb-6">
          Role: <span className="font-semibold">Agent</span>
        </p>

        <Link
          to="/agent/dashboard"
          className="px-6 py-3 bg-purple-600 text-white rounded-lg"
        >
          Agent Dashboard
        </Link>
      </main>
    </div>
  );
}
