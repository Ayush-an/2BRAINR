// src/components/Login.jsx

import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
<div
  className="flex items-center justify-center min-h-screen px-4 bg-center bg-cover"
  style={{ backgroundImage: "url('/images/login-signin-bg.png')" }}
>
      <div className="flex w-full max-w-5xl overflow-hidden bg-white shadow-xl rounded-3xl animate-fadeSlide">

        {/* LEFT SIDE WITH YOUR IMAGE */}
<div
  className="relative flex flex-col items-center justify-center w-1/2 p-10 text-white bg-center bg-cover"
  style={{ backgroundImage: "url('/images/login-sign.png')" }}
>
  <div className="absolute inset-0 bg-blue-600/40"></div>

  <div className="relative z-10 text-center">
  <img
    src="/images/logo.png"
    alt="Logo"
    className="object-contain mx-auto mb-3 h-80 w-80"
  />
</div>
  <p className="relative z-10 px-6 mt-8 text-xs text-center opacity-80">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae 
    justo eget sapien gravida placerat at vitae nunc.
  </p>
</div>
        {/* RIGHT SIDE */}
        <div className="flex flex-col justify-center w-1/2 p-12 bg-white">

          <h2 className="mb-2 text-3xl font-semibold text-center text-blue-600">
            Welcome
          </h2>
          <p className="mb-8 text-center text-gray-500">
            Login in to your account to continue
          </p>

          <form onSubmit={submit} className="space-y-6">

            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 transition border border-green-200 rounded-full outline-none bg-green-100/50 focus:border-green-400 focus:ring-2 focus:ring-green-200"
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 transition border border-green-200 rounded-full outline-none bg-green-100/50 focus:border-green-400 focus:ring-2 focus:ring-green-200"
              required
            />

            <div className="text-sm text-right">
              <button className="text-blue-500 hover:underline">
                Forgot your password?
              </button>
            </div>

            <button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-full shadow-md 
                       transition-transform hover:scale-[1.02]">
              LOG IN
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

    </div>
  );
}
