import React from "react";
import "../css/Footer.css";
import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear(); // dynamic year

  return (
    <footer className="footer">
      <div className="footer-left">
        <a href="#">Terms & Conditions</a>
        <span className="divider">|</span>
        <a href="#">Privacy Policy</a>
      </div>

      <div className="footer-center">
        <a href="https://x.com/adiilansariii"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter">
          <FaTwitter />
        </a>
        <a href="https://www.instagram.com/adiilansarii/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <FaInstagram />
        </a>
        <a href="https://www.linkedin.com/in/adil-ansari35830/" target="_blank"
          rel="noopener noreferrer" aria-label="LinkedIn">
          <FaLinkedin />
        </a>
      </div>

      <div className="footer-right">
        <p>© {year} NEED IT. All rights reserved.</p>
      </div>
    </footer>
  );
}
