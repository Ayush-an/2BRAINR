import { Link } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiBarChart2,
  FiUser,
  FiBell,
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiLogOut,
} from "react-icons/fi";
import { useState } from "react";

export default function Sidebar() {
  const today = new Date();

  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const monthName = new Date(currentYear, currentMonth).toLocaleString("default", {
    month: "long",
  });

  // Total days in current month
  const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

  // First day position (0 = Sunday)
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

  // Create days array including empty placeholders
  const calendarDays = [
    ...Array(firstDayIndex).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];

  // Month change handlers
  const prevMonth = () => {
    setCurrentMonth((m) => {
      if (m === 0) {
        setCurrentYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
  };

  const nextMonth = () => {
    setCurrentMonth((m) => {
      if (m === 11) {
        setCurrentYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
  };

  return (
    <div className="flex flex-col justify-between w-64 min-h-screen p-6 text-white shadow-2xl bg-gradient-to-b from-indigo-600 to-purple-700 fade-in">

      {/* Brand */}
      <div>
<h2 className="mb-5 text-3xl font-extrabold tracking-wide text-center drop-shadow-md">AYUSH </h2>

        <ul className="space-y-5 text-white/95">
          <li><Link className="sidebar-item" to="/dashboard"><FiHome /> Dashboard</Link></li>
          <li><Link className="sidebar-item" to="/groups"><FiUsers /> My Groups</Link></li>
          <li><Link className="sidebar-item" to="/results"><FiBarChart2 /> Results</Link></li>
          <li><Link className="sidebar-item" to="/profile"><FiUser /> Profile</Link></li>
        </ul>
      </div>

      <div className="space-y-4">

        {/* Notifications Card */}
        <div className="p-2 border shadow-lg bg-white/20 rounded-xl backdrop-blur-xl border-white/20 hover:scale-[1.02] transition mt-2">
          <h4 className="flex items-center gap-2 font-semibold">
            <FiBell /> Notifications
          </h4>

          <ul className="mt-3 space-y-1 text-sm">
            <li>📌 New DSA Exam Posted</li>
            <li>📌 Java Grade Updated</li>
          </ul>
        </div>

        {/* Mini Calendar with Month Switcher */}
        <div className="p-1 border shadow-lg bg-white/20 rounded-xl backdrop-blur-xl border-white/20 hover:scale-[1.02] transition">

          {/* Header + Switcher */}
          <div className="flex items-center justify-between">
            <button onClick={prevMonth} className="p-1 rounded hover:bg-white/20">
              <FiChevronLeft />
            </button>

            <h4 className="flex items-center gap-2 font-semibold">
              <FiCalendar /> {monthName} {currentYear}
            </h4>

            <button onClick={nextMonth} className="p-1 rounded hover:bg-white/20">
              <FiChevronRight />
            </button>
          </div>

          {/* Week days */}
          <div className="grid grid-cols-7 gap-1 mt-3 text-xs font-semibold text-center opacity-80">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-1 mt-2 text-sm text-center">
            {calendarDays.map((day, i) => {
              if (day === null) return <div key={i}></div>;

              const isToday =
                day === today.getDate() &&
                currentMonth === today.getMonth() &&
                currentYear === today.getFullYear();

              return (
                <div
                  key={i}
                  className={`p-1 rounded-md transition ${
                    isToday
                      ? "bg-white text-indigo-600 font-bold shadow"
                      : "hover:bg-white/20"
                  }`}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Logout */}
      <Link className="mt-4 text-red-300 sidebar-item" to="/logout">
        <FiLogOut /> Logout
      </Link>
    </div>
  );
}
