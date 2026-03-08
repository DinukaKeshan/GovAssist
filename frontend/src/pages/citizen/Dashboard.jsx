// src/pages/citizen/Dashboard.jsx
import React from 'react';
import Navbar from '../../components/Navbar';

const CitizenDashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h2 className="text-3xl font-semibold">Welcome, Citizen</h2>
        <p className="mt-4">View your complaints and track their status.</p>
      </div>
    </div>
  );
};

export default CitizenDashboard;