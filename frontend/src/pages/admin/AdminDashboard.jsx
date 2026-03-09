import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
        <p className="text-lg mb-4">Welcome to the Admin Dashboard</p>

        {/* Button to create a new department */}
        <Link
          to="/admin/create-department"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Department
        </Link>

        {/* Add more admin actions here */}
      </div>
    </div>
  );
};

export default AdminDashboard;