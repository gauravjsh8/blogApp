import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import { Routes, Route, useLocation } from "react-router-dom";
import Blogs from "./pages/Blogs";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Creators from "./pages/Creators";
import UpdateBlog from "./dashboard/UpdateBlog";

const App = () => {
  const location = useLocation();
  const hideNavbarAndFooter = ["/dashboard", "/register", "/login"].includes(
    location.pathname
  );
  return (
    <div>
      {!hideNavbarAndFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/blogs" element={<Blogs />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/creators" element={<Creators />}></Route>
        <Route path="/update-blog/:id" element={<UpdateBlog />}></Route>
      </Routes>
      {!hideNavbarAndFooter && <Footer />}
    </div>
  );
};

export default App;
