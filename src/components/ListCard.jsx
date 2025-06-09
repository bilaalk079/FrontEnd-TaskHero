import React from "react";
import { MdCategory } from "react-icons/md";
import {
  FaHourglassHalf,
  FaCheckCircle,
  FaEdit,
  FaTrash,
  FaTrashAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";

const ListCard = ({ title, status, category, handleStatusToggle, taskId, handleDelete, handleEdit }) => {
  const properStatus = status.charAt(0).toUpperCase() + status.slice(1);
  const properCategory = category.charAt(0).toUpperCase() + category.slice(1);
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <FaCheckCircle />;
      case "pending":
        return <FaHourglassHalf />;
      default:
        return <FaHourglassHalf />;
    }
  };
  const handleSingleTask = () => {
    window.location.href = `/dashboard/tasks/${taskId}`;
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-slate-950 p-4 sm:p-5 m-2 rounded-2xl max-w-full">
      <p
        className="text-white font-bold text-xl sm:text-xl cursor-pointer hover:text-blue-400 mb-3 sm:mb-0 flex-shrink-0"
        onClick={handleSingleTask}
      >
        {title}
      </p>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 w-full sm:w-auto">
        <div className="flex flex-wrap gap-3 items-center">
          <span
            className={`flex text-sm font-semibold px-3 py-1 rounded-full bg-slate-800 gap-2 ${
              properStatus === "Completed"
                ? "text-green-700"
                : "text-yellow-400"
            }`}
          >
            {getStatusIcon(status)}
            <p>{properStatus}</p>
          </span>

          <span className="flex text-sm font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-300 gap-2">
            <MdCategory />
            <p>{properCategory}</p>
          </span>
        </div>
        <div className="flex items-center justify-between w-full">
          <input
            type="checkbox"
            checked={status === "completed"}
            onChange={() => handleStatusToggle(taskId)}
            className="w-6 h-6 accent-green-600 cursor-pointer"
            aria-label="Toggle task status"
          />
          <div className="flex gap-2 border border-slate-700 rounded-xl p-2 items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEdit}
              className="px-4 py-2 text-sm font-bold text-white rounded-lg cursor-pointer bg-blue-600 hover:opacity-90 transition duration-300"
              aria-label="Edit task"
            >
              <FaEdit />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleDelete}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 text-sm font-bold text-white rounded-lg cursor-pointer bg-red-600 hover:opacity-90 transition duration-300"
              aria-label="Delete task"
            >
              <FaTrashAlt />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
