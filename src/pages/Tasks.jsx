import React, { useEffect, useState } from "react";
import api from "../api/axios.js";
import TaskCard from "../components/TaskCard";
import { motion } from "framer-motion";
import ListCard from "../components/ListCard.jsx";
import { MdClose, MdViewList, MdViewModule } from "react-icons/md";
import { FaFilter } from "react-icons/fa";
import EditModal from "../components/EditModal.jsx";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [cardView, setCardView] = useState(true);
  const [filterModal, setFilterModal] = useState(true);
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortBy, setSortBy] = useState("priority");
  const clearFilter = () => {
    setStatus("");
    setCategory("");
    setPriority("");
  };
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleEditClick = (task) => {
    setTaskToEdit(task);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setTaskToEdit(null);
  };

  const handleStatusToggle = async (taskId) => {
    try {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId
            ? {
                ...task,
                status: task.status === "completed" ? "pending" : "completed",
              }
            : task
        )
      );
      const updatedTask = tasks.find((task) => task._id === taskId);
      const newStatus =
        updatedTask.status === "completed" ? "pending" : "completed";

      await api.put(`/tasks/${taskId}`, { status: newStatus });
    } catch (err) {
      console.error("Failed to update Status", err);
    }
  };
  const handleDelete = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      // optionally update local state if you're using useState or a global store
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get("/tasks", {
          params: {
            status,
            priority,
            page,
            category,
            sortBy,
            sortOrder,
            limit: 6,
          },
        });
        if (Array.isArray(res.data.data)) {
          setTasks(res.data.data);
        } else {
          console.error("Expected an array but got:", res.data);
        }
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [page, priority, status, category, sortBy, sortOrder]);
  useEffect(() => {
    setPage(1); // reset to first page when filter/sort changes
  }, [status, priority, category, sortBy, sortOrder]);

  if (loading)
    return (
      <p className="text-white font-bold text-3xl text-center">Loading...</p>
    );

  return (
    <div className="w-full ">
      <div className="flex justify-between items-center p-2 w-full -mt-4 bg-slate-950 rounded-2xl">
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href={"/dashboard/create"}
          className=" p-2 text-lg font-bold text-white rounded-xl cursor-pointer bg-gradient-to-r from-indigo-700 via-purple-600 to-blue-600 hover:opacity-90 transition duration-300"
        >
          Add a New Task
        </motion.a>
        <button
          className="m-5 p-3 text-white text-xl  font-bold bg-slate-800 rounded-full cursor-pointer hover:bg-slate-950"
          onClick={() => setCardView(!cardView)}
        >
          {!cardView ? <MdViewModule /> : <MdViewList />}
        </button>
      </div>
      <div className="flex">
        <button
          className="text-white font-bold flex text-2xl p-2 rounded-xl cursor-pointer my-3 mx-1 bg-slate-800 hover:bg-slate-700"
          onClick={() => setFilterModal(false)}
        >
          <span> Filters </span>
          <FaFilter />
        </button>
        <span className="text-white text-2xl font-bold my-5 mx-1">|</span>
        <h1 className="text-xl my-3  p-2 font-bold text-white ">Sort:</h1>
        <select
          onChange={(e) => setSortOrder(e.target.value)}
          className="rounded-2xl lg:p-3 bg-slate-800 text-white sm:p-0 my-3 sm:mx-0 lg:mx-1"
        >
          <option value="desc">Priority: High to Low</option>
          <option value="asc">Priority: Low to High</option>
        </select>
        {!filterModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-opacity-50">
            <div className="bg-slate-950 rounded-lg p-6 w-96 shadow-lg relative">
              {/* Close Button */}
              <button
                className=" text-white bg-slate-700 hover:bg-slate-600 rounded-full p-3 m-2"
                onClick={() => setFilterModal(true)}
              >
                <MdClose />
              </button>

              <select
                className="p-2 m-3 rounded-full bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 w-full"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                <option value="">All Categories</option>
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

              <select
                onChange={(e) => setStatus(e.target.value)}
                value={status}
                className="rounded-full p-2 bg-slate-800 text-white m-3 w-full"
              >
                <option value="">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>

              <select
                onChange={(e) => setPriority(e.target.value)}
                value={priority}
                className="rounded-full p-2 bg-slate-800 text-white m-3 w-full"
              >
                <option value="">All Priorities</option>
                <option value="3">High</option>
                <option value="2">Medium</option>
                <option value="1">Low</option>
              </select>
              <button
                className="p-2 text-lg font-bold text-white rounded-xl cursor-pointer bg-gradient-to-r from-indigo-700 via-purple-600 to-blue-600 hover:opacity-90 transition duration-300"
                onClick={clearFilter}
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {tasks.length > 0 ? (
        cardView ? (
          <div className="grid grid-cols-1 lg:grid-cols-3  justify-center items-center">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                title={task.title}
                content={task.content}
                Status={task.status}
                handleStatusToggle={handleStatusToggle}
                taskId={task._id}
                handleDelete={() => handleDelete(task._id)}
                category={task.category}
                handleEdit={() => handleEditClick(task)}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 w-full justify-center items-center m-2">
            {tasks.map((task) => (
              <ListCard
                key={task._id}
                status={task.status}
                handleEdit={() => handleEditClick(task)}
                category={task.category}
                handleDelete={() => handleDelete(task._id)}
                title={task.title}
                handleStatusToggle={handleStatusToggle}
                taskId={task._id}
              />
            ))}
          </div>
        )
      ) : (
        <h1 className="text-center text-4xl font-bold text-white m-10">
          {" "}
          No Tasks Found,{" "}
          <a className="text-blue-600 hover:underline" href="/dashboard/create">
            Create a new Task
          </a>{" "}
        </h1>
      )}
      <EditModal
        isOpen={isEditModalOpen}
        handleClose={closeEditModal}
        task={taskToEdit}
        handleUpdate={(updatedTask) => setTasks((prev) => prev.map((t) => (t._id === updatedTask._id ? updatedTask : t)))}
      />
      <div className="flex justify-center items-center gap-4 my-4">
        <button
          className="bg-slate-800 px-4 py-2 text-white rounded cursor-pointer hover:bg-slate-950 disabled:text-slate-400 disabled:cursor-not-allowed disabled:bg-slate-700"
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Prev
        </button>
        <span className="text-white">Page {page}</span>
        <button
          className="bg-slate-800 px-4 py-2 text-white rounded cursor-pointer hover:bg-slate-950 disabled:text-slate-400 disabled:cursor-not-allowed disabled:bg-slate-700"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={tasks.length <= 6}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Tasks;
