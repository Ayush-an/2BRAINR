// src/components/participant/CreateParticipant.jsx
import { useState } from "react";

export default function CreateParticipant({ onClose }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const handleUpload = (e) => {
    e.preventDefault();
    console.log("File Upload:", selectedFile?.name);
    onClose();
  };

  const handleCreateSingle = (e) => {
    e.preventDefault();
    console.log({ name, email, mobileNumber });
    onClose();
  };

  return (
    <div className="space-y-4">
      <h2 className="mb-4 text-lg font-bold text-center">Create Participant</h2>

      {/* File Upload */}
      <form onSubmit={handleUpload} className="space-y-3">
        <label>Upload File (.xlsx/.csv)</label>
        <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
        <button className="px-4 py-2 mt-2 text-white bg-blue-600 rounded-md">Upload</button>
      </form>

      <hr className="my-4" />

      {/* Single Participant */}
      <form onSubmit={handleCreateSingle} className="space-y-3">
        <input type="text" placeholder="Name" className="w-full px-3 py-2 border rounded-md" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" className="w-full px-3 py-2 border rounded-md" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="text" placeholder="Mobile Number" className="w-full px-3 py-2 border rounded-md" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} required />

        <div className="flex justify-end gap-2 mt-3">
          <button type="button" className="px-4 py-2 bg-gray-300 rounded-md" onClick={onClose}>Cancel</button>
          <button type="submit" className="px-4 py-2 text-white bg-green-600 rounded-md">Create</button>
        </div>
      </form>
    </div>
  );
}
