import React from "react";
import "../css/BlogCard.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../url";

const BlogCard = ({ blog, loggedInUserId }) => {
  const navigate = useNavigate();

  const getTimeAgo = (createdAt) => {
    const now = new Date();
    const diffMs = now - new Date(createdAt);
    const diffSeconds = Math.floor(diffMs / 1000);
    if (diffSeconds < 60) return `${diffSeconds} seconds ago`;
    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} hours ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} days ago`;
  };

  const isOwner = blog.user?._id === loggedInUserId;

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`${baseURL}/blogs/${blog._id}`, {
        withCredentials: true,
      });
      alert("Blog deleted successfully!");
      navigate(0); // reload page
    } catch (err) {
      console.error(err);
      alert("Failed to delete blog.");
    }
  };

  return (
    <div className="blog-card">
      <div className="blog-left">
        <div className="avatar-placeholder">
          {blog.user?.fullName?.charAt(0).toUpperCase() || "U"}
        </div>
        <div>
          <p className="author">{blog.user?.fullName || "Unknown"}</p>
          <p className="branch">{blog.user?.branch || "Unknown branch"}</p>
        </div>
      </div>

      <div className="blog-middle">
        <p className="date">{getTimeAgo(blog.createdAt)}</p>
        <h2 className="title">{blog.title}</h2>
        <p className="type">
          {blog.company} <span>|</span> {blog.category}
        </p>
        <p className="desc">{blog.content.split(" ").slice(0, 15).join(" ")}...</p>
      </div>

      <div className="blog-right">
        <Link to={`/blogs/${blog._id}`} className="view-btn">
          View
        </Link>

        {isOwner && (
          <>
            <button className="edit-btn" onClick={() => navigate(`/edit/${blog._id}`)}>
              Edit
            </button>
            <button className="delete-btn" onClick={handleDelete}>
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
