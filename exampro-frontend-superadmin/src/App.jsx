// src/App.jsx

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Logout from "./components/Logout";
import Manage from "./components/Manage";
import ProtectedRoute from "./components/ProtectedRoute";
import { Outlet } from "react-router-dom";

function ProtectedLayout() {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex flex-col flex-1 ml-64">
          <Navbar />
          <div className="flex-1 p-6 overflow-y-auto">
            <Outlet />   {/* Child routed components will render here */}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />

        {/* Default */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Protected Layout */}
        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/manage" element={<Manage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
      </Routes>
    </Router>
  );
}
