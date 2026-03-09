import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MinisterDashboard = () => {
  const [ministerData, setMinisterData] = useState(null);
  const navigate = useNavigate();

  // Check if the minister is logged in and fetch their profile
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/minister/login');  // Redirect to login if no token
    }

    // Fetch minister profile data
    const fetchMinisterProfile = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/minister/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setMinisterData(data);
      } catch (error) {
        console.error('Error fetching minister profile', error);
      }
    };

    fetchMinisterProfile();
  }, [navigate]);

  if (!ministerData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Minister Dashboard</h2>
        <p className="text-lg mb-4">Welcome, {ministerData.name}!</p>

        {/* Minister Profile Information */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Minister Details:</h3>
          <p>Email: {ministerData.email}</p>
          <p>Department: {ministerData.department}</p>
        </div>

        {/* Additional actions like managing complaints or viewing assigned tasks */}
        <div className="space-x-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Manage Complaints
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            View Assigned Tasks
          </button>
        </div>
      </div>
    </div>
  );
};

export default MinisterDashboard;