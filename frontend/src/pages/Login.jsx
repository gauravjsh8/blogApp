import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login form submitted");

    const payload = { email, password, role };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      toast.success(data.message);

      setEmail("");
      setPassword("");
      setRole("");
      navigate("home");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Login failed. Please check your input.";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-xl">
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Blog<span className="text-red-500">Gaurav</span>
            </h2>
            <p className="text-sm text-gray-500 mt-1">Login to your account</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none  focus:ring-2 focus:ring-red-400"
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

          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition"
          >
            Login
          </button>

          <p className="text-center text-sm text-gray-600">
            Not registered?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
