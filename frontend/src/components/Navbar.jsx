import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Use Link for navigation
import axios from 'axios';

const Navbar = () => {
  const [citizenName, setCitizenName] = useState('');
  const [citizenEmail, setCitizenEmail] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false); // Toggle profile dropdown
  const navigate = useNavigate();

  // Fetch citizen name and email on component mount
  useEffect(() => {
    const fetchCitizenDetails = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        return navigate("/citizen/login"); // Redirect to login if no token
      }

      try {
        const response = await axios.get("http://localhost:5000/api/citizen/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCitizenName(response.data.name); // Set citizen name
        setCitizenEmail(response.data.email); // Set citizen email
      } catch (err) {
        console.error('Error fetching citizen details:', err);
      }
    };

    fetchCitizenDetails();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token to log out
    navigate("/citizen/login"); // Redirect to login page
  };

  return (
    <header className="bg-blue-600 text-white p-4 sticky top-0 z-50 shadow-lg">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-xl font-bold">GovConnect</h1>

        {/* Navigation Links using Link component to prevent page refresh */}
        <nav className="space-x-4">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/citizen/dashboard" className="hover:text-gray-200">Dashboard</Link>
          <Link to="/citizen/create-complaint" className="hover:text-gray-200">Complaints</Link>
          <Link to="/citizen/departments" className="hover:text-gray-200">Departments</Link>
          <Link to="/citizen/entries" className="hover:text-gray-200">Entries</Link>
        </nav>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            className="flex items-center space-x-2"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span className="font-semibold">{citizenName}</span>
            <span>🔽</span> {/* Profile Icon */}
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2">
              <div className="mb-2">
                <p className="font-semibold">{citizenName}</p>
                <p className="text-sm text-gray-500">{citizenEmail}</p>
              </div>
              <button
                className="block w-full text-left py-2 text-blue-500 hover:bg-gray-100"
                onClick={() => navigate("/citizen/update-profile")} // Update Profile Route
              >
                Update Profile
              </button>
              <button
                className="block w-full text-left py-2 text-red-500 hover:bg-gray-100"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;