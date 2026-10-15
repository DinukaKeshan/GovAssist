import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

export default function PublicHome() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="flex flex-col items-center justify-center py-24">
        <h2 className="text-3xl font-bold mb-4">
          Welcome to GovConnect
        </h2>

        <p className="text-gray-600 mb-6">
          Connecting citizens with government services
        </p>

        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-6 py-3 bg-gray-700 text-white rounded-lg"
          >
            Register
          </Link>
        </div>
      </main>
    </div>
  );
}
