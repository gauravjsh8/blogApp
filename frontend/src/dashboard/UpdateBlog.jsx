import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    about: "",
  });
  const [blogImage, setBlogImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch existing blog
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/blogs/single-blog/${id}`,
          {
            withCredentials: true,
          }
        );

        const blog = res.data.blog;
        setFormData({
          title: blog.title,
          category: blog.category,
          about: blog.about,
        });
        setPreviewImage(blog.blogImage?.url);
      } catch (error) {
        toast.error("Failed to load blog");
      }
    };

    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log("FILES", file);
    setBlogImage(file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("about", formData.about);

    // Only append image if a new one is selected
    if (blogImage) {
      data.append("blogImage", blogImage);
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `http://localhost:3000/api/blogs/update/${id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      toast.success(res.data.message || "Blog updated!");
      navigate("/my-blogs"); // redirect to MyBlogs
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-2xl font-semibold text-center mb-4">Update Blog</h2>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Title:
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Category:
        </label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          About:
        </label>
        <textarea
          name="about"
          value={formData.about}
          onChange={handleChange}
          minLength={20}
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Change Image:
        </label>
        <input
          type="file"
          name="blogImage"
          onChange={handleImageChange}
          accept="image/*"
          className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:bg-blue-50"
        />
        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            className="w-48 h-auto rounded border mt-2"
          />
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
      >
        {loading ? "Updating..." : "Update Blog"}
      </button>

      {message && <p className="mt-4 text-center text-green-600">{message}</p>}
    </form>
  );
};

export default UpdateBlog;
