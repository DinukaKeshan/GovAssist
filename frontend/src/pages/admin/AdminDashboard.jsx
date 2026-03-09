import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState(null); // For storing admin data
  const [loading, setLoading] = useState(true);  // To show loading indicator
  const [error, setError] = useState('');  // For displaying error
  const navigate = useNavigate();

  // Verify if the admin is authenticated and fetch admin profile
  useEffect(() => {
    const fetchAdminProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        // Redirect to login page if no token is found
        navigate('/admin/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/admin/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAdminData(response.data);
      } catch (err) {
        setError('Failed to fetch admin data');
      } finally {
        setLoading(false);
      }
    };

    fetchAdminProfile();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
        <p className="text-lg mb-4">Welcome, {adminData?.name}!</p>

        <div className="mb-6">
          <h3 className="text-xl font-semibold">Admin Details:</h3>
          <p>Email: {adminData?.email}</p>
        </div>

        <div className="space-x-4">
          {/* Add more buttons for admin actions */}
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Manage Complaints
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Manage Users
          </button>
          {/* Add more actions as needed */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;