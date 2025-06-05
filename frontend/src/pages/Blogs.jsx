import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

const Blogs = () => {
  const { blogs } = useAuth();
  return (
    <div className="container mx-auto px-8 my-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-7">
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => {
          return (
            <Link
              to={`/blogs/${blog._id}`}
              key={blog._id}
              className=" group bg-white rounded-lg hover:shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 "
            >
              <div className="relative">
                <img
                  src={blog.blogImage.url}
                  className="w-full h-56 object-cover"
                  alt="Blog"
                />
                <div></div>
                <h1 className="absolute bottom-5 text-lg font-bold group-hover:text-yellow-500">
                  {blog.title}
                </h1>
              </div>
              <div>
                <img
                  src={blog.adminPhoto}
                  alt="Admin Photo"
                  className="w-12 h-12 rounded-full border-2 border-yellow-400"
                />
                <div>
                  <p>{blog.adminName}</p>
                  <p className="text-sm text-gray-500">New</p>
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Blogs;
