import React, { useState, useEffect } from "react";
import "../css/Allblogs.css";
import BlogCard from "../components/BlogCard";
import { Link } from "react-router-dom";
import axios from "axios";

const categories = ["All", "Tech", "Non-Tech", "Core"];

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch blogs from backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("https://needit-backend.onrender.com/blogs");
        setBlogs(res.data); // Save blogs in state
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return <div className="blog-container">Loading blogs...</div>;
  }

  return (
    <div className="blog-container">
      {/* Header */}
      <div className="blog-header-with-btn">
        <div className="blog-header">
          <span className="blog-tag">All You Need to Know</span>
          <h1>NEED IT Presents the Ultimate Interview Blog Collection</h1>
        </div>
      </div>

      {/* Categories */}
      <div className="categories">
        {categories.map((cat, index) => (
          <button key={index} className="category-btn">
            {cat}
          </button>
        ))}
        <Link to="/blogs/post" className="create-btn">
          Create+
        </Link>
      </div>

      {/* Blog List */}
      <div className="blog-list">
        {blogs.length > 0 ? (
          blogs.map((blog, index) => (
            <BlogCard key={index} blog={blog} />
          ))
        ) : (
          <p>No blogs found.</p>
        )}
      </div>
    </div>
  );
}
