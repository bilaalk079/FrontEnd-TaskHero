import React, { useState } from "react";
import { FiMoon, FiSun, FiMenu, FiX } from "react-icons/fi";
import { FaHome, FaTasks, FaCalendarAlt, FaSignOutAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const SideBar = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsMobileSidebarOpen(!isMobileSidebarOpen);

  return (
    <div className={isMobileSidebarOpen ? "h-screen" : "flex"}>
      
      <div
        className={`lg:w-[15%]  min-h-screen  p-8 bg-slate-950 fixed  top-0 left-0 h-full z-50 transition-all ${
          isMobileSidebarOpen ? "translate-x-0 w-[60%]" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex flex-col items-center py-8 space-y-6">
          <div className="flex justify-between gap-10">
  <h1 className="font-bold text-3xl text-indigo-100 cursor-pointer">
            <p>TaskHero</p>
          </h1>
           <button
            className="lg:hidden  text-white text-3xl"
            onClick={toggleSidebar}
          >
            {isMobileSidebarOpen ? <FiX /> : <FiMenu className="text-black"/>}
          </button>
          </div>
        

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/dashboard"
            className="flex items-center hover:bg-slate-700 text-white text-lg font-bold hover:text-blue-300 w-full text-left px-6 py-3 rounded-xl transition-colors duration-300"
          >
            <FaHome className="mr-3"/> Home
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/dashboard/tasks"
            className="flex items-center hover:bg-slate-700 text-white text-lg font-bold hover:text-blue-300 w-full text-left px-6 py-3 rounded-xl transition-colors duration-300"
          >
            <FaTasks className="mr-3" /> Tasks
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/dashboard/calendar"
            className="flex items-center hover:bg-slate-700 text-white text-lg font-bold hover:text-blue-300 w-full text-left px-6 py-3 rounded-xl transition-colors duration-300"
          >
            <FaCalendarAlt className="mr-3" /> Calendar
          </motion.a>
          <hr className="bg-slate-50 w-full h-1 p-0.5" />
          {/* Logout Button */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/logout"
            className="flex items-center hover:bg-slate-700 text-white text-xl font-bold hover:text-blue-300 w-full text-left px-6 py-3 rounded-xl transition-colors duration-300"
          >
            <FaSignOutAlt className="mr-3" /> Logout
          </motion.a>
        </div>
      </div>

      {/* Main content area */}
      <div className="lg:ml-64 flex-1 p-6 w-full">
        <div className="flex justify-between items-center mb-6 w-full">
          <button
            className="lg:hidden sm:block text-white text-3xl"
            onClick={toggleSidebar}
          >
            {isMobileSidebarOpen ? <FiX /> : <FiMenu className="text-white block"/>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
