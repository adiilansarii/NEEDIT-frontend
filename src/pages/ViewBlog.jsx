import React, { useState, useEffect } from "react";
import "../css/ViewBlog.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../url";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FiMoreVertical } from "react-icons/fi";

const ViewBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`${baseURL}/blogs/${id}`, { withCredentials: true });
      alert("Blog deleted successfully!");
      navigate("/"); 
    } catch (err) {
      console.error("Error deleting blog:", err);
      alert("Failed to delete blog.");
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

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

          {/* Desktop buttons */}
          <div className="desktop-actions">
            <button className="icon-btn" onClick={handleEdit}>
              <CiEdit size={20} />
            </button>
            <button className="icon-btn delete" onClick={handleDelete}>
              <MdDelete size={20} />
            </button>
          </div>

          {/* Mobile actions (3-dot menu) */}
          <div className="mobile-actions">
            <button
              className="icon-btn"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <FiMoreVertical size={20} />
            </button>
            {menuOpen && (
              <div className="mobile-menu">
                <button onClick={handleEdit}>
                  <CiEdit size={18} /> Edit
                </button>
                <button onClick={handleDelete}>
                  <MdDelete size={18} /> Delete
                </button>
              </div>
            )}
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
