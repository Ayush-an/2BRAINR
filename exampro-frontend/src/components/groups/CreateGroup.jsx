import { useState } from "react";
import { createGroup } from "../../utils/api";

export default function CreateGroup({ onClose }) {
  const [group, setGroup] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setGroup({ ...group, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!group.name || !group.startDate || !group.endDate) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      const createdByStr = localStorage.getItem("userId");
      if (!createdByStr) throw new Error("User ID not found in localStorage");
      
      const createdBy = parseInt(createdByStr); // ✅ Convert to integer
      if (isNaN(createdBy)) throw new Error("Invalid User ID");

      const res = await createGroup({ ...group, createdBy });
      console.log("Group Created:", res.group);
      alert("Group created successfully!");
      onClose();
    } catch (err) {
      console.error("Error creating group:", err);
      alert(`Failed to create group: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="mb-4 text-lg font-bold text-center">Create Group</h2>

      <input
        type="text"
        name="name"
        placeholder="Group Name"
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded-md"
      />
      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
        className="w-full h-24 px-3 py-2 border rounded-md"
      />
      <div className="grid grid-cols-2 gap-4">
        <input
          type="date"
          name="startDate"
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
        />
        <input
          type="date"
          name="endDate"
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div className="flex justify-end gap-2 mt-5">
        <button
          className="px-4 py-2 bg-gray-300 rounded-md"
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </div>
    </div>
  );
}
