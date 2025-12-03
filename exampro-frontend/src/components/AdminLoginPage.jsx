// src/components/AdminLoginPage.jsx
import { useState } from "react";
import axios from "axios";
import flowerImage from "../assets/flower.png";
import backgroundImage from "../assets/wood.png";

export default function FlowerLogin() {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        alert("Login successful!");

        // Redirect based on role
        switch (res.data.user.role) {
          case "Admin":
            window.location.href = "/admin/dashboard";
            break;
          case "SuperUser":
            window.location.href = "/superuser/dashboard";
            break;
          default:
            window.location.href = "/dashboard";
        }
      }
    } catch (err) {
      console.log(err);

      if (err.response) {
        setError(err.response.data.message || "Login failed");
      } else {
        setError("Server unreachable");
      }
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen px-4 bg-center bg-cover"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="relative flex w-full max-w-3xl overflow-visible bg-white shadow-lg rounded-2xl">

        {/* Flower Icon top-left */}
        <div className="absolute z-20 flex items-center justify-center w-12 h-12 bg-yellow-400 border-4 border-white rounded-full shadow-lg -top-5 -left-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="white"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18" />
          </svg>
        </div>

        {/* Left Image */}
        <div className="relative hidden w-1/2 overflow-hidden sm:block rounded-l-2xl">
          <img
            src={flowerImage}
            alt="Flowers"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right Section */}
        <div className="flex flex-col justify-center w-full p-10 sm:w-1/2">

          {/* LOGIN TAB */}
          <div className="flex gap-8 mb-10 text-lg font-semibold">
            <button
              className={`${
                activeTab === "login"
                  ? "text-yellow-400"
                  : "text-gray-600 hover:text-yellow-400"
              }`}
            >
              Login
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <p className="mb-4 text-sm font-medium text-red-500">
              {error}
            </p>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-500">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-1 py-2 mt-1 text-gray-900 border-b border-gray-300 focus:border-yellow-400 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-500">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-1 py-2 mt-1 text-gray-900 border-b border-gray-300 focus:border-yellow-400 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-6 font-semibold text-white transition bg-yellow-400 rounded-full shadow-md hover:bg-yellow-300"
            >
              Get Started
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-500">An Online Platform that gives you better admin experience</p>
          <p className="text-sm font-semibold">Powered By 2BRAINR.com</p>

        </div>
      </div>
    </div>
  );
}
