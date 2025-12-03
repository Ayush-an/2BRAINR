// src/components/groups/ManageGroups.jsx
import React, { useEffect, useState } from "react";
import { fetchGroups } from "../../utils/api";

export default function ManageGroups() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to load groups from API
  const loadGroups = async () => {
    setLoading(true);
    try {
      const data = await fetchGroups();
      setGroups(
        data.map((g) => ({
          id: g.id,
          name: g.name,
          description: g.description,
          participants: g.participants_count || 0, // adjust if you track participants separately
          start: new Date(g.start_date).toLocaleDateString(),
          end: new Date(g.end_date).toLocaleDateString(),
          status: g.status === "ACTIVE" ? "Active" : "Inactive",
          createdBy: g.created_by || "Unknown",
          createdAt: new Date(g.created_at).toLocaleDateString(),
        }))
      );
    } catch (err) {
      console.error("Failed to fetch groups:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch groups on mount
  useEffect(() => {
    loadGroups();
  }, []);

  if (loading) return <div className="p-6 text-center">Loading groups...</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-6 text-2xl font-semibold text-center">Manage Groups</h2>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <button className="px-4 py-2 text-white bg-blue-600 rounded">My Groups</button>
        <button className="px-4 py-2 border rounded">All Groups</button>
        <select className="px-3 py-2 border rounded">
          <option>Select Admin</option>
        </select>
        <select className="px-3 py-2 border rounded">
          <option>Select Status</option>
        </select>
        <input type="text" placeholder="Select date range" className="px-3 py-2 border rounded" />
        <input type="text" placeholder="Search groups..." className="w-64 px-3 py-2 border rounded" />
        <button className="px-4 py-2 bg-gray-200 rounded">Search</button>
      </div>

      {/* Table */}
      <table className="w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="border-b">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Description</th>
            <th className="p-3 text-left">Added Participants</th>
            <th className="p-3 text-left">Start Date</th>
            <th className="p-3 text-left">End Date</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Created By</th>
            <th className="p-3 text-left">Created At</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((g) => (
            <tr key={g.id} className="border-b">
              <td className="p-3 text-blue-600 underline">{g.name}</td>
              <td className="p-3">{g.description}</td>
              <td className="p-3 text-blue-600 underline">{g.participants}</td>
              <td className="p-3">{g.start}</td>
              <td className="p-3">{g.end}</td>
              <td className={`p-3 font-semibold ${g.status === "Active" ? "text-green-600" : "text-red-600"}`}>
                {g.status}
              </td>
              <td className="p-3">{g.createdBy}</td>
              <td className="p-3">{g.createdAt}</td>
              <td className="p-3">
                <button className="mr-3 text-blue-600">Edit</button>
                <button className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
