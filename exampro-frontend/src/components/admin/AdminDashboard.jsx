// src/components/admin/AdminDashboard.jsx
import React, { useState } from "react";
import { User, Bell,LogOut, Menu, ChevronDown } from "lucide-react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,} from "chart.js";
import { useNavigate } from "react-router-dom";

import CreateSuperUser from "../admin/CreateSuperUser.jsx";
import CreateGroup from "../groups/CreateGroup.jsx";
import CreateParticipant from "../participant/CreateParticipant.jsx";
import CreateExam from "../exam/CreateExam.jsx";

import ManageGroups from "../groups/ManageGroups.jsx";
import RemoveGroup from "../groups/RemoveGroup.jsx";
import GroupSummary from "../groups/GroupSummary.jsx";

import ManageParticipants from "../participant/ManageParticipant.jsx";
import RemoveParticipant from "../participant/RemoveParticipant.jsx";
import StagingParticipant from "../participant/StagingParticipant.jsx";
import ActiveParticipant from "../participant/ActiveParticipant.jsx";
import ParticipantSummary from "../participant/ParticipantSummary.jsx";

import ManageExams from "../exam/ManageExam.jsx";
import RemoveExam from "../exam/RemoveExam.jsx";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [popupComponent, setPopupComponent] = useState(null);
  const [activeComponent, setActiveComponent] = useState(null);
  const navigate = useNavigate();

  const openPopup = (component) => setPopupComponent(component);
  const closePopup = () => setPopupComponent(null);

  const renderPopup = () => {
    if (!popupComponent) return null;
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative w-[700px] max-w-[90%] h-[80vh] bg-white rounded-xl shadow-xl p-6 overflow-y-auto">
          <button
            className="absolute text-xl text-gray-600 top-3 right-3 hover:text-red-600"
            onClick={closePopup}
            aria-label="Close popup"
          >
            ✖
          </button>
          {React.isValidElement(popupComponent)
            ? React.cloneElement(popupComponent, { onClose: closePopup, open: true })
            : popupComponent}
        </div>
      </div>
    );
  };

  const navItems = [
    {
  name: "Dashboard",
  onClick: () => setActiveComponent(null),
},


    {
      name: "Groups",
      children: ["Create Group", "Manage Group", "Remove Group", "Group Summary"],
      onClick: (action) => {
        if (action === "Create Group") openPopup(<CreateGroup />);
        else if (action === "Manage Group") setActiveComponent(<ManageGroups />);
        else if (action === "Remove Group") setActiveComponent(<RemoveGroup />);
        else if (action === "Group Summary") setActiveComponent(<GroupSummary />);
      },
    },

    {
      name: "Participant",
      children: ["Create Participant", "Active Participant", "Manage Participant", "Remove Participant", "Staging Participant", "Participant Summary",],
      onClick: (action) => {
        if (action === "Create Participant") openPopup(<CreateParticipant />);
        else if (action === "Active Participant") setActiveComponent(<ActiveParticipant />);
        else if (action === "Manage Participant") setActiveComponent(<ManageParticipants />);
        else if (action === "Remove Participant") setActiveComponent(<RemoveParticipant />);
        else if (action === "Staging Participant") setActiveComponent(<StagingParticipant />);
        else if (action === "Participant Summary") setActiveComponent(<ParticipantSummary />);
      },
    },

    {
      name: "Exams",
      children: ["Create Exam", "Manage Exam", "Remove Exam"],
      onClick: (action) => {
        if (action === "Create Exam") openPopup(<CreateExam />);
        else if (action === "Manage Exam") setActiveComponent(<ManageExams />);
        else if (action === "Remove Exam") setActiveComponent(<RemoveExam />);
      },
    },

    {
      name: "Super User",
      children: ["Create Super User"],
      onClick: (action) => {
        if (action === "Create Super User") openPopup(<CreateSuperUser />);
      },
    },
  ];

  const NavItem = ({ item }) => {
    const [open, setOpen] = useState(false);
    const menuRef = React.useRef(null);

    React.useEffect(() => {
      const handleClickOutside = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
      <div className="relative" ref={menuRef}>
        <button
          className="flex items-center px-3 py-2 text-base font-medium text-gray-700 transition rounded-md hover:text-blue-600 hover:bg-gray-100"
          onClick={() => {
          if (item.name === "Dashboard" && item.onClick) {
               item.onClick();
                    return;
                  }
               setOpen(!open);
            }}

                >
          {item.name}
          {item.children && <ChevronDown className="w-4 h-4 ml-1" />}
        </button>

        {item.children && open && (
          <div className="absolute left-0 top-full mt-2 z-[150] w-48 bg-white border rounded-md shadow-lg animate-fadeIn">
            {item.children.map((sub, index) => (
              <button
                key={index}
                onClick={() => {
                  item.onClick(sub);
                  setOpen(false);
                }}
                className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
              >
                {sub}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/admin-login");
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white border-b shadow-sm">
      <div className="flex items-center space-x-8">
        <div className="text-2xl font-extrabold text-blue-600">2BRAINR</div>
        <nav className="hidden space-x-1 sm:flex">
          {navItems.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}
        </nav>
      </div>

      <div className="flex items-center space-x-4">
        <Bell className="w-5 h-5 text-gray-500 cursor-pointer hover:text-blue-600" />

        {/* Logout Button */}
        <LogOut
          onClick={handleLogout}
          className="w-5 h-5 text-gray-500 cursor-pointer hover:text-red-600"
        />

        {/* Profile */}
        <div className="flex items-center p-2 space-x-2 border rounded-full cursor-pointer hover:bg-gray-50">
          <User className="w-5 h-5 text-blue-600" />

          <span className="hidden text-sm text-gray-700 md:block">
            {user?.name || "User"}
          </span>
        </div>

        <Menu className="w-6 h-6 text-gray-700 cursor-pointer sm:hidden" />
      </div>
    </header>
  );
};

  const DataCard = ({ title, value, unit, colorClass, subText }) => (
    <div className="p-4 transition bg-white rounded-lg shadow-md hover:shadow-lg">
      <h4 className="text-sm font-semibold text-gray-700">{title}</h4>
      <div className="mt-2 text-3xl font-extrabold">{value}</div>
      <div
        className="flex justify-between px-2 py-1 mt-2 text-xs text-white rounded"
        style={{ background: colorClass }}
      >
        <span>{unit}</span>
        <span>{subText}</span>
      </div>
    </div>
  );

  const CholesterolChart = () => {
    const chartData = {
      labels: ["20...", "20...", "20...", "20...", "20...", "20...", "20..."],
      datasets: [
        {
          label: "Data",
          data: [125, 50, 80, 110, 60, 140, 95],
          backgroundColor: "#10B981",
          borderRadius: 6,
        },
      ],
    };

    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-semibold">Graph Overview</h3>
        <div className="h-48 mt-4">
          <Bar data={chartData} options={{ responsive: true }} />
        </div>
      </div>
    );
  };


  
  const ConditionsTable = () => {
  const [data, setData] = React.useState([
    { id: 1, name: "Raj Sharma", Mobile: "7896541230", Email: "raj@gmail.com", CreatedAt: "10/02/2025", approved: false },
    { id: 2, name: "Aryan Kumar", Mobile: "7410258963", Email: "aryan@gmail.com", CreatedAt: "20/03/2025", approved: false },
    { id: 3, name: "Suresh Raina", Mobile: "9630258741", Email: "suresh@gmail.com", CreatedAt: "05/03/2025", approved: false },
  ]);

  // checkbox handler
  const handleCheckbox = (id) => {
    const updated = data.map((row) =>
      row.id === id ? { ...row, approved: !row.approved } : row
    );
    setData(updated);
  };

  // Top button action for selected rows
  const handleApproveSelected = (value) => {
    const updated = data.map((row) =>
      row.approved ? { ...row, approved: value } : row
    );
    setData(updated);
  };

  // check if any row is selected
  const anySelected = data.some((row) => row.approved === true);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Heading + Button */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Approvals</h3>

        {anySelected && (
          <button
            onClick={() => handleApproveSelected(false)}
            className="px-4 py-2 text-sm text-white bg-red-600 rounded-lg"
          >
            Unapprove Selected
          </button>
        )}

        {!anySelected && (
          <button
            onClick={() => handleApproveSelected(true)}
            className="px-4 py-2 text-sm text-white bg-green-600 rounded-lg"
          >
            Approve Selected
          </button>
        )}
      </div>

      {/* Table */}
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-gray-600 border-b">
            <th className="py-2 text-center">Check</th>
            <th className="py-2">Name</th>
            <th className="py-2">Mobile</th>
            <th className="py-2">Email</th>
            <th className="py-2">Created At</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              className={`border-b ${row.approved ? "bg-green-100" : "bg-white"}`}
            >
              <td className="py-2 text-center">
                <input
                  type="checkbox"
                  checked={row.approved}
                  onChange={() => handleCheckbox(row.id)}
                  className="w-4 h-4 cursor-pointer"
                />
              </td>

              <td className="py-2">{row.name}</td>
              <td className="py-2">{row.Mobile}</td>
              <td className="py-2">{row.Email}</td>
              <td className="py-2">{row.CreatedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

  const renderDashboardContent = () => (
    <div className="grid grid-cols-6 gap-4">
      <div className="grid grid-cols-2 col-span-6 gap-4 md:grid-cols-3 lg:grid-cols-6">
        <DataCard title="Total Super Users" value="12" colorClass="#2563EB" />
        <DataCard title="Total Participants" value="8" colorClass="#10B981" />
        <DataCard title="Total Exams" value="450" colorClass="#F59E0B"/>
        <DataCard title="Total Questions" value="32" colorClass="#8B5CF6"/>
        <DataCard title="Active Exams" value="1800" colorClass="#EF4444" />
        <DataCard title="Inactive Exams" value="5" colorClass="#6B7280"/>
      </div>

      <div className="grid grid-cols-1 col-span-6 gap-4 md:grid-cols-3">
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-sm font-bold">Report Overview</h3>
        </div>
        <CholesterolChart />
        <ConditionsTable />
      </div>
    </div>
  );
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      {renderPopup()}

      <main className="p-4 sm:p-6">
        {activeComponent ? (
          <div className="max-w-full p-4 mx-auto bg-gray-100">

            <div className="p-6 bg-white rounded-lg shadow-md">
              {React.isValidElement(activeComponent)
                ? React.cloneElement(activeComponent, { onClose: () => setActiveComponent(null) })
                : activeComponent}
            </div>
          </div>
        ) : (
          renderDashboardContent()
        )}
      </main>
    </div>
  );
};
export default AdminDashboard;