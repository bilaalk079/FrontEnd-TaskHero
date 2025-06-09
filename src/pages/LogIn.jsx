import React, { useState } from "react";
import { FiArrowLeft, FiEye, FiEyeOff } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import useAuthStore from "../store/authStore";
import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleLogin = async () => {
    if (!user.email || !user.password) {
      toast.error("All fields are required");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        "https://backend-taskhero-1.onrender.com/api/auth/login",
        {
          email: user.email,
          password: user.password,
        },
        { withCredentials: true }
      );

      if (res.status === 200) {
        toast.success(res.data.message);
        login(res.data.user, res.data.accessToken);
        setTimeout(() => {
          navigate('/dashboard')
        }, 5000);
      } else {
        toast.error(res.data.message || "LogIn failed");   
      }
    } catch (err) {
       console.error("Error", err);
            setLoading(false);
            if (err.response) {
              const errorMessage =
                err.response?.data?.message || "Error creating new User";
              toast.error(errorMessage);
            } else {
              toast.error("Network or server error occurred"); 
            }
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 6000);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-slate-950 flex items-center justify-center px-4"
    >
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950 bg-opacity-90">
          <ClipLoader color="#6366f1" size={80} />
        </div>
      )}
      <div className="bg-slate-900 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <a href="/" className="text-indigo-600 hover:underline  ">
          <FiArrowLeft size={18} />
        </a>
        <h2 className="text-3xl font-bold text-indigo-500 text-center mb-6">
          Welcome Back
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-white mb-1" htmlFor="email">
              Email*
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={user.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div className="relative">
            <label className="block text-white mb-1" htmlFor="password">
              Password*
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={user.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 pr-12 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 mt-1 transform translate-y-1 text-indigo-400 hover:text-indigo-200 focus:outline-none cursor-pointer"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogin}
            className="w-full py-3 text-lg font-bold text-white rounded-xl cursor-pointer bg-gradient-to-r from-indigo-700 via-purple-600 to-blue-600 hover:opacity-90 transition duration-300"
          >
            Log In
          </motion.button>
        </div>

        <p className="text-slate-400 text-center mt-4 text-lg">
          Don't have an account ?{" "}
          <a
            href="/signup"
            className="text-indigo-400 hover:underline cursor-pointer"
          >
            Sign Up
          </a>
        </p>
      </div>
      <ToastContainer />
    </motion.div>
  );
};

export default LogIn;
