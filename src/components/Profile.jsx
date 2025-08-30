import React from "react";
import "../css/Profile.css";
import pro from "../assets/img.jpg";
import { FaMailBulk, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Profile() {
  return (
    <div className="profile-container">
      <div className="cover"></div>

      <div className="profile-content">
        <div className="main-column">
          <div className="profile-header">
            <img src={pro} alt="Profile" className="profile-pic" />
            <h2>Adil Ansari</h2>
            <p className="username">@ECE</p>
            <div className="profile-buttons">
              <button className="btn-outline">View Posts</button>
              <a
                href="https://www.linkedin.com/in/adil-ansari35830/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >+ Follow</a>
            </div>
          </div>

          <section className="section">
            <h3 className="about-me">About me</h3>
            <p className="parag">
              I’m a Full-Stack MERN Developer with hands-on experience in
              React.js, Node.js, Express, and Mongoose. I enjoy building
              visually appealing and functional websites with clean design and
              smooth performance.
            </p>
            <p className="padd">
              This blog is one of my creations, built to share meaningful
              content with users like you
            </p>
          </section>
        </div>

        <aside className="sidebar">
          <div className="side-card">
            <a
              href="https://mail.google.com/mail/?view=cm&to=adilansari701197@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="side-card-item clickable"
            >
              <FaMailBulk className="side-card-icon" />
              <div>
                <strong>Gmail</strong>
                <p>adilansari701197@gmail.com</p>
              </div>
            </a>

            <a
              href="https://www.instagram.com/adiilansarii/"
              target="_blank"
              rel="noopener noreferrer"
              className="side-card-item clickable"
            >
              <FaInstagram className="side-card-icon"/>
              <div>
                <strong>Instagram</strong>
                <p>@adiilansarii</p>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/adil-ansari35830/"
              target="_blank"
              rel="noopener noreferrer"
              className="side-card-item clickable"
            >
              <FaLinkedin className="side-card-icon"/>
              <div>
                <strong>LinkedIn</strong>
                <p>linkedin.com/in/adil-ansari35830</p>
              </div>
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
