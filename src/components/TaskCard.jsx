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
const TaskCard = ({
  title,
  content,
  Status,
  category,
  taskId,
  handleStatusToggle,
  handleDelete,
  handleEdit
}) => {
  const properStatus = Status.charAt(0).toUpperCase() + Status.slice(1);
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
    <div className="lg:min-w-82 bg-slate-950 text-white shadow-2xl p-3 rounded-2xl flex flex-col m-6  lg:h-82 gap-4 hover:scale-[1.02] transition-transform duration-200 ">
      <h1
        onClick={handleSingleTask}
        className="font-extrabold lg:text-3xl sm:text-2xl tracking-wide underline underline-offset-4 line-clamp-1 cursor-pointer hover:text-blue-300"
      >
        {title}
      </h1>
      <p className="text-lg text-slate-300  ">
        {content.length > 100 ? content.slice(0, 95) + "..." : content}
      </p>

      <div className="flex gap-3 items-center mt-2">
        <span
          className={`flex text-sm  font-semibold px-3 py-1 rounded-full bg-slate-800 gap-2 ${
            properStatus === "Completed" ? "text-green-700" : "text-yellow-400"
          }`}
        >
          {getStatusIcon(Status)}
          <p>{properStatus}</p>
        </span>

        <span className="flex text-sm  font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-300 gap-2">
          <MdCategory />
          <p>{properCategory}</p>
        </span>
      </div>
      <div className="flex gap-4 p-2  justify-end items-end">
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={handleEdit}
          whileTap={{ scale: 0.95 }}
          className=" px-5 p-2 text-sm font-bold text-white rounded-lg cursor-pointer bg-blue-600 hover:opacity-90 transition duration-300"
        >
          <FaEdit />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDelete}
          className=" px-5 p-2 text-sm font-bold text-white rounded-lg cursor-pointer bg-red-600 hover:opacity-90 transition duration-300"
        >
          <FaTrashAlt />
        </motion.button>
      </div>
      <div className="flex items-center gap-3 mt-auto">
        <input
          type="checkbox"
          checked={Status === "completed"}
          onChange={() => handleStatusToggle(taskId)}
          className="w-5 h-5 accent-green-600 cursor-pointer"

        />
        <label className="text-sm font-medium text-slate-300">
          Mark as Completed
        </label>
      </div>
    </div>
  );
};

export default TaskCard;
