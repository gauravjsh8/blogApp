import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

const Hero = () => {
  const { blogs } = useAuth();
  console.log(blogs);
  return (
    <div className="container mx-auto px-8 my-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-7">
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => {
          return (
            <Link
              to="/"
              key={blog._id}
              className="bg-white rounded-lg hover:shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 "
            >
              <div>
                <img
                  src={blog.blogImage.url}
                  className="w-full h-56 object-cover"
                  alt="Blog"
                />
                <div></div>
                <h1>{blog.title}</h1>
              </div>
              <div>
                <img src={blog.adminPhoto} alt="Admin Photo" />
                <div>
                  <p>{blog.adminName}</p>
                  <p>New</p>
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

export default Hero;
