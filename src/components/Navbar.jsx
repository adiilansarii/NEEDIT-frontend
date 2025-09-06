import React, { useState, useRef, useEffect } from "react";
import "../css/navbar.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../url";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${baseURL}`, { withCredentials: true });
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const handleLinkClick = () => setMenuOpen(false);

  const handleLogout = async () => {
    try {
      await axios.post(`${baseURL}/logout`, {}, { withCredentials: true });
      setUser(null);
      window.location.href = "/";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo" onClick={handleLinkClick}>
          <img src={logo} alt="Logo" className="logo-img" />
          <span className="logo-text">NEED IT</span>
        </Link>
      </div>

      <div className="right-buttons">
        {/* Show Admin Dashboard if user is admin */}
        {user?.role === "admin" && (
          <Link to="/admin/dashboard" className="login-btn" onClick={handleLinkClick}>
            Admin Dashboard
          </Link>
        )}

        {/* Show Contact Me if NOT admin */}
        {user?.role !== "admin" && (
          <Link to="/contact" className="contact-btn" onClick={handleLinkClick}>
            Contact Me
          </Link>
        )}

        {user ? (
          <button onClick={handleLogout} className="login-btn">
            Logout
          </button>
        ) : (
          <Link to="/login" className="login-btn" onClick={handleLinkClick}>
            Login
          </Link>
        )}
      </div>

      {/* Mobile hamburger and menu omitted but can be added as your original */}
    </nav>
  );
};

export default Navbar;
