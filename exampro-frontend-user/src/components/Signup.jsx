import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const register = (e) => {
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
    Join us today and explore premium exam features.
  </p>
</div>


        {/* RIGHT SIDE */}
        <div className="flex flex-col justify-center w-1/2 p-12 bg-white">

          <h2 className="mb-2 text-3xl font-semibold text-center text-blue-600">
            Create Account
          </h2>
          <p className="mb-8 text-center text-gray-500">
            Fill the details below
          </p>

          <form onSubmit={register} className="space-y-5">

            <input className="input-full" placeholder="Full Name" required />
            <input type="email" className="input-full" placeholder="Email" required />
            <input className="input-full" placeholder="Mobile Number" required />

            <select className="text-gray-700 bg-white input-full" required>
              <option>Select Organization</option>
              <option>D.Y Patil</option>
            </select>

            <input type="password" className="input-full" placeholder="Password" required />
            <input type="password" className="input-full" placeholder="Confirm Password" required />

            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-full shadow-md transition-transform hover:scale-[1.02]">
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
          </p>
        </div>
      </div>

    </div>
  );
}
