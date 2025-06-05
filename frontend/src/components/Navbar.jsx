import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import axios from "axios";

const Navbar = () => {
  const { isAuthenticated, profile, setIsAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
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
    <nav className="bg-gray-200 py-4 px-3 ">
      <div className="   flex justify-between items-center">
        {/* Logo */}
        <div className="font-semibold text-xl">
          Blog<span className="text-red-500">Gaurav</span>
        </div>

        {/* Hamburger icon */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="focus:outline-none"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Menu Items */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex md:items-center md:space-x-6 w-full md:w-auto mt-4 md:mt-0`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-6">
            <li>
              <Link to="/" className="hover:text-blue-500 py-2 md:py-0 block">
                HOME
              </Link>
            </li>
            <li>
              <Link
                to="/blogs"
                className="hover:text-blue-500 py-2 md:py-0 block"
              >
                BLOGS
              </Link>
            </li>
            <li>
              <Link
                to="/creators"
                className="hover:text-blue-500 py-2 md:py-0 block"
              >
                CREATORS
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-blue-500 py-2 md:py-0 block"
              >
                ABOUT
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-blue-500 py-2 md:py-0 block"
              >
                CONTACT
              </Link>
            </li>
          </ul>

          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mt-4 md:mt-0">
            {isAuthenticated && profile?.role === "admin" && (
              <Link
                to="/dashboard"
                className="bg-blue-600 text-white hover:bg-blue-800 duration-300 rounded-full px-4 py-1 text-center"
              >
                Dashboard
              </Link>
            )}

            {isAuthenticated ? (
              <button
                className="bg-green-600 text-white hover:bg-green-800 duration-300 rounded-full px-4 py-1 text-center mt-2 md:mt-0"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-red-600 text-white hover:bg-red-800 duration-300 rounded-full px-4 py-1 text-center mt-2 md:mt-0"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
