// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-blue-600 text-white p-6">
      <h3 className="text-2xl font-bold mb-4">Admin Panel</h3>
      <ul>
        <li>
          <Link to="/admin/dashboard" className="text-lg hover:text-gray-300">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin/complaints" className="text-lg hover:text-gray-300">
            Complaints
          </Link>
        </li>
        <li>
          <Link to="/admin/users" className="text-lg hover:text-gray-300">
            Users
          </Link>
        </li>
        <li>
          <Link to="/admin/reports" className="text-lg hover:text-gray-300">
            Reports
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;