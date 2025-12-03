
// src/components/Profile.jsx
import getUser from "../utils/getUser";

export default function Profile() {
  const user = getUser();
  return (
    <div className="w-full max-w-xl mx-auto card fade-in">

      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-24 h-24 text-4xl text-white rounded-full shadow-xl bg-gradient-to-br from-blue-500 to-indigo-600">
         {user?.name?.charAt(0)}
        </div>

        <div>
          <h2 className="text-2xl font-bold">{user?.name}</h2>
          <p className="text-gray-600 dark:text-gray-300"> {user?.role} • 2BRAINS</p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Mobile:</strong> {user?.mobile || "Not Added"}</p>

        <button className="w-full mt-3 btn-primary">Edit Profile</button>
      </div>

    </div>
  );
}
