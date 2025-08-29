import React, { useState, useRef, useEffect } from "react";
import "../css/navbar.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Check if user is logged in
  useEffect(() => {
    axios
      .get("https://needit-backend.onrender.com/me", { withCredentials: true })
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  // Logout
  const handleLogout = async () => {
    try {
      await axios.get("https://needit-backend.onrender.com/logout", {
        withCredentials: true,
      });
      setUser(null);
      window.location.href = "/";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (loading) return null; // don’t block whole navbar with "Loading..."

  return (
    <nav className="navbar" ref={menuRef}>
      {/* Left Logo */}
      <div className="navbar-left">
        <Link to="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
          <img src={logo} alt="Logo" className="logo-img" />
          <span className="logo-text">NEED IT</span>
        </Link>
      </div>

      {/* Right Section */}
      <div className="navbar-right">
        {/* Desktop buttons */}
        <div className="right-buttons desktop-only">
          <Link to="/contact" className="contact-btn" onClick={() => setMenuOpen(false)}>
            Contact Me
          </Link>
          {user ? (
            <button className="login-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/login" className="login-btn" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div
          className="hamburger mobile-only"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="menu-dropdown mobile-only full-width-menu">
          <Link to="/contact" className="contact-btn" onClick={() => setMenuOpen(false)}>
            Contact Me
          </Link>
          {user ? (
            <button className="login-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/login" className="login-btn" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
