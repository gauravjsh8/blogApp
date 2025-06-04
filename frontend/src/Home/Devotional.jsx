import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

const Devotional = () => {
  const { blogs } = useAuth();
  const devotionalBlogs = blogs?.filter((blog) => blog.category === "travel");

  return (
    <>
      <div className="container mx-auto px-8 my-10">
        <h1 className="text-lg font-bold mb-6">Devotional</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-7">
          {devotionalBlogs && devotionalBlogs.length > 0 ? (
            devotionalBlogs.map((blog) => (
              <Link
                to="/"
                key={blog._id}
                className="group bg-white rounded-lg hover:shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <div className="relative">
                  <img
                    src={blog.blogImage.url}
                    className="w-full h-56 object-cover"
                    alt="Blog"
                  />
                  <h1 className="absolute bottom-5 left-3 text-lg font-bold group-hover:text-yellow-500 bg-white bg-opacity-70 px-2 py-1 rounded">
                    {blog.title}
                  </h1>
                </div>
                <div className="flex items-center gap-3 p-4">
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
            ))
          ) : (
            <p>No devotional blogs found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Devotional;
