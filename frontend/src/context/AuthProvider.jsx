import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/blogs/get-all-blogs"
        );
        const data = response.data;
        setBlogs(data.blogs);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <AuthContext.Provider value={{ blogs }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
