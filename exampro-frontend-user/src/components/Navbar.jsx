import { useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function Navbar() {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="flex items-center justify-between w-full p-4 bg-white shadow-md dark:bg-gray-900">

      {/* Theme Button on Left */}
      <button
        onClick={toggleTheme}
        className="p-2 bg-gray-100 rounded-full shadow dark:bg-gray-800 hover:scale-110"
      >
        {dark ? <FiSun className="text-yellow-400" /> : <FiMoon className="text-gray-700" />}
      </button>

      {/* Organization Name in Middle */}
      <h2 className="text-xl font-bold text-center text-blue-500 dark:text-white">
        D.Y Patil
      </h2>

      {/* Avatar on Right */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center text-white rounded-full shadow-lg w-11 h-11 bg-gradient-to-br from-blue-500 to-indigo-600">
          A
        </div>
      </div>
    </div>
  );
}
