import React from 'react';
import { useNavigate } from 'react-router-dom';
import bg from '../assets/image2.jpg';

const Header = () => {
  const navigate = useNavigate();

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
          <button
            className="bg-blue-400 p-1 rounded-lg text-black"
            onClick={() => navigate('/signin')}
          >
            Sign In
          </button>
          <button
            className="bg-amber-500 p-1 rounded-lg text-black"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>
        </nav>
      </header>

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

export default Header;
