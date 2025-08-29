import React from "react";
import "../css/Footer.css";
import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <a href="#">Terms & Conditions</a>
        <span className="divider">|</span>
        <a href="#">Privacy Policy</a>
      </div>

      <div className="footer-center">
        <a href="#" aria-label="Twitter">
          <FaTwitter />
        </a>
        <a href="#" aria-label="Instagram">
          <FaInstagram />
        </a>
        <a href="#" aria-label="LinkedIn">
          <FaLinkedin />
        </a>
      </div>

      <div className="footer-right">
        <p>© 2025 NEED IT. All rights reserved.</p>
      </div>
    </footer>
  );
}
