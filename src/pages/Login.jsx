import React, { useState } from "react";
import "../css/Login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../url";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // prevent page reload

    if (!email || !password) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await axios.post(
        `${baseURL}/login`, // live backend URL
        { email, password },
        { withCredentials: true } // include cookies
      );

      if (res.status === 200) {
        window.location.href = "/"; // redirect to home
      }
    } catch (err) {
      console.error("Login error:", err);
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
