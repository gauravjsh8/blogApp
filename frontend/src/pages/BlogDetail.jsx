import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/blogs/single-blog/${id}`
        );
        setBlog(response.data.blog);
        console.log("BL", blog);
      } catch (error) {
        console.error("Failed to fetch blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!blog) return <p>Blog not found.</p>;

  return (
    <div className="container mx-auto px-8 my-10">
      <h1 className="text-3xl font-bold mb-8">{blog.title}</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Side: Image */}
        <div className="md:w-1/2">
          <img
            src={blog.blogImage.url}
            alt="Blog"
            className="w-full h-auto max-h-[400px] object-cover rounded shadow-lg"
          />
          <div className="flex items-center mt-4 gap-4">
            <img
              src={blog.adminPhoto}
              alt="Admin"
              className="w-12 h-12 rounded-full border-2 border-yellow-400"
            />
            <div>
              <p className="font-semibold">{blog.adminName}</p>
              <p className="text-sm text-gray-500">
                {new Date(blog.createdAt).toDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: About Text */}
        <div className="md:w-1/2 flex items-start">
          <p className="text-lg leading-relaxed">{blog.about}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
