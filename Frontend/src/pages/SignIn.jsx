import React, { useState, useContext } from 'react';
import bg from '../assets/image2.jpg';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { userDataContext } from '../context/UserContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignIn = () => {
  const [showFormSignIn, setShowFormSignIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { serverUrl,userData,setUserData } = useContext(userDataContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Live password validation
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (value.length > 0 && value.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    } else {
      setPasswordError("");
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErr("");

    // Prevent submission if password invalid
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }

    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      setUserData(result.data)
    } catch (error) {
      console.log(error);
      setUserData(null)
      naviagte("/home")
      setErr(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="relative w-full h-[100vh] overflow-hidden">
      {/* Background Image */}
      <img src={bg} alt="background" className="w-full h-full object-cover" />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Animated Center Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-white text-5xl md:text-6xl font-extrabold whitespace-nowrap animate-slide">
          Welcome to AI Virtual Assistant
        </h1>
      </div>

      {/* Header */}
      <header className="absolute top-0 left-0 w-full flex justify-between items-center px-8 py-4 bg-black/30 backdrop-blur-sm text-white">
        <h1 className="text-xl font-bold">Virtual Assistant</h1>
        <nav className="space-x-6">
          <Link
            to="/signin"
            className="bg-blue-400 p-1 rounded-lg text-black"
            onClick={() => setShowFormSignIn(true)}
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="bg-amber-500 p-1 rounded-lg text-black"
          >
            Sign Up
          </Link>
        </nav>
      </header>

      {/* Signup Form Modal */}
      {showFormSignIn && (
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="bg-black/1 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/40 relative">
            {/* Close Button */}
            <button
              onClick={() => setShowFormSignIn(false)}
              className="absolute top-3 right-3 text-white text-lg hover:text-red-400"
            >
              ✕
            </button>

            {/* Heading */}
            <h2 className="text-3xl font-bold text-center text-white mb-2">
              Sign In to Virtual Assistant
            </h2>
            <p className="text-center text-gray-200 mb-6 text-sm">
              Join us and explore amazing features!
            </p>

            {/* Form */}
            <form className="flex flex-col space-y-4" onSubmit={handleSignIn}>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-3 rounded-lg border border-white/30 bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className={`w-full p-3 pr-10 rounded-lg border ${passwordError
                        ? "border-red-500 focus:ring-red-400"
                        : "border-white/30 focus:ring-blue-400"
                      } bg-white/10 text-white placeholder-gray-300 focus:outline-none transition`}
                    required
                    onChange={handlePasswordChange}
                    value={password}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center text-gray-300 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {/* Live error message */}
                {passwordError && (
                  <p className="text-white text-sm mt-2 ml-1">{passwordError}</p>
                )}
              </div>

              {/* Server error */}
              {err.length > 0 && (
                <p className="text-white text-sm text-center">*{err}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition duration-200 shadow-lg"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Custom CSS for animation */}
      <style>{`
        @keyframes slide {
          0% { transform: translateX(-100%); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        .animate-slide {
          animation: slide 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default SignIn;
