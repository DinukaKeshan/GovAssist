import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OAuthSuccess from "./pages/OAuthSuccess";
import GoogleSelectRole from "./pages/GoogleSelectRole";

import MinisterDashboard from "./pages/minister/MinisterDashboard";
import MinisterDepartmentPage from "./pages/minister/MinisterDepartmentPage";

import NewComplaint from "./pages/complaints/NewComplaint";
import Departments from "./pages/departments/Departments";
import DepartmentPage from "./pages/departments/DepartmentPage";

// Optional (recommended) protected route
function ProtectedRoute({ children, role }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Home />;
  }

  if (role && user.role !== role) {
    return <Home />;
  }

  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
        <Route path="/google-select-role" element={<GoogleSelectRole />} />

        {/* CITIZEN */}
        <Route
          path="/departments"
          element={
            <ProtectedRoute role="CITIZEN">
              <Departments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/departments/:id"
          element={
            <ProtectedRoute role="CITIZEN">
              <DepartmentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/complaints/new"
          element={
            <ProtectedRoute role="CITIZEN">
              <NewComplaint />
            </ProtectedRoute>
          }
        />

        {/* MINISTER */}
        <Route
          path="/minister/dashboard"
          element={
            <ProtectedRoute role="MINISTER">
              <MinisterDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/minister/departments/:id"
          element={
            <ProtectedRoute role="MINISTER">
              <MinisterDepartmentPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
