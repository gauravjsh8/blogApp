import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
export const AuthContext = createContext();
import Cookie from "js-cookie";

export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = Cookie.get("token");
        const parsedToken = token ? JSON.parse(token) : undefined;
        if (parsedToken) {
          const response = await axios.get(
            "http://localhost:3000/api/users/my-profile",
            {
              withCredentials: true,
            }
          );
          console.log("RESP", response);
          const data = response.data;
          console.log("DATA", data);
          setUser(data.user);
        }
      } catch (error) {
        console.log("Error", error.response);
      }
    };

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
    fetchUser();
    fetchBlogs();
  }, []);

  return (
    <AuthContext.Provider value={{ blogs, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
