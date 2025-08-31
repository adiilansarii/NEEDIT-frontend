import React, { useState, useEffect } from "react";
import "../css/Allblogs.css";
import BlogCard from "../components/BlogCard";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../url";

const categories = ["All", "Tech", "Non-Tech", "Core"];

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All"); // ✅ category state

  // Fetch blogs from backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${baseURL}/blogs`, {
          withCredentials: true,
        });
        setBlogs(res.data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        alert("Failed to fetch blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return <div className="blog-container">Loading blogs...</div>;
  }

  // ✅ Filter blogs based on selected category
  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter((blog) => blog.category === selectedCategory);

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
          <button
            key={index}
            className={`category-btn ${
              selectedCategory === cat ? "active" : ""
            }`} // ✅ highlight selected
            onClick={() => setSelectedCategory(cat)} // ✅ update state
          >
            {cat}
          </button>
        ))}
        <Link to="/blogs/post" className="create-btn">
          Create+
        </Link>
      </div>

      {/* Blog List */}
      <div className="blog-list">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog, index) => (
            <BlogCard key={index} blog={blog} />
          ))
        ) : (
          <p>No blogs found for {selectedCategory}.</p>
        )}
      </div>
    </div>
  );
}
