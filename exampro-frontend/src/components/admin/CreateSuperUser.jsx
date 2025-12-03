// src/components/admin/CreateSuperUser.jsx
import { useState } from "react";

export default function CreateSuperUser({ onClose }) {
  const [form, setForm] = useState({ name: "", email: "", mobile: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = () => {
    console.log("Super User Data:", form);
    onClose();
  };

  return (
    <div className="space-y-3">
      <h2 className="mb-4 text-lg font-bold text-center">Create SuperUser</h2>

      <input type="text" name="name" placeholder="Name" className="w-full px-3 py-2 border rounded-md" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" className="w-full px-3 py-2 border rounded-md" onChange={handleChange} />
      <input type="text" name="mobile" placeholder="Mobile Number" className="w-full px-3 py-2 border rounded-md" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" className="w-full px-3 py-2 border rounded-md" onChange={handleChange} />

      <div className="flex justify-end gap-2 mt-5">
        <button className="px-4 py-2 bg-gray-300 rounded-md" onClick={onClose}>Cancel</button>
        <button className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700" onClick={handleSubmit}>Create</button>
      </div>
    </div>
  );
}
