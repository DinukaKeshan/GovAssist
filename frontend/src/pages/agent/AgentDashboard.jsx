import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AgentDashboard() {
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAgentProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/agent/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/agent/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAgent(response.data);
      } catch (err) {
        setError('Failed to load agent profile');
      } finally {
        setLoading(false);
      }
    };

    fetchAgentProfile();
  }, [navigate]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error)   return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Agent Dashboard</h1>
          <p className="text-gray-500">Welcome back, {agent.name}!</p>
        </div>

        {/* Profile Details */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Profile Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium text-gray-800">{agent.name}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-800">{agent.email}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Department</p>
              <p className="font-medium text-gray-800">
                {agent.department?.name || "Not assigned"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Role</p>
              <span className="inline-block bg-green-100 text-green-600 text-xs font-medium px-2 py-1 rounded-full">
                Agent
              </span>
            </div>

            <div>
              <p className="text-sm text-gray-500">Member Since</p>
              <p className="font-medium text-gray-800">
                {new Date(agent.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric'
                })}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Total Complaints</p>
              <p className="font-medium text-gray-800">{agent.complaints?.length || 0}</p>
            </div>

          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Quick Actions</h2>
          <div className="flex gap-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={() => navigate('/agent/complaints')}
            >
              View Complaints
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}