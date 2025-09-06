import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../url";
import "../css/AdminDashboard.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsersWithBlogs = async () => {
    try {
      const res = await axios.get(`${baseURL}/admin/dashboard`, {
        withCredentials: true,
      });
      setUsers(res.data);
    } catch {
      alert("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersWithBlogs();
  }, []);

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure? This will delete the user and their blogs.")) {
      try {
        await axios.delete(`${baseURL}/admin/user/${userId}`, { withCredentials: true });
        alert("User and their blogs deleted.");
        fetchUsersWithBlogs();
      } catch {
        alert("Failed to delete user.");
      }
    }
  };

  if (loading) return <div className="loader">Loading...</div>;
  if (users.length === 0) return <div className="no-users">No users available.</div>;

  return (
    <div className="admin-dashboard-container">
      <h1>Admin Dashboard - Users and Blogs</h1>
      {users.map((user) => (
        <div key={user._id} className="user-card">
          <div className="user-header">
            <h2>{user.fullName}</h2>
            <button className="delete-user-btn" onClick={() => handleDeleteUser(user._id)}>Delete User</button>
          </div>
          <p>Email: {user.email}</p>
          <p>Branch: {user.branch}</p>
          <div className="blogs-list">
            <h3>User's Blogs ({user.blogs.length}):</h3>
            {user.blogs.length === 0 ? (
              <p>No blogs by this user.</p>
            ) : (
              <ul>
                {user.blogs.map((blog) => (
                  <li key={blog._id}>{blog.title} - {new Date(blog.createdAt).toLocaleDateString()}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
