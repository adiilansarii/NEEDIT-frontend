import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Login.css";

const baseURL = "https://needit-backend.onrender.com"; // make sure no trailing slash

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await axios.post(
        `${baseURL}/login`,
        { email, password },
        { withCredentials: true } // important for cookies
      );
      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify(res.data.user)); // store logged-in user
        window.location.href = "/";
      }
    } catch (err) {
      console.error("Login error:", err.response || err);
      const message = err.response?.data?.message || "Login failed";
      alert(message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="login-title">Login</h2>

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="login-submit-btn">
          Login
        </button>

        <div className="new-user">
          <p>New user?</p>
          <Link to="/signup" className="signup-btn">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
