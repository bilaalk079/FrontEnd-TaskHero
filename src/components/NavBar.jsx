import React, { useState } from "react";
import { FiMoon, FiSun, FiMenu, FiX } from "react-icons/fi";
import { motion } from "framer-motion";
const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="bg-slate-950  fixed top-0 w-full z-50">
      <div className="h-20 flex items-center justify-between px-4">
        <h1 className="font-bold text-2xl sm:text-5xl text-indigo-600 cursor-pointer">
          <a href="/">TaskHero</a>
        </h1>

        <div className="hidden lg:flex gap-9 text-white text-xl font-bold">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/"
            className="hover:text-blue-500"
          >
            Home
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#about"
            className="hover:text-blue-500"
          >
            About
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#features"
            className="hover:text-blue-500"
          >
            Features
          </motion.a>
                   <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#legal"
            className="hover:text-blue-500"
          >
            Legal
          </motion.a>
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/signup"
            className="bg-gradient-to-r from-indigo-700 via-purple-600 to-blue-600 text-white text-lg px-4 py-2 rounded-xl font-bold"
          >
            Sign Up
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/login"
            className="bg-gradient-to-r from-indigo-700 via-purple-600 to-blue-600 text-white text-lg px-4 py-2 rounded-xl font-bold"
          >
            Log In
          </motion.a>
        </div>

        <button className="lg:hidden text-white text-3xl" onClick={toggleMenu}>
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 text-white text-lg px-4 pb-4 space-y-4">
          <a href="/" className="block border-b border-slate-700 py-2">
            Home
          </a>
          <a href="#about" className="block border-b border-slate-700 py-2">
            About
          </a>
          <a href="#features" className="block border-b border-slate-700 py-2">
            Features
          </a>
         
          <a href="#legal" className="block border-b border-slate-700 py-2">
            Legal
          </a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/signup"
            className="block bg-gradient-to-r from-indigo-700 via-purple-600 to-blue-600 text-white text-center py-2 rounded-xl font-bold"
          >
            Sign Up
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/login"
            className="block bg-gradient-to-r from-indigo-700 via-purple-600 to-blue-600 text-white text-center py-2 rounded-xl font-bold mt-4"
          >
            Log In
          </motion.a>
        </div>
      )}
    </div>
  );
};

export default NavBar;
