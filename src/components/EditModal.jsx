import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";


const EditModal = ({ task, isOpen, handleClose, handleUpdate }) => {
 const [form, setForm] = useState({
  title: "",
  content: "",
  category: "",
  priority: "",
  dueDate: ""
 })

  useEffect(
    () => {
      if (task && isOpen) {
        setForm({
          title: task.title ,
          content: task.content ,
          category: task.category ,
          priority: task.priority,
          dueDate: task.dueDate,
        });
      }
    },
    [task, isOpen]
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await api.put(`/tasks/${task._id}`, form);
      handleUpdate(res.data.data);
      handleClose();
    } catch (err) {
      console.error("Failed to update Task", err);
    }
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-xl bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-slate-950 p-8 rounded-2xl shadow-lg w-full lg:min-w-lg">
        <a href="/dashboard/tasks" className="text-indigo-600 hover:underline">
          <FiArrowLeft size={18} />
        </a>
        <h2 className="text-3xl font-bold text-indigo-500 text-center mb-6">
          Update A Task
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-white mb-1" htmlFor="title">
              Task Title*
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div>
            <label className="block text-white mb-1" htmlFor="content">
              Details*
            </label>
            <textarea
              type="text"
              name="content"
              rows={3}
              maxLength={400}
              cols={10}
              value={form.content}
              onChange={handleChange}
             
              className="w-full px-4 py-2 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-white mb-1" htmlFor="category">
              Category*
            </label>
            <select
              className="w-full px-4 py-2 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              name="category"
              value={form.category}
              onChange={handleChange}
              id=""
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="study">Study</option>
              <option value="finance">Finance</option>
              <option value="family">Family</option>
              <option value="health">Health</option>
              <option value="home">Home</option>
              <option value="shopping">Shopping</option>
              <option value="hobbies">Hobbies</option>
              <option value="travels">Travels</option>
              <option value="events">Events</option>
            </select>
          </div>
          <div>
            <label className="block text-white mb-1" htmlFor="priority">
              Priority*
            </label>
            <select
              className="w-full px-4 py-2 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              name="priority"
              value={form.priority}
              onChange={handleChange}
              id=""
            >
              <option value="" disabled>
                Select Priority
              </option>
              <option value={1}>Low</option>
              <option value={2}>Normal/Medium</option>
              <option value={3}>High</option>
            </select>
          </div>
          <div>
            <label className="block text-white mb-1" htmlFor="dueDate">
              dueDate*
            </label>
            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
             
              className="w-full px-4 py-2 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div className="flex justify-end gap-2">
          <button onClick={handleClose} className="bg-red-600 font-bold cursor-pointer text-white p-3 rounded-xl">
            Cancel
          </button>
         <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            className="p-3 text-lg font-bold text-white rounded-xl cursor-pointer bg-gradient-to-r from-indigo-700 via-purple-600 to-blue-600 hover:opacity-90 transition duration-300"
          >
            Update Task
          </motion.button>
        </div>
          
        </div>
      </div>
    </div>
  );
};

export default EditModal;
