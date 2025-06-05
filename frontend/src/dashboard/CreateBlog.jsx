import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    about: "",
  });
  const [blogImage, setBlogImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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

    if (!blogImage) {
      return setMessage("Blog image is required.");
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("about", formData.about);
    data.append("blogImage", blogImage);

    try {
      setLoading(true);
      setMessage("");
      const response = await axios.post(
        "http://localhost:3000/api/blogs/create-blog",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      setMessage(response.data.message || "Blog created successfully!");
      setFormData({ title: "", category: "", about: "" });
      setBlogImage(null);
      setPreviewImage(null);
      toast.success(response.data.message);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong. Try again."
      );
      toast.error(response.data.message);
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
      <h2 className="text-2xl font-semibold text-center mb-4">
        Create New Blog
      </h2>

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
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
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
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
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
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Blog Image:
        </label>
        <input
          type="file"
          name="blogImage"
          onChange={handleImageChange}
          accept="image/*"
          required
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
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
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        {loading ? "Creating..." : "Create Blog"}
      </button>

      {message && (
        <p className="mt-4 text-center text-sm text-green-600">{message}</p>
      )}
    </form>
  );
};

export default CreateBlog;
