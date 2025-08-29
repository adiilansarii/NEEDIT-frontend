import React, { useState, useRef, useEffect } from "react";
import "../css/navbar.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

   const [user, setUser] = useState(null); // store logged-in user
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      fetch("https://needit-backend.onrender.com/", {
        credentials: "include", // include cookies
      })
        .then((res) => {
          if (!res.ok) throw new Error("Not logged in");
          return res.json();
        })
        .then((data) => setUser(data.user))
        .catch(() => setUser(null))
        .finally(() => setLoading(false));
    }, []);
  
    if (loading) return <p>Loading...</p>;
      
  const handleLogout = async () => {
  try {
    await fetch("https://needit-backend.onrender.com/logout", {
      method: "GET",
      credentials: "include", // include cookies so the backend can clear them
    });
    setUser(null); // remove user from state
    window.location.href = "/"; // redirect to homepage
  } catch (err) {
    console.error("Logout failed", err);
  }
};


  return (
    <nav className="navbar" ref={menuRef}>
      {/* Left Logo */}
      <div className="navbar-left">
        <Link to="/" className="navbar-logo" onClick={handleLinkClick}>
          <img src={logo} alt="Logo" className="logo-img" />
          <span className="logo-text">NEED IT</span>
        </Link>
      </div>

      {/* Right Section */}
      <div className="navbar-right">
        {/* Right buttons always on desktop */}
        <div className="right-buttons desktop-only">
          <Link to="/contact" className="contact-btn" onClick={handleLinkClick}>
            Contact Me
          </Link>
          {user?(<Link to="/" className="login-btn" onClick={handleLogout}>
            Logout
          </Link>):(<Link to="/login" className="login-btn" onClick={handleLinkClick}>
            Login
          </Link>)}
        </div>

        {/* Hamburger for mobile */}
        <div className="hamburger mobile-only" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
      </div>

      {/* Mobile full-width dropdown */}
      {menuOpen && (
        <div className="menu-dropdown mobile-only full-width-menu">
          <Link to="/contact" className="contact-btn" onClick={handleLinkClick}>
            Contact Me
          </Link>
          {user?(<Link to="/" className="login-btn" onClick={handleLogout}>
            Logout
          </Link>):(<Link to="/login" className="login-btn" onClick={handleLinkClick}>
            Login
          </Link>)}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
