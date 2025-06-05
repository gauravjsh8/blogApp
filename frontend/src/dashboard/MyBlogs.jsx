import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const MyBlogs = () => {
  const [myBlogs, setMyBlogs] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch blogs
  useEffect(() => {
    const getMyBlogs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/blogs/getMyBlog",
          { withCredentials: true }
        );
        setMyBlogs(response.data.blog);
      } catch (error) {
        console.log(error);
      }
    };

    getMyBlogs();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:3000/api/blogs/delete-blog/${id}`, {
        withCredentials: true,
      });

      setMyBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  // Navigate to update page
  const handleUpdate = (id) => {
    navigate(`/update-blog/${id}`);
  };

  return (
    <div className="container mx-auto px-8 my-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-7">
      {myBlogs.length > 0 ? (
        myBlogs.map((blog) => (
          <div
            key={blog._id}
            className="group bg-white rounded-lg hover:shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 p-4"
          >
            <div className="relative">
              <img
                src={blog.blogImage.url}
                className="w-full h-56 object-cover"
                alt="Blog"
              />
              <h1 className="absolute bottom-5 text-lg font-bold group-hover:text-yellow-500 px-3">
                {blog.title}
              </h1>
            </div>

            <div className="flex items-center gap-3 mt-3">
              <img
                src={blog.adminPhoto}
                alt="Admin"
                className="w-10 h-10 rounded-full border-2 border-yellow-400"
              />
              <div>
                <p className="font-medium">{blog.adminName}</p>
                <p className="text-sm text-gray-500">New</p>
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleUpdate(blog._id)}
                className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(blog._id)}
                className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No blogs found.</p>
      )}
    </div>
  );
};

export default MyBlogs;
