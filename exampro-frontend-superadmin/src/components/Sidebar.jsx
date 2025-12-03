// src/components/Sidebar.jsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  UserIcon,
  FolderIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { FiChevronLeft, FiChevronRight, FiCalendar } from "react-icons/fi";

export default function Sidebar() {
  const menuItems = [
    { name: "Dashboard", to: "/dashboard", icon: HomeIcon },
    { name: "Manage", to: "/manage", icon: FolderIcon },
    { name: "Profile", to: "/profile", icon: UserIcon },
  ];

  const today = new Date();
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
    <div className="fixed flex flex-col w-64 h-screen bg-white shadow-md">

      {/* Logo */}
<div className="flex justify-center px-6 pt-6">
  <div className="p-2 bg-gray-500 rounded">
    <img
      src="/images/logo3.png"
      alt="Logo"
      className="object-contain w-auto h-30"
    />
  </div>
</div>


      

      <div className="my-4 border-b"></div>

      {/* Menu */}
      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-purple-100 text-purple-600"
                  : "text-gray-600 hover:bg-purple-50 hover:text-purple-600"
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>
{/* Mini Calendar with Month Switcher */}
      <div className="px-6 mt-4">
        <div className="p-2 border shadow-lg bg-white/20 rounded-xl backdrop-blur-xl border-white/20 hover:scale-[1.02] transition">
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
      {/* Logout (bottom) */}
      <div className="px-4 pb-6 mt-10 mt-auto">
        <NavLink
          to="/logout"
          className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 transition-all duration-200 rounded-lg hover:bg-purple-50 hover:text-purple-600"
        >
          <ArrowLeftOnRectangleIcon className="w-5 h-5" />
          Logout
        </NavLink>
      </div>
    </div>
  );
}
