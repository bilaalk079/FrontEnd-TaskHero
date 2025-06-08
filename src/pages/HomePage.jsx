import React, { useState } from "react";
import NavBar from "../components/NavBar";
import boostanim from "../assets/boostanim.json";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import features from "../assets/features.json";
import { FiArrowRight } from "react-icons/fi";
const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-slate-950 text-white overflow-hidden" // Ensure no overflow here
    >
      <NavBar />
      <div className="flex flex-col lg:flex-row justify-between items-center p-6 lg:p-10 gap-6 lg:h-screen">
        <Lottie
          animationData={boostanim}
          loop={true}
          className="w-2/3 h-2/3 m-3 mt-18"
        />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col justify-center items-center p-8 m-8"
        >
          <h1 className="text-5xl lg:text-6xl font-bold">
            Boost your{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-fuchsia-500 bg-clip-text text-transparent">
              Productivity
            </span>{" "}
            in seconds with{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-fuchsia-500 bg-clip-text text-transparent">
              TaskHero
            </span>
          </h1>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-48 h-16 text-2xl m-8 py-3 font-bold text-white rounded-xl cursor-pointer bg-gradient-to-r from-indigo-700 via-purple-600 to-blue-600 hover:opacity-90 transition duration-300"
          >
            <a href="/signup">Get Started </a>
          </motion.button>
        </motion.div>
      </div>

      <motion.div
        whileInView={{ opacity: 1, x: 0, transition: { duration: 1 } }}
        initial={{ opacity: 0, x: 50 }}
        className="flex items-center justify-center"
      >
        <hr className="h-0.5 bg-gradient-to-r w-5/6 from-indigo-600 via-purple-600 to-blue-600 border-0" />
      </motion.div>
      <motion.div
        whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }}
        initial={{ opacity: 0, y: 50 }}
        className="p-10 bg-slate-950 grid place-items-center w-full text-white lg:h-screen overflow-hidden"
        id="about"
      >
        <div className="text-center max-w-4xl">
          <h2 className="text-3xl lg:text-6xl font-extrabold mb-8 mt-9 bg-gradient-to-r from-indigo-600 to-fuchsia-500 bg-clip-text text-transparent">
            What is TaskHero?
          </h2>
          <p className="text-xl font-bold text-white">
            TaskHero is more than just a task manager; it's your all-in-one
            productivity partner. Whether you're juggling daily tasks, managing
            long-term projects, or working with a team, TaskHero is designed to
            streamline your workflow and help you stay organized. With TaskHero,
            you can track and prioritize tasks with ease, ensuring nothing slips
            through the cracks. <br />
            <br />
            Gone are the days of endless to-do lists and missed deadlines.
            TaskHero's intuitive interface allows you to organize tasks based on
            what's most important—whether that's due dates, priority levels, or
            categories. This flexibility means that whether you're planning your
            day or executing a complex project, TaskHero adapts to your needs.{" "}
            <br />
            <br />
            Stay on top of your workload by setting reminders, due dates, and
            priorities for each task. You can even filter and sort your tasks by
            the things that matter most to you—whether it’s urgency, importance,
            or deadlines. TaskHero’s design ensures you spend less time
            searching for what’s next and more time getting things done.
          </p>
        </div>
      </motion.div>

      <motion.div
        whileInView={{ opacity: 1, x: 0, transition: { duration: 1 } }}
        initial={{ opacity: 0, x: 50 }}
        className="flex items-center justify-center"
      >
        <hr className="h-0.5 bg-gradient-to-r w-5/6 from-indigo-600 via-purple-600 to-blue-600 border-0" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center justify-center p-8 lg:h-screen "
        id="features"
      >
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 1 }}
          className="bg-slate-900 p-8 h-10/12 rounded-3xl shadow-xl w-full  max-w-7xl"
        >
          <h1 className="bg-gradient-to-r text-4xl font-extrabold from-indigo-600 to-fuchsia-500 bg-clip-text text-transparent">
            Why Use TaskHero?
          </h1>
          <div className="flex lg:flex-row flex-col justify-between  items-center p-2">
            <ul className="m-5">
              <li className="text-xl lg:text-2xl m-5 font-bold text-indigo-500">
                ⚡. Task Management
              </li>
              <li className="text-xl lg:text-2xl m-5 font-bold text-indigo-500">
                ⚡. Task Status Tracking
              </li>
              <li className="text-xl lg:text-2xl m-5 font-bold text-indigo-500">
                ⚡. Task Prioritization
              </li>
              <li className="text-xl lg:text-2xl m-5 font-bold text-indigo-500">
                ⚡. Task Categorization
              </li>
              <li className="text-xl lg:text-2xl m-5 font-bold text-indigo-500">
                ⚡. Advanced Sorting
              </li>
              <li className="text-xl lg:text-2xl m-5 font-bold text-indigo-500">
                ⚡. Calendar Integration
              </li>
              <li className="text-xl lg:text-2xl m-5 font-bold text-indigo-500">
                ⚡. Powerful Filtering
              </li>
            </ul>
            <div className="">
              <Lottie
                animationData={features}
                loop={true}
                className="w-3/4 h-3/4 m-3"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        whileInView={{ opacity: 1, x: 0, transition: { duration: 1 } }}
        initial={{ opacity: 0, x: 50 }}
        className="flex items-center justify-center"
      >
        <hr className="h-0.5 bg-gradient-to-r w-5/6 from-indigo-600 via-purple-600 to-blue-600 border-0" />
      </motion.div>
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 1 }}
        className="bg-gradient-to-r m-5 mt-10 from-indigo-700 to-fuchsia-600 text-white py-20 px-6 flex flex-col items-center justify-center text-center"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          Ready to Supercharge Your Productivity?
        </h2>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl">
          Join thousands of productive users already getting more done with
          TaskHero. Stay focused. Stay organized. Get started today.
        </p>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="/signup"
          className="px-10 py-4 text-xl font-bold bg-white text-indigo-700 rounded-full shadow-lg hover:shadow-2xl transition duration-300"
        >
          Get Started <FiArrowRight className="inline ml-2" />
        </motion.a>
      </motion.div>
      <footer className="bg-slate-900 text-white py-10 px-6 mt-10" id="legal">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold text-indigo-500">TaskHero</h3>
            <p className="text-sm text-slate-400 mt-2">
              Your ultimate productivity partner.
            </p>
          </div>

          <div className="flex space-x-6">
            <a
              href="/"
              className="text-slate-300 hover:text-indigo-400 transition"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-slate-300 hover:text-indigo-400 transition"
            >
              About
            </a>
            <a
              href="#features"
              className="text-slate-300 hover:text-indigo-400 transition"
            >
              Features
            </a>
          </div>
        </div>
        <hr className="my-6 border-slate-700" />
        <p className="text-center text-sm text-slate-500">
          © {new Date().getFullYear()} TaskHero. All rights reserved.
        </p>
      </footer>
    </motion.div>
  );
};

export default HomePage;
