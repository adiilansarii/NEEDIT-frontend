import React, { useState, useEffect } from "react";
import "../css/ViewBlog.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../url";

const ViewBlog = () => {
  const { id } = useParams();
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${baseURL}/blogs/${id}`, {
          withCredentials: true,
        });
        setBlogData(res.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
        alert("Failed to fetch blog. Try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!blogData) return <p>Blog not found</p>;

  return (
    <div className="viewblog-container">
      <div className="view-blog-card">
        <div className="view-blog-header">
          <div className="avatar-placeholder">
            {blogData.user?.fullName?.charAt(0).toUpperCase() || "U"}
          </div>

          <div className="author-info">
            <h4 className="author-name">{blogData.user?.fullName || "Unknown"}</h4>
            <p className="branch">{blogData.user?.branch || "Unknown branch"}</p>
          </div>
        </div>

        <p className="blog-date">
          {blogData.createdAt
            ? new Date(blogData.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "Unknown date"}
        </p>

        <h2 className="blog-title">{blogData.title}</h2>
        <p className="blog-category">
          {blogData.company} | {blogData.category}
        </p>
        <p className="blog-content">{blogData.content}</p>
      </div>
    </div>
  );
};

export default ViewBlog;
