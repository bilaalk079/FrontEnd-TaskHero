import NavBar from "./components/NavBar";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import HomePage from "./pages/HomePage";
import LogIn from "./pages/LogIn";
import UserDashboard from "./pages/UserDashboard";
import Calendar from "./pages/Calendar";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import LogOut from "./pages/LogOut";
import Tasks from "./pages/Tasks";
import CreateTask from "./pages/CreateTask";
import SingleTask from "./pages/SingleTask";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/logout" element={<LogOut />} />

        <Route path="/dashboard" element={<Layout />}>
          <Route
            index
            element={
              <PrivateRoute>
                <UserDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="calendar"
            element={
              <PrivateRoute>
                <Calendar />
              </PrivateRoute>
            }
          />
          <Route
            path="tasks"
            element={
              <PrivateRoute>
                <Tasks />
              </PrivateRoute>
            }
          />
          <Route
            path="create"
            element={
              <PrivateRoute>
                <CreateTask />
              </PrivateRoute>
            }
          />
          <Route
            path="tasks/:id"
            element={
              <PrivateRoute>
                <SingleTask/>
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
