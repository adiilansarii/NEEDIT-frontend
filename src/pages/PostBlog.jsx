import React, { useState } from "react";
import "../css/PostBlog.css";
import { useNavigate } from "react-router-dom";


export default function PostBlog() {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company: "",
    category: "Tech",
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!formData.title || !formData.company || !formData.category || !formData.content) {
    alert("All fields are required");
    return;
  }

  try {
    const res = await fetch("https://needit-backend.onrender.com/blogs/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include", // include cookie for logged-in user
    });

    if (res.ok) {
      const data = await res.json();
      navigate(`/blogs/${data._id}`);
    } else {
      const errData = await res.json();
      alert(errData.message || "Failed to post");
    }
  } catch (err) {
    console.error("Error during post:", err);
    alert("Something went wrong. Please try again.");
  }

  setFormData({
    company: "",
    category: "Tech",
    title: "",
    content: "",
  });
};


  return (
    <div className="postblog-container">
      <form className="postblog-form" onSubmit={handleSubmit}>
        <h2 className="postblog-title">Interview Experience</h2>

        {/* Blog Title */}
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        {/* Company Name */}
        <label htmlFor="company">Company Name</label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          required
        />

        {/* Category Dropdown */}
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Tech">Tech</option>
          <option value="Non Tech">Non Tech</option>
          <option value="Core">Core</option>
          <option value="Others">Others</option>
        </select>

        {/* Blog Content */}
        <label htmlFor="content">Content</label>
        
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
        ></textarea>

        {/* Submit Button */}
        <button type="submit" className="post-btn">
          Post
        </button>
      </form>
    </div>
  );
}
