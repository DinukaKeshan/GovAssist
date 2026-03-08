// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminComplaints from "./pages/admin/Complaints";
import CitizenDashboard from "./pages/citizen/Dashboard";
import CitizenComplaints from "./pages/citizen/Complaints";
import LoginPage from "./pages/LoginPage";

const App = () => {
  const [user, setUser] = useState(null); // Track the user role

  const handleLogin = (loginData) => {
    // Mock login logic (to be replaced with real authentication)
    if (loginData.email === "admin@example.com") {
      setUser({ role: "admin" });
    } else if (loginData.email === "citizen@example.com") {
      setUser({ role: "citizen" });
    }
  };

  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/login" element={<LoginPage handleLogin={handleLogin} />} />
        
        {/* Redirect root to login page if not logged in */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Role-based routes */}
        {user?.role === "admin" && (
          <>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/complaints" element={<AdminComplaints />} />
          </>
        )}

        {user?.role === "citizen" && (
          <>
            <Route path="/citizen/dashboard" element={<CitizenDashboard />} />
            <Route path="/citizen/complaints" element={<CitizenComplaints />} />
          </>
        )}

        {/* Catch-all route for unmatched paths */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;