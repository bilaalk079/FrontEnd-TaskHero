import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import Construction from "../assets/under-construction.json";
import Lottie from "lottie-react";

const Calendar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Increase progress every 100ms until 90%
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 70) {
          clearInterval(interval);
          return oldProgress;
        }
        return oldProgress + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="justify-center items-center flex  h-screen">
     <div className="p-6 bg-slate-800 rounded-lg shadow-lg text-center text-white mx-auto my-6">
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

export default Calendar;
 