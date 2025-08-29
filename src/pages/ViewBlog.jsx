import React, { useState, useEffect } from "react";
import "../css/ViewBlog.css";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { CiLocationArrow1 } from "react-icons/ci";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewBlog = () => {
  const { id } = useParams(); // Get blog ID from URL
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [shares, setShares] = useState(0);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:3011/blogs/${id}`);
        const data = res.data;
        setBlogData(data);
        setLikes(data.likes || 0);
        setComments(data.comments || []);
        setShares(data.shares || 0);
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleLike = () => setLikes((prev) => prev + 1);
  const handleShare = () => setShares((prev) => prev + 1);

  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    setComments([...comments, { name: "You", text: newComment }]);
    setNewComment("");
  };

  if (loading) return <p>Loading...</p>;
  if (!blogData) return <p>Blog not found</p>;

  return (
    <div className="viewblog-container">
      {/* Blog Card */}
      <div className="view-blog-card">
        <div className="view-blog-header">
          <div className="avatar-placeholder">
          {blogData.user?.fullName?.charAt(0).toUpperCase() || "U"}
        </div>
            
          <div>
            <h4 className="author-name">{blogData.user.fullName}</h4>
            <p className="branch">{blogData.user?.branch || "Unknown branch"}</p>
          </div>
        </div>
          <p className="blog-date">
              {new Date(blogData.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
        <h2 className="blog-title">{blogData.title}</h2>
        <p className="blog-category">
          {blogData.company} | {blogData.category}
        </p>
        <p className="blog-content">{blogData.content}</p>

        {/* <div className="status">
          <span onClick={handleLike}>
            <AiOutlineLike /> {likes}
          </span>
          <span onClick={() => setShowCommentBox((prev) => !prev)}>
            <FaRegComment /> {comments.length}
          </span>
          <span onClick={handleShare}>
            <CiLocationArrow1 /> {shares}
          </span>
        </div> */}
      </div>

      {/* Comment Section OUTSIDE the card */}
      {showCommentBox && (
        <div className="comment-section">
          {/* Add Comment */}
          <div className="add-comment">
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={handleAddComment}>Add</button>
          </div>

          {/* Previous Comments */}
          <div className="previous-comments">
            {comments.map((c, index) => (
              <div className="comment" key={index}>
                <div className="comment-content">
                  <p>
                    <strong>{c.name}</strong> {c.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewBlog;
