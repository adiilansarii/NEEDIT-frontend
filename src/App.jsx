import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import AllBlogs from "./pages/Allblogs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PostBlog from "./pages/PostBlog";
import ViewBlog from "./pages/ViewBlog";
import Profile from "./components/Profile";

import "./css/App.css";

function App() {
  return (
    <div className="page-container">
      <Navbar />

      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<AllBlogs />} />
          <Route path="/blogs/post" element={<PostBlog />} />
          <Route path="/blogs/:id" element={<ViewBlog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Profile />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
