// src/components/participant/CreateParticipant.jsx
import { useState, useEffect } from "react";
import { fetchGroups, createParticipant } from "../../utils/api";

export default function CreateParticipant({ onClose }) {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    loadGroups();
  }, []);

 const loadGroups = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.organizationId) {
      console.error("Organization ID missing");
      return;
    }
    const data = await fetchGroups(user.organizationId);
    setGroups(data.groups);
  } catch (err) {
    console.error(err);
  }
};
  // Download Excel Format
  const downloadFormat = () => {
    const csv = "name,email,mobile\n";
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "participant_format.csv";
    a.click();
  };

  const handleCreateSingle = async (e) => {
    e.preventDefault();
    if (!selectedGroup) {
      alert("Select Group");
      return;
    }

    const payload = {
      name, email, mobile: mobileNumber, groupId: selectedGroup,};

    try {
      await createParticipant(payload);
      alert("Participant created!");
      onClose();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };
  return (
    <div className="space-y-4">
      <h2 className="mb-4 text-lg font-bold text-center">Create Participant</h2>
      {/* Bulk Format Download */}
      <button
        onClick={downloadFormat}
        className="px-4 py-2 text-white bg-purple-600 rounded-md" >
        Download Excel Format
      </button>
      {/* File Upload */}
      <form className="space-y-3">
        <label>Upload File (.xlsx/.csv)</label>
        <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
        <button className="px-4 py-2 mt-2 text-white bg-blue-600 rounded-md">
          Upload
        </button>
      </form>

      <hr className="my-4" />
      {/* Single Participant */}
      <form onSubmit={handleCreateSingle} className="space-y-3">
        <input type="text" placeholder="Name" className="w-full px-3 py-2 border rounded-md"
          value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" className="w-full px-3 py-2 border rounded-md"
          value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="text" placeholder="Mobile Number" className="w-full px-3 py-2 border rounded-md"
          value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} required />
        {/* Group Dropdown */}
        <select className="w-full px-3 py-2 border rounded-md"
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          required>
          <option value="">Select Group</option>
          {groups?.map((grp) => (
            <option key={grp.id} value={grp.id}>{grp.groupName}</option>
          ))}
        </select>
        <div className="flex justify-end gap-2 mt-3">
          <button type="button" className="px-4 py-2 bg-gray-300 rounded-md" onClick={onClose}>Cancel</button>
          <button type="submit" className="px-4 py-2 text-white bg-green-600 rounded-md">Create</button>
        </div>
      </form>
    </div>
  );
}