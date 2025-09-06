import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import axios from "axios";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Allblogs from "./pages/Allblogs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PostBlog from "./pages/PostBlog";
import ViewBlog from "./pages/ViewBlog";
import EditBlog from "./pages/EditBlog";
import AdminDashboard from "./pages/AdminDashboard";

import { baseURL } from "./url";

const NotFound = () => (
  <h2 style={{ color: "#eee", textAlign: "center", padding: "2rem" }}>
    Page Not Found
  </h2>
);

function App() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(baseURL, { withCredentials: true });
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUser();
  }, []);

  if (loadingUser) return <div style={{ color: "#eee", textAlign: "center", marginTop: "3rem" }}>Loading...</div>;

  // Redirect admin user to admin dashboard
  if (user?.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/blogs" element={<Allblogs />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />

        <Route path="/post" element={user ? <PostBlog /> : <Navigate to="/login" />} />
        <Route path="/blogs/:id" element={<ViewBlog />} />
        <Route path="/edit/:id" element={user ? <EditBlog /> : <Navigate to="/login" />} />

        <Route path="/admin/dashboard" element={user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
