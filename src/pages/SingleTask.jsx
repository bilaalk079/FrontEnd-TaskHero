import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdCategory } from "react-icons/md";
import api from "../api/axios";
import {
  FaHourglassHalf,
  FaCheckCircle,
  FaEdit,
  FaTrash,
  FaTrashAlt,
  FaArrowAltCircleLeft,
  FaArrowCircleLeft,
  FaArrowLeft,
} from "react-icons/fa";
import { motion } from "framer-motion";

const SingleTask = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  
 

  const handleStatusToggle = async (taskId) => {
    try {
      const newStatus = task.status === "completed" ? "pending" : "completed";

      await api.put(`/tasks/${taskId}`, { status: newStatus });
      setTask({...task, status: newStatus})
    } catch (err) {
      console.error("Failed to update Status", err);
    }
  };
  useEffect(() => {
    // Simulated fetch – replace with your real API
    const fetchTask = async () => {
      try {
        const res = await api.get(`/tasks/${id}`);
        const data = await res.data.data;
        setTask(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching task:", error);
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <FaCheckCircle />;
        return <FaHourglassHalf />;
      default:
        return <FaHourglassHalf />;
    }
  };

  if (loading) return <p className="text-3xl text-white font-bold">Loading task...</p>;
  if (!task) return <p className="text-3xl text-white font-bold">Task not found</p>;

  return (
    <div className="flex justify-center items-center h-screen  mx-auto">
    <div className="max-w-xl bg-slate-950 text-white shadow-2xl p-12 rounded-2xl flex flex-col m-3 gap-4 hover:scale-[1.02] transition-transform duration-200 cursor-pointer">
      <a href="/dashboard/tasks" className="text-2xl font-bold my-1 "><FaArrowLeft/></a>
      <h1 className="font-extrabold text-3xl tracking-wide underline underline-offset-4">
        {task.title}
      </h1>
      <p className="text-lg text-slate-300">{task.content}</p>

      <div className="flex gap-3 items-center mt-2">
        <span
          className={`flex text-sm  font-semibold px-3 py-1 rounded-full bg-slate-800 gap-2 ${
            task.status === "completed" ? "text-green-700" : "text-yellow-400"
          }`}
        >
          {getStatusIcon(task.status)}
          <p>{task.status}</p>
        </span>

        <span className="flex text-sm  font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-300 gap-2">
          <MdCategory />
          <p>{task.category}</p>
        </span>
      </div>
      <div className="flex gap-4 p-2  justify-end items-end">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className=" px-5 p-2 text-sm font-bold text-white rounded-lg cursor-pointer bg-blue-600 hover:opacity-90 transition duration-300"
        >
          <FaEdit />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className=" px-5 p-2 text-sm font-bold text-white rounded-lg cursor-pointer bg-red-600 hover:opacity-90 transition duration-300"
        >
          <FaTrashAlt />
        </motion.button>
      </div>
      <div className="flex items-center gap-3 mt-auto">
        <input
          type="checkbox"
          checked={task.status === "completed"}
          onChange={() => handleStatusToggle(task._id)}
          className="w-5 h-5 accent-green-600 cursor-pointer"
        />
        <label className="text-sm font-medium text-slate-300">
          Mark as Completed
        </label>
      </div>
    </div>
    </div>
  );
};

export default SingleTask;
