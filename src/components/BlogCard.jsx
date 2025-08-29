import React from "react";
import "../css/BlogCard.css"; // This will now style same as Allblogs.css card styles
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { CiLocationArrow1 } from "react-icons/ci";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <div className="blog-card">
      {/* Left section */}
      <div className="blog-left">
        <div className="avatar-placeholder">
          {blog.user?.fullName?.charAt(0).toUpperCase() || "U"}
        </div>
        <div>
          <p className="author">{blog.user?.fullName || "Unknown"}</p>
          <p className="branch">{blog.user?.branch || "Unknown branch"}</p>
        </div>
      </div>

      {/* Middle section */}
      <div className="blog-middle">
        <p className="date">
          {(() => {
            const now = new Date();
            const created = new Date(blog.createdAt);
            const diffMs = now - created; // difference in milliseconds
            const diffSeconds = Math.floor(diffMs / 1000);
            const diffMinutes = Math.floor(diffSeconds / 60);
            const diffHours = Math.floor(diffMinutes / 60);
            const diffDays = Math.floor(diffHours / 24);

            if (diffSeconds < 60) return `${diffSeconds} seconds ago`;
            if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
            if (diffHours < 24) return `${diffHours} hours ago`;
            return `${diffDays} days ago`;
          })()}
        </p>
        <h2 className="title">{blog.title}</h2>
        <p className="type">
          {blog.company} <span>|</span> {blog.category}
        </p>
        <p className="desc">
          {blog.content.split(" ").slice(0, 15).join(" ")}...
        </p>
      </div>

      {/* Right section */}
      <div className="blog-right">
        <Link to={`/blogs/${blog._id}`} className="view-btn">
          View
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
