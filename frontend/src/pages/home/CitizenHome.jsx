import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

export default function CitizenHome() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="flex flex-col items-center justify-center py-24">
        <h2 className="text-3xl font-bold mb-4">
          Welcome, {user.name} 👋
        </h2>

        <p className="text-gray-600 mb-6">
          Logged in as <span className="font-semibold">Citizen</span>
        </p>

        <div className="flex gap-4">
          <Link
            to="/complaints/new"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg"
          >
            Submit Complaint
          </Link>

          <Link
            to="/departments"
            className="px-6 py-3 bg-green-600 text-white rounded-lg"
          >
            View Departments
          </Link>
        </div>
      </main>
    </div>
  );
}
