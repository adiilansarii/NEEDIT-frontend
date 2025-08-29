import React, { useState } from "react";
import "../css/Login.css";
import { Link } from "react-router-dom";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault(); // stop page reload on submit

  if (!email || !password) {
    alert("All fields are required");
    return;
  }

  try {
    const res = await fetch("https://needit-backend.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include"
    });

    if (res.ok) {
      window.location.href = "/";
    } else {
      const errData = await res.json();
      alert(errData.message || "Login failed");
    }
  } catch (err) {
    console.error("Error during login:", err);
    alert("Something went wrong. Please try again.");
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
