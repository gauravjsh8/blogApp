import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]); // ✅ Fix missing blogs state
  const [profile, setProfile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/users/my-profile",
          {
            withCredentials: true,
          }
        );
        const data = response.data;

        console.log(("PROFILEDATA", data));

        setProfile(response.data.user);
        setIsAuthenticated(true);
      } catch (error) {
        console.log(
          "Error fetching user:",
          error.response?.data || error.message
        );
      }
    };

    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/blogs/get-all-blogs"
        );
        setBlogs(response.data.blogs);
      } catch (error) {
        console.log(
          "Error fetching blogs:",
          error.response?.data || error.message
        );
      }
    };

    fetchUser();
    fetchBlogs();
  }, []);

  return (
    <AuthContext.Provider
      value={{ blogs, profile, setIsAuthenticated, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
