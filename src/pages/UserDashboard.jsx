import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import useAuthStore from '../store/authStore.js';

const UserDashboard = () => {
  const user = useAuthStore((state) => state.user);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 80) {
          clearInterval(interval);
          return oldProgress;
        }
        return oldProgress + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1 className="text-white text-5xl mb-6">
        Welcome Back, <span className="text-slate-400">{user.username}</span>
      </h1>

      {/* Buttons container */}
      <div className="flex gap-4 mb-10">
        <Link
          to="/dashboard/create"
          className="px-6 py-3 bg-green-900 hover:bg-green-800 text-white font-semibold rounded-lg shadow-md transition"
        >
          Add a New Task
        </Link>
        <Link
          to="/dashboard/tasks"
          className="px-6 py-3  bg-gradient-to-r from-indigo-700 via-purple-600 to-blue-600 hover:opacity-90  text-white font-semibold rounded-lg shadow-md transition"
        >
          View All Tasks
        </Link>
      </div>

      <div className="p-4 my-10 rounded-lg bg-indigo-900 text-indigo-100 text-center italic shadow-md">
        <p className="text-2xl">
          "The secret of getting ahead is getting started." – Mark Twain
        </p>
      </div>

      <div className="p-6 bg-slate-800 rounded-lg shadow-lg text-center text-white max-w-md mx-auto my-6">
        <h2 className="text-xl font-semibold mb-4">🚧 This part is still under development</h2>
        <div className="w-full bg-gray-700 rounded-full h-5 overflow-hidden">
          <div
            className="bg-blue-500 h-5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="mt-2 text-sm text-gray-300">{progress}% complete</p>
      </div>
    </div>
  );
};

export default UserDashboard;
