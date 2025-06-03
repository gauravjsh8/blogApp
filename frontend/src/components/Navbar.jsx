import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
const Navbar = () => {
  const { blogs } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-gray-200 py-4 px-3">
      <div className="container px-4 mx-auto flex justify-between items-center">
        <div className="font-semibold text-xl">
          Blog<span className="text-red-500">Gaurav</span>
        </div>

        {/* Hamburger icon for small screens */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Nav links */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex md:items-center md:space-x-6 w-full md:w-auto`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-6">
            <Link to="/" className="hover:text-blue-500 py-2 md:py-0">
              HOME
            </Link>
            <Link to="/blogs" className="hover:text-blue-500 py-2 md:py-0">
              BLOGS
            </Link>
            <Link to="/creators" className="hover:text-blue-500 py-2 md:py-0">
              CREATORS
            </Link>
            <Link to="/about" className="hover:text-blue-500 py-2 md:py-0">
              ABOUT
            </Link>
            <Link to="/contact" className="hover:text-blue-500 py-2 md:py-0">
              CONTACT
            </Link>
          </ul>

          <div className="flex flex-col  mr-35   md:flex-row md:space-x-4 mt-4 md:mt-0">
            <Link
              to="/dashboard"
              className="bg-blue-600 text-white hover:bg-blue-800 duration-300 rounded-full px-4 py-1 text-center"
            >
              Dashboard
            </Link>
            <Link
              to="/login"
              className="bg-red-600 text-white hover:bg-red-800 duration-300 rounded-full px-4 py-1 text-center mt-2 md:mt-0"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
