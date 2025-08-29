import React from "react";
import { Link } from "react-router-dom"; // Import Link
import "../css/Profile.css";
import pro from "../assets/img.jpg";
import {
  FaMapMarkerAlt,
  FaGlobe,
  FaEnvelope,
  FaBriefcase,
  FaInstagram,
  FaLinkedin,
  FaMailBulk,
} from "react-icons/fa";

export default function Profile() {
  return (
    <div className="profile-container">
      {/* Cover */}
      <div className="cover"></div>

      {/* Main content */}
      <div className="profile-content">
        {/* Left/Main Column */}
        <div className="main-column">
          <div className="profile-header">
            <img src={pro} alt="Profile" className="profile-pic" />
            <h2>Adil Ansari</h2>
            <p className="username">@ECE</p>
            <div className="profile-buttons">
              <button className="btn-outline">View Posts</button>
              <Link
              to="https://www.linkedin.com/in/adil-ansari35830/"
              target="_blank"
              className="btn-primary"
            >+ Follow</Link>
            </div>
          </div>

          <section className="section">
            <h3 className="about-me">About me</h3>
            <p className="parag">
              I’m a Full-Stack MERN Developer with hands-on experience in
              React.js, Node.js, Express, and Mongoose. I enjoy building
              visually appealing and functional websites with clean design and
              smooth performance.
              <p className="padd">
                This blog is one of my creations, built to share meaningful
                content with users like you
              </p>
            </p>
          </section>
        </div>

        {/* Right Sidebar */}
        <aside className="sidebar">
          <div className="side-card">
            <Link
              to="https://mail.google.com/mail/?view=cm&to=adilansari701197@gmail.com"
              target="_blank"
              className="side-card-item clickable"
            >
              <FaMailBulk className="side-card-icon" />
              <div>
                <strong>Gmail</strong>
                <p>adilansari701197@gmail.com</p>
              </div>
            </Link>
            <Link
              to="https://www.instagram.com/adiilansarii/"
              target="_blank"
              className="side-card-item clickable"
            >
              <FaInstagram className="side-card-icon"/>
              <div>
                <strong>Instagram</strong>
                <p>@adiilansarii</p>
              </div>
            </Link>
            <Link
              to="https://www.linkedin.com/in/adil-ansari35830/"
              target="_blank"
              className="side-card-item clickable"
            >
              <FaLinkedin className="side-card-icon"/>
              <div>
                <strong>LinkedIn</strong>
                <p>linkedin.com/in/adil-ansari35830</p>
              </div>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
