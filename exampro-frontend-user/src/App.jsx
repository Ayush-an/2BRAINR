import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Results from "./components/Results";
import Groups from "./components/Groups";
import Profile from "./components/Profile";
import Logout from "./components/Logout";

export default function App() {
  return (
    <Router>
      <Routes>

        {/* ---------- AUTH PAGES (NO SIDEBAR, FULL SCREEN) ---------- */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ---------- MAIN DASHBOARD LAYOUT ---------- */}
        <Route
          path="*"
          element={
            <div className="flex min-h-screen">
              <Sidebar />

              <div className="flex flex-col flex-1">
                <Navbar />

                <div className="flex-1 p-6 overflow-y-auto">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/results" element={<Results />} />
                    <Route path="/groups" element={<Groups />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/logout" element={<Logout />} />
                  </Routes>
                </div>
              </div>
            </div>
          }
        />

      </Routes>
    </Router>
  );
}
