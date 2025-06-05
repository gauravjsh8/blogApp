import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Sidebar = ({ setComponent }) => {
  const { profile, isAuthenticated, setIsAuthenticated } = useAuth();
  console.log("PROF", profile);

  const navigate = useNavigate();

  const handleComponents = (value) => {
    setComponent(value);
  };

  const handleHome = () => {
    navigate("/");
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/logout",
        {},
        { withCredentials: true }
      );
      setIsAuthenticated(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="w-64 h-full shadow-lg fixed top-0 left-0 bg-gray-50 transition-transform duration-300 transform sm:translate-x-0">
      <div>
        <img
          src={profile?.photo?.url}
          className="w-24 h-24 rounded-full mx-auto mb-2"
        />
        <p className="text-lg font-bold text-center">{profile?.name}</p>
      </div>
      <ul className="">
        <button
          onClick={() => handleComponents("Update Blog")}
          className="w-full px-4 py-2 mb-3 bg-green-500 rounder-lg hover:bg-green-700 transition duration-300"
        >
          MY BLOGS
        </button>
        <button
          onClick={() => handleComponents("Create Blog")}
          className="w-full px-4 py-2 mb-3 bg-blue-500 rounder-lg hover:bg-blue-700 transition duration-300"
        >
          CREATE BLOGS
        </button>{" "}
        <button
          onClick={() => handleComponents("My Profile")}
          className="w-full px-4 py-2 mb-3 bg-pink-500 rounder-lg hover:bg-pink-700 transition duration-300"
        >
          MY PROFILE
        </button>{" "}
        <button
          onClick={handleHome}
          className="w-full px-4 py-2 mb-3 bg-red-500 rounder-lg hover:bg-red-700 transition duration-300"
        >
          HOME
        </button>{" "}
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 bg-yellow-500 rounder-lg hover:bg-yellow-700 transition duration-300"
        >
          LOGOUT
        </button>
      </ul>
    </div>
  );
};

export default Sidebar;
