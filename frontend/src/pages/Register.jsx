import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [education, setEducation] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");

  const navigate = useNavigate();

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPhotoPreview(reader.result);
      setPhoto(file);
    };
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("education", education);
    formData.append("photo", photo);
    formData.append("role", role);
    formData.append("phone", phone);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/register",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success(response.data.message);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setEducation("");
      setRole("");
      setPhoto(null);
      setPhotoPreview("");
      navigate("/login");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Registration failed. Please check your input.";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen mx-auto flex items-center justify-center  bg-gray-50 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg mt-6">
        <form onSubmit={handleRegister} className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">
              Blog<span className="text-red-500">Gaurav</span>
            </h2>
            <p className="mt-2 text-gray-600 text-lg font-semibold">Register</p>
          </div>

          <input
            type="text"
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="tel"
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            type="password"
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Select Role
            </label>
            <select
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Select Education
            </label>
            <select
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
            >
              <option value="" disabled>
                Select Education
              </option>
              <option value="bca">BCA</option>
              <option value="mca">MCA</option>
              <option value="mba">MBA</option>
              <option value="bba">BBA</option>
            </select>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 border rounded overflow-hidden bg-gray-100 flex items-center justify-center">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-gray-400 text-xs">No Photo</span>
              )}
            </div>
            <div className="flex-grow">
              <label
                htmlFor="photo-upload"
                className="block mb-1 text-sm font-medium text-gray-700 cursor-pointer"
              >
                Upload Photo
              </label>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                className="w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
                  file:rounded file:border-0 file:text-sm file:font-semibold
                  file:bg-red-500 file:text-white hover:file:bg-red-600
                  focus:outline-none focus:ring-2 focus:ring-red-400"
                onChange={changePhotoHandler}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white font-semibold py-2 rounded-full hover:bg-red-600 transition text-sm"
          >
            Register
          </button>

          <p className="text-center text-sm text-gray-600">
            Already Registered?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
