import axios from "axios";
import React, { useState } from "react";
import { FiArrowLeft, FiEye, FiEyeOff } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import { motion } from "framer-motion";
import working from "../assets/working.json";
import Lottie from "lottie-react";

const SignUp = () => {
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);

  const [newUser, setNewUser] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e) => {
    setNewUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddUser = async () => {
    if (newUser.password !== confirmPassword) {
      toast.error("Passwords don't match");
    } else {
      setLoading(true);
      try {
        const res = await axios.post("https://backend-taskhero-1.onrender.com/api/auth/signup", {
          email: newUser.email,
          username: newUser.username,
          password: newUser.password,
        });

        if (res.status === 201 && res.data.success) {
          toast.success(res.data.message);
          setTimeout(() => {
            window.location.href = "/login";
          }, 5000);
        } else {
          toast.error(res.data.message);
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
        }, 5000);
      }
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-slate-950 flex flex-col lg:flex-row items-center justify-center px-4 gap-8"
    >
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950 bg-opacity-90">
          <ClipLoader color="#6366f1" size={80} />
        </div>
      )}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 w-full max-w-7xl">
        <div className="hidden lg:flex flex-col items-center justify-center gap-4">
          <Lottie
            animationData={working}
            loop={true}
            className="w-2/3 h-2/3 m-3"
          />
          <div>
            <h1 className="font-bold text-white text-2xl">
              Sign Up to start managing Your{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-fuchsia-500 bg-clip-text text-transparent">
                tasks
              </span>{" "}
              with{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-fuchsia-500 bg-clip-text text-transparent">
                TaskHero
              </span>
            </h1>
          </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-2xl shadow-lg w-full max-w-md">
          <a href="/" className="text-indigo-600 hover:underline">
            <FiArrowLeft size={18} />
          </a>
          <h2 className="text-3xl font-bold text-indigo-500 text-center mb-6">
            Create Your Account
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-white mb-1" htmlFor="email">
                Email*
              </label>
              <input
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            <div>
              <label className="block text-white mb-1" htmlFor="username">
                Username*
              </label>
              <input
                type="text"
                name="username"
                value={newUser.username}
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
                value={newUser.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 pr-12 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 cursor-pointer transform mt-1 translate-y-1 text-indigo-400 hover:text-indigo-200 focus:outline-none"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </motion.button>
            </div>

            <div className="relative mt-4">
              <label className="block text-white mb-1" htmlFor="con_password">
                Confirm Password*
              </label>
              <input
                type={showConPassword ? "text" : "password"}
                name="con_password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-2 pr-12 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowConPassword((prev) => !prev)}
                className="absolute right-3 cursor-pointer transform mt-1 translate-y-1 text-indigo-400 hover:text-indigo-200 focus:outline-none"
              >
                {showConPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </motion.button>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddUser}
              className="w-full py-3 text-lg font-bold text-white rounded-xl cursor-pointer bg-gradient-to-r from-indigo-700 via-purple-600 to-blue-600 hover:opacity-90 transition duration-300"
            >
              Sign Up
            </motion.button>
          </div>

          <p className="text-slate-400 text-center mt-4 text-lg">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-indigo-400 hover:underline cursor-pointer"
            >
              Log In
            </a>
          </p>
        </div>
      </div>
      <ToastContainer />
    </motion.div>
  );
};

export default SignUp;
