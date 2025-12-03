// src/components/Dashboard.jsx
import { Bar, Doughnut } from "react-chartjs-2";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

import { useEffect, useState } from "react";
import CreateAdmin from "./CreateAdmin";
import TotalAdmins from "./TotalAdmins";
import TotalOrganizations from "./TotalOrganizations";

export default function Dashboard() {
  const [stats, setStats] = useState({ totalAdmins: 0, totalOrganizations: 0 });
  const [openCreate, setOpenCreate] = useState(false);
  const [openAdmins, setOpenAdmins] = useState(false);
  const [openOrgs, setOpenOrgs] = useState(false);

 
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const token = localStorage.getItem("token");

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/stats`, {
        headers: { Authorization: token ? `Bearer ${token}` : "" }
      });
      const data = await res.json();
      if (res.ok) setStats(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchStats(); }, []);

  // ----- BAR CHART DATA -----
  const barData = {
    labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG"],
    datasets: [
      {
        label: "CHN",
        backgroundColor: "#a855f7",
        data: [40, 55, 30, 60, 45, 70, 50, 40]
      },
      {
        label: "USA",
        backgroundColor: "#38bdf8",
        data: [80, 60, 40, 55, 75, 80, 60, 70]
      },
      {
        label: "UK",
        backgroundColor: "#fca5a5",
        data: [30, 40, 20, 45, 35, 60, 40, 30]
      }
    ]
  };

  // ----- DONUT CHART DATA -----
  const donutData = {
    labels: ["Search Engines 30%", "Direct Click 30%", "Bookmarks 40%"],
    datasets: [
      {
        data: [30, 30, 40],
        backgroundColor: ["#14b8a6", "#0ea5e9", "#f87171"],
        hoverOffset: 10
      }
    ]
  };
const [openCreateAdmin, setOpenCreateAdmin] = useState(false);
const [openAdminList, setOpenAdminList] = useState(false);

  return (
    
    <div className="p-6">

      {/* GRID TOP CARDS */}
      <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-3">

        {/* Card 1 */}
        <div className="relative p-6 overflow-hidden text-white shadow rounded-xl bg-gradient-to-r from-pink-400 to-rose-300">
          <h2 className="text-lg font-medium">TOTAL ADMINS</h2>
          <h1 className="mt-3 text-4xl font-bold cursor-pointer" onClick={() => setOpenAdmins(true)}>{stats.totalAdmins}</h1>
        </div>

        {/* Card 2 */}
          <div className="relative p-6 overflow-hidden text-white shadow rounded-xl bg-gradient-to-r from-blue-400 to-indigo-400">
          <h2 className="text-lg font-medium">TOTAL ORGANIZATIONS</h2>
          <h1 className="mt-3 text-4xl font-bold cursor-pointer" onClick={() => setOpenOrgs(true)}>{stats.totalOrganizations}</h1>
        </div>

        {/* Card 3 */}
        <div className="relative p-6 overflow-hidden text-white shadow cursor-pointer rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400" onClick={() => setOpenCreate(true)}>
          <h2 className="text-lg font-medium">CREATE ADMIN</h2>
          <h1 className="mt-3 text-4xl font-bold">+</h1>
        </div>
      </div>

{/* rest of dashboard */}

      <CreateAdmin open={openCreate} onClose={() => setOpenCreate(false)} onCreated={fetchStats} />
      <TotalAdmins open={openAdmins} onClose={() => setOpenAdmins(false)} />
      <TotalOrganizations open={openOrgs} onClose={() => setOpenOrgs(false)} />
      {/* BOTTOM GRID */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* BAR CHART CARD */}
        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="mb-4 text-lg font-semibold">Graph Overview</h2>
          <Bar data={barData} height={150} />
        </div>

        {/* DONUT CHART CARD */}
        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="mb-4 text-lg font-semibold">Purchases Info</h2>

          <div className="flex justify-center">
            <div className="w-60">
              <Doughnut data={donutData} />
            </div>
          </div>

          {/* Legend */}
          <div className="flex justify-center mt-6 space-x-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="block w-3 h-3 bg-teal-500 rounded-full"></span>
              Search Engines 30%
            </div>
            <div className="flex items-center gap-2">
              <span className="block w-3 h-3 rounded-full bg-sky-500"></span>
              Direct Click 30%
            </div>
            <div className="flex items-center gap-2">
              <span className="block w-3 h-3 bg-red-400 rounded-full"></span>
              Bookmarks 40%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
