import React from "react";
import "./css/App.css";
import { Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Profile from "./components/Profile";

// Pages
import Home from "./pages/Home";
import Allblogs from "./pages/Allblogs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PostBlog from "./pages/PostBlog";
import ViewBlog from "./pages/ViewBlog";

function App() {
  return (
    <div className="page-container">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Allblogs />} />
        <Route path="/blogs/post" element={<PostBlog />} />
        <Route path="/blogs/:id" element={<ViewBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Profile />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
