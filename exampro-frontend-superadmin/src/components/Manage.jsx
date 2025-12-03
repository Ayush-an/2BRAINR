// src/components/Manage.jsx
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function Manage() {
  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")); // ⬅ Get role

  const [organizations, setOrganizations] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [superUsers, setSuperUsers] = useState([]);
  const [participants, setParticipants] = useState([]);

  const [editOrg, setEditOrg] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });

  // ---------------- SAFE FETCH HELPER ----------------
  const safeFetch = async (url) => {
    try {
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        console.warn(`Fetch failed (${res.status}): ${res.statusText}`);
        return null;
      }

      return await res.json();
    } catch (err) {
      console.error("Fetch error:", err);
      return null;
    }
  };

  // ---------------- FETCH FUNCTIONS ----------------
  const fetchOrganizations = async () => {
    const data = await safeFetch(`${API}/api/organization/`);
    if (data) setOrganizations(data.organizations || data);
  };

  const fetchAdmins = async () => {
    const data = await safeFetch(`${API}/api/admin/all`);
    if (data) setAdmins(data.admins || []);
  };

  const fetchSuperUsers = async () => {
    const data = await safeFetch(`${API}/api/admin/superusers`);
    if (data) setSuperUsers(data.superUsers || data.superusers || []);
  };

  const fetchParticipants = async () => {
    // Prevent 403 — Only SuperUser / SuperAdmin allowed
    if (user?.role !== "SuperUser" && user?.role !== "SuperAdmin") {
      console.log("User not authorized to fetch participants.");
      return;
    }

    const data = await safeFetch(`${API}/api/superuser/participants`);
    if (data) setParticipants(data.participants || []);
  };

  useEffect(() => {
    fetchOrganizations();
    fetchAdmins();
    fetchSuperUsers();
    fetchParticipants(); // ← Now safely role-checked
  }, []);

  // ---------------- HELPERS ----------------
  const getAdminCount = (orgId) =>
    admins.filter((a) => a.organizationId === orgId).length;

  const getSuperUserCount = (orgId) =>
    superUsers.filter((s) => s.organizationId === orgId).length;

  const getParticipantCount = (orgId) =>
    participants.filter((p) => p.organization_id === orgId).length;

  const updateStatus = async () => {
    if (!editOrg) return;

    try {
      const res = await fetch(`${API}/api/organization/${editOrg.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        alert("Status updated");
        fetchOrganizations();
        setEditOrg(null);
      } else {
        alert(`Failed to update status: ${res.status}`);
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  const filteredOrgs = organizations
    .filter((org) => org.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

  // ---------------- EXPORT TO EXCEL ----------------
  const exportToExcel = () => {
    const data = filteredOrgs.map((org) => ({
      Name: org.name,
      Status: org.status,
      Admins: getAdminCount(org.id),
      "Super Users": getSuperUserCount(org.id),
      Participants:
        user.role === "SuperUser" || user.role === "SuperAdmin"
          ? getParticipantCount(org.id)
          : "Restricted",
      Users:
        getAdminCount(org.id) +
        getSuperUserCount(org.id) +
        (user.role === "SuperUser" || user.role === "SuperAdmin"
          ? getParticipantCount(org.id)
          : 0),
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Organizations");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "organizations.xlsx");
  };

  // ---------------- RENDER ----------------
  return (
    <div className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-700">Manage Organizations</h1>

        <input
          type="text"
          placeholder="Search organizations..."
          className="w-full p-2 border rounded sm:w-auto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button
          className="px-4 py-2 text-white bg-green-600 rounded-lg shadow hover:bg-green-700"
          onClick={exportToExcel}
        >
          Export to Excel
        </button>
      </div>

      <div className="p-6 overflow-x-auto bg-white shadow rounded-xl">
        <table className="w-full text-left table-auto">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="px-2 py-3 cursor-pointer" onClick={() => requestSort("name")}>
                Name {sortConfig.key === "name" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </th>
              <th className="px-2 py-3 cursor-pointer" onClick={() => requestSort("status")}>
                Status{" "}
                {sortConfig.key === "status" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </th>
              <th className="px-2 py-3">Admins</th>
              <th className="px-2 py-3">Super Users</th>
              <th className="px-2 py-3">
                Participants{" "}
                {user.role !== "SuperUser" && user.role !== "SuperAdmin" && "(Restricted)"}
              </th>
              <th className="px-2 py-3">Users</th>
              <th className="px-2 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrgs.map((org) => (
              <tr key={org.id} className="border-b">
                <td className="px-2 py-4 font-medium">{org.name}</td>
                <td className="flex items-center gap-2 px-2 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      org.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : org.status === "Inactive"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {org.status}
                  </span>
                </td>

                <td className="px-2 py-4">{getAdminCount(org.id)}</td>
                <td className="px-2 py-4">{getSuperUserCount(org.id)}</td>

                <td className="px-2 py-4">
                  {user.role === "SuperUser" || user.role === "SuperAdmin"
                    ? getParticipantCount(org.id)
                    : "—"}
                </td>

                <td className="px-2 py-4">
                  {getAdminCount(org.id) +
                    getSuperUserCount(org.id) +
                    (user.role === "SuperUser" || user.role === "SuperAdmin"
                      ? getParticipantCount(org.id)
                      : 0)}
                </td>

                <td className="px-2 py-4 text-right">
                  <button
                    className="mr-4 text-purple-600 hover:underline"
                    onClick={() => {
                      setEditOrg(org);
                      setNewStatus(org.status);
                    }}
                  >
                    Edit
                  </button>
                  <button className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editOrg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="p-6 bg-white shadow-lg rounded-xl w-96">
            <h2 className="mb-4 text-lg font-semibold">Edit Status — {editOrg.name}</h2>
            <select
              className="w-full p-3 mb-4 border rounded"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>

            <div className="flex justify-end gap-3">
              <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setEditOrg(null)}>
                Cancel
              </button>
              <button className="px-4 py-2 text-white bg-blue-600 rounded" onClick={updateStatus}>
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
