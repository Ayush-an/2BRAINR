// src/components/Profile.jsx
import { useState } from "react";
import getUser from "../utils/getUser";

export default function Profile() {
  const user = getUser();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
    photo: user?.photo || "", // store profile photo URL
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle profile photo change
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData((prev) => ({ ...prev, photo: event.target.result }));
      localStorage.setItem("userPhoto", event.target.result); // save temporarily
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    // TODO: API call to save profile changes
    console.log("Saved profile:", formData);
    setEditing(false);
  };

  return (
    <div className="w-full max-w-xl p-6 mx-auto bg-white shadow-lg card fade-in dark:bg-gray-800 rounded-xl">
      <div className="flex items-center gap-4">
        <div className="relative w-24 h-24 overflow-hidden rounded-full shadow-xl bg-gradient-to-br from-blue-500 to-indigo-600">
          {formData.photo ? (
            <img src={formData.photo} alt="profile" className="object-cover w-full h-full" />
          ) : (
            <span className="flex items-center justify-center w-full h-full text-4xl text-white">
              {formData.name?.charAt(0) || "U"}
            </span>
          )}
          {editing && (
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold">{formData?.name || "Unknown User"}</h2>
          <p className="text-gray-600 dark:text-gray-300">
            {user?.role || "Role Unknown"} • 2BRAINS
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {editing ? (
          <>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full p-2 border rounded"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-2 border rounded"
            />
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Mobile"
              className="w-full p-2 border rounded"
            />
            <div className="flex gap-3 mt-2">
              <button className="flex-1 btn-primary" onClick={handleSave}>
                Save
              </button>
              <button className="flex-1 btn-secondary" onClick={() => setEditing(false)}>
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p>
              <strong>Email:</strong> {formData.email}
            </p>
            <p>
              <strong>Mobile:</strong> {formData.mobile || "Not Added"}
            </p>
            <button className="w-full mt-3 btn-primary" onClick={() => setEditing(true)}>
              Edit Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
}
