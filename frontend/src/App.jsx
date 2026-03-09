import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CitizenLoginPage from './pages/citizen/CitizenLoginPage';
import CitizenRegisterPage from './pages/citizen/CitizenRegisterPage';
import CitizenDashboard from './pages/citizen/CitizenDashboard'; 
import HomePage from './pages/citizen/HomePage';
import Navbar from './components/Navbar'; 

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/citizen/login" element={<CitizenLoginPage />} />
        <Route path="/citizen/register" element={<CitizenRegisterPage />} />
        <Route path="/citizen/dashboard" element={<CitizenDashboard />} />
      </Routes>
    </div>
  );
}

export default App;