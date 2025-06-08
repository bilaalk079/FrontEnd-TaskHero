import React, { useState } from "react";
import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";
import { FiArrowLeft } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import api from "../api/axios";
import {useNavigate } from "react-router-dom";

const CreateTask = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const [newTask, setNewTask] = useState({
    title: "",
    content: "",
    category: "personal",
    priority: 2,
    dueDate: "",
  });

  const handleChange = (e) => {
    setNewTask((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddTask = async () => {
    if(!newTask.title || !newTask.content || !newTask.category || !newTask.priority || !newTask.dueDate){
      toast.error("All fields are required")
    }
    else{
      try{
        setLoading(true)
        const res = await api.post('/tasks', {
          title: newTask.title,
          content: newTask.content,
          dueDate: newTask.dueDate,
          priority: newTask.priority,
          category:newTask.category
        })

        if(res?.status === 201 && res.data.success === true){
          toast.success(res.data.message)
          setTimeout(() => {
            navigate('/dashboard/tasks')
          },5000)
        }
        else{
          toast.error(res.data.message)
          
        }
      }catch(err){
setLoading(false)
          console.error("Error: ", err)
          if(err.response){
            const errorMessage = err.response.data.message || "Error Adding new Task"
            toast.error(errorMessage)
          }
          else{
            toast.error("Network or Server Error")
          }

      }
    }

  };
  return (
    <div className="flex justify-center items-center min-h-screen ml-7">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col lg:flex-row items-center justify-center px-4 gap-8"
      >
        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950 bg-opacity-90">
            <ClipLoader color="#6366f1" size={80} />
          </div>
        )}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          <div className="bg-slate-950 p-8 rounded-2xl shadow-lg w-full lg:min-w-lg">
            <a href="/dashboard" className="text-indigo-600 hover:underline">
              <FiArrowLeft size={18} />
            </a>
            <h2 className="text-3xl font-bold text-indigo-500 text-center mb-6">
              Add a new Task
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-white mb-1" htmlFor="title">
                  Task Title*
                </label>
                <input
                  type="text"
                  name="title"
                  value={newTask.title}
                  onChange={handleChange}
                  required
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
                  value={newTask.content}
                  onChange={handleChange}
                  required
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
                  value={newTask.category}
                  onChange={handleChange}
                  id=""
                >
                  <option value="" disabled>Select Category</option>
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
                  value={newTask.priority}
                  onChange={handleChange}
                  id=""
                >
                  <option value="" disabled>Select Priority</option>
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
                  value={newTask.dueDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddTask}
                className="w-full py-3 text-lg font-bold text-white rounded-xl cursor-pointer bg-gradient-to-r from-indigo-700 via-purple-600 to-blue-600 hover:opacity-90 transition duration-300"
              >
                Add Task
              </motion.button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </motion.div>
    </div>
  );
};

export default CreateTask;
