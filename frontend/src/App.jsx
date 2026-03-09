import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminRegisterPage from './pages/admin/AdminRegisterPage';
import AdminDashboard from './pages/admin/AdminDashboard'; 
import CreateDepartmentPage from './pages/admin/CreateDepartmentPage'; 
import UserManagementPage from './pages/admin/UserManagementPage'; // Import User Management page
import CreateMinisterPage from './pages/admin/CreateMinisterPage'; // Import Create Minister page
import CreateAgentPage from './pages/admin/CreateAgentPage'; // Import Create Agent page
import HomePage from './pages/citizen/HomePage';  
import CitizenLoginPage from './pages/citizen/CitizenLoginPage';  
import CitizenRegisterPage from './pages/citizen/CitizenRegisterPage';  
import CitizenDashboard from './pages/citizen/CitizenDashboard';  
import Navbar from './components/Navbar'; 

function App() {
  return (
    <div className="App">
      <Navbar /> {/* Navbar component */}

      <Routes>
        {/* Home page route */}
        <Route path="/" element={<HomePage />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/register" element={<AdminRegisterPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/create-department" element={<CreateDepartmentPage />} />
        <Route path="/admin/user-management" element={<UserManagementPage />} /> {/* User Management page */}
        <Route path="/admin/create-minister" element={<CreateMinisterPage />} /> {/* Create Minister page */}
        <Route path="/admin/create-agent" element={<CreateAgentPage />} /> {/* Create Agent page */}

        {/* Citizen Routes */}
        <Route path="/citizen/login" element={<CitizenLoginPage />} />
        <Route path="/citizen/register" element={<CitizenRegisterPage />} />
        <Route path="/citizen/dashboard" element={<CitizenDashboard />} />
      </Routes>
    </div>
  );
}

export default App;