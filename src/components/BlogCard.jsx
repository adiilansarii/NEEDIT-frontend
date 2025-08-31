import React from "react";
import "../css/BlogCard.css";
import { Link, useNavigate } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { baseURL } from "../url";

const BlogCard = ({ blog, loggedInUserId }) => {
  const navigate = useNavigate();

  const getTimeAgo = (createdAt) => {
    if (!createdAt) return "Unknown";
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

  const handleEdit = () => {
    navigate(`/edit/${blog._id}`);
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`${baseURL}/blogs/${blog._id}`, {
        withCredentials: true,
      });
      alert("Blog deleted successfully!");
      navigate("/blogs"); // Redirect after delete
    } catch (err) {
      console.error("Failed to delete blog:", err);
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
        <h2 className="title">{blog.title || "Untitled"}</h2>
        <p className="type">
          {blog.company || "Unknown"} <span>|</span> {blog.category || "N/A"}
        </p>
        <p className="desc">
          {blog.content
            ? blog.content.split(" ").slice(0, 15).join(" ") + "..."
            : "No content"}
        </p>
      </div>

      <div className="blog-right">
        {/* View button for all */}
        <Link to={`/blogs/${blog._id || ""}`} className="view-btn">
          View
        </Link>

        {/* Edit/Delete only for owner */}
        {loggedInUserId && blog.user?._id === loggedInUserId && (
          <div className="owner-actions">
            <button className="icon-btn edit-btn" onClick={handleEdit}>
              <CiEdit size={20} />
            </button>
            <button className="icon-btn delete-btn" onClick={handleDelete}>
              <MdDelete size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
