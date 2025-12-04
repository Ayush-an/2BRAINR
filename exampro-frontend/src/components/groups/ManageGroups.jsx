// src/components/groups/ManageGroups.jsx
import React, { useEffect, useState } from "react";
import { fetchGroups, updateGroup, deleteGroup } from "../../utils/api";

export default function ManageGroups() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingGroup, setEditingGroup] = useState(null);
  const [editForm, setEditForm] = useState({});

  // Convert backend values (ACTIVE) → frontend (Active)
  const normalizeStatus = (s) => {
    if (!s) return "Active";
    return s.charAt(0) + s.slice(1).toLowerCase();
  };

  // Convert back to backend ENUM
  const toBackendStatus = (s) => s.toUpperCase();

  // Load groups
  const loadGroups = async () => {
    setLoading(true);
    try {
      const data = await fetchGroups();

      const normalized = data.map((g) => ({
        id: g.id,
        name: g.name,
        description: g.description,
        participants: g.participants ?? g.participants_count ?? 0,
        start: g.start || "",
        end: g.end || "",
        status: normalizeStatus(g.status),
        createdBy: g.createdBy || "",
        createdAt: g.createdAt || "",
         updatedAt: g.updatedAt || "",
      }));

      setGroups(normalized);
    } catch (err) {
      console.error("Failed to fetch groups:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {  loadGroups();  }, []);

  // Edit Modal handlers
  const handleEditClick = (g) => {
    setEditingGroup(g);
    setEditForm({  name: g.name,  description: g.description, startDate: g.start, endDate: g.end, status: g.status,  });  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async () => {
    try {
      const payload = {
        name: editForm.name, description: editForm.description, startDate: editForm.startDate, endDate: editForm.endDate,
        status: toBackendStatus(editForm.status), };

      await updateGroup(editingGroup.id, payload);

      alert("Group updated successfully!");
      setEditingGroup(null);
      loadGroups();
    } catch (err) {
      console.error(err);
      alert("Failed to update group");
    }
  };

  // Delete
  const handleDelete = async (groupId) => {
    if (!window.confirm("Do you really want to delete this group?")) return;
    try {
      await deleteGroup(groupId);
      setGroups((prev) => prev.filter((g) => g.id !== groupId));
      alert("Group deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete group");
    }
  };
  if (loading) return <div className="p-6 text-center">Loading groups...</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-6 text-2xl font-semibold text-center ">Manage Groups</h2>

      <table className="w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-orange-200 border-b">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Description</th>
            <th className="p-3 text-left">Added Participants</th>
            <th className="p-3 text-left">Start Date</th>
            <th className="p-3 text-left">End Date</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Created By</th>
            <th className="p-3 text-left">Created At</th>
            <th className="p-3 text-left">Updated At</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {groups.length === 0 ? (
            <tr>
              <td colSpan="9" className="p-4 italic text-center text-gray-500">
                No groups found.
              </td>
            </tr>
          ) : (
            groups.map((g) => (
              <tr key={g.id} className="border-b">
                <td className="p-3 text-blue-600 underline ">{g.name}</td>
                <td className="p-3">{g.description}</td>
                <td className="p-3 text-blue-600 underline">{g.participants}</td>
                <td className="p-3">{g.start}</td>
                <td className="p-3">{g.end}</td>
                <td className={`p-3 font-semibold ${
                    g.status === "Active" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {g.status}
                </td>
                <td className="p-3">{g.createdBy}</td>
                <td className="p-3">{g.createdAt}</td>
                <td className="p-3">{g.updatedAt}</td> 
                <td className="p-3">
                  <button className="mr-3 text-blue-600" onClick={() => handleEditClick(g)}> Edit  </button>
                  <button className="text-red-600" onClick={() => handleDelete(g.id)} > Delete </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editingGroup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg w-96">
            <h2 className="mb-4 text-xl font-semibold">Edit Group</h2>

            <input type="text" name="name" value={editForm.name} onChange={handleEditChange} className="w-full px-3 py-2 mb-2 border rounded-md" />
            <textarea name="description" value={editForm.description} onChange={handleEditChange} className="w-full px-3 py-2 mb-2 border rounded-md" />

            <input type="date" name="startDate" value={editForm.startDate} onChange={handleEditChange} className="w-full px-3 py-2 mb-2 border rounded-md"/>
            <input type="date" name="endDate" value={editForm.endDate} onChange={handleEditChange} className="w-full px-3 py-2 mb-2 border rounded-md"/>

            <select name="status" value={editForm.status} onChange={handleEditChange} className="w-full px-3 py-2 mb-4 border rounded-md">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Closed">Closed</option>
            </select>

            <div className="flex justify-end gap-2">
              <button className="px-4 py-2 bg-gray-300 rounded-md"
                onClick={() => setEditingGroup(null)} > Cancel </button>
              <button className="px-4 py-2 text-white bg-blue-600 rounded-md" onClick={handleSaveEdit} > Save </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}