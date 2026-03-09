import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminRegisterPage from './pages/admin/AdminRegisterPage';
import AdminDashboard from './pages/admin/AdminDashboard'; 
import CreateDepartmentPage from './pages/admin/CreateDepartmentPage';  // Import CreateDepartmentPage
import HomePage from './pages/citizen/HomePage';  
import CitizenLoginPage from './pages/citizen/CitizenLoginPage';  // Citizen login page
import CitizenRegisterPage from './pages/citizen/CitizenRegisterPage';  // Citizen register page
import CitizenDashboard from './pages/citizen/CitizenDashboard';  // Citizen dashboard page
import Navbar from './components/Navbar'; 

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        {/* Home page route */}
        <Route path="/" element={<HomePage />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/register" element={<AdminRegisterPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/create-department" element={<CreateDepartmentPage />} />

        {/* Citizen Routes */}
        <Route path="/citizen/login" element={<CitizenLoginPage />} />  {/* Citizen login page */}
        <Route path="/citizen/register" element={<CitizenRegisterPage />} />  {/* Citizen register page */}
        <Route path="/citizen/dashboard" element={<CitizenDashboard />} />  {/* Citizen dashboard page */}
      </Routes>
    </div>
  );
}

export default App;