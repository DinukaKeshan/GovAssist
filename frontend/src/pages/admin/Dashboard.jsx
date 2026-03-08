// src/pages/admin/Dashboard.jsx
import React from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';

const AdminDashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <Navbar />
        <h2 className="text-3xl font-semibold">Admin Dashboard</h2>
        <p className="mt-4">Manage complaints, users, and reports.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;