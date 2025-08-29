import React from "react";
import "../css/Home.css";
import { FaRegNewspaper } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { GrResources } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


export default function Home() {
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


  return (
    <div className="home-container">
      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <p className="tagline">
            From Preparation to Celebration - Start Today
          </p>
          <h1 className="hero-title">
            Real Stories. Real Questions. Real Success.
          </h1>
          <p className="hero-desc">
            From classrooms to coding interviews, we bring you the raw,
            unfiltered experiences of students chasing their tech dreams — all
            shared by your very own college peers. Learn from real challenges,
            real questions, and real victories. Join a community where students
            lift each other higher
          </p>
        </div>

        <aside className="hero-right">
          <div className="explore-box">
            <h3 className="explore-title">Access 1000+ Tech Insights</h3>
            <p className="explore-sub">
              Get inspired and informed with our extensive collection of
              cutting-edge tech articles.
            </p>
            {user?(<Link to="/blogs" className="explore-btn">
              View
            </Link>):(<Link to="/signup" className="explore-btn">
              Sign Up
            </Link>)}
          </div>
        </aside>
      </section>

      {/* FEATURES */}
      {user?(<section className="features">
        <Link to="/blogs" className="contri">
          <div className="feature">
            <div className="feature-icon">
              <PiStudentBold />
            </div>
            <div className="feature-body">
              <h4>Students Contributions</h4>
              <p className="muted">Trusted Insights</p>
              <small>Written by Students from Your Own Campus</small>
            </div>
          </div>
        </Link>

        <Link
          to="https://news.google.com/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGRqTVhZU0FtVnVHZ0pWVXlnQVAB?hl=en-US&gl=US&ceid=US%3Aen"
          className="contri"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="feature">
            <div className="feature-icon">
              <FaRegNewspaper />
            </div>
            <div className="feature-body">
              <h4>
                <h4>Tech Updates</h4>
              </h4>
              <p className="muted">Stay Connected</p>
              <small>New Opportunities Added Every Day</small>
            </div>
          </div>
        </Link>

        <Link
          to="https://www.w3schools.com/"
          className="contri"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="feature">
            <div className="feature-icon">
              <GrResources />
            </div>
            <div className="feature-body">
              <h4>
                <h4>Top-Notch Resources</h4>
              </h4>
              <p className="muted">Built to Power Your Prep</p>
              <small>rusted by Students, Proven to Work</small>
            </div>
          </div>
        </Link>
      </section>):(<section className="features">
        <Link to="/login" className="contri">
          <div className="feature">
            <div className="feature-icon">
              <PiStudentBold />
            </div>
            <div className="feature-body">
              <h4>Students Contributions</h4>
              <p className="muted">Trusted Insights</p>
              <small>Written by Students from Your Own Campus</small>
            </div>
          </div>
        </Link>

        <Link
          to="/login"
          className="contri"
          rel="noopener noreferrer"
        >
          <div className="feature">
            <div className="feature-icon">
              <FaRegNewspaper />
            </div>
            <div className="feature-body">
              <h4>
                <h4>Tech Updates</h4>
              </h4>
              <p className="muted">Stay Connected</p>
              <small>New Opportunities Added Every Day</small>
            </div>
          </div>
        </Link>

        <Link
          to="/login"
          className="contri"
          rel="noopener noreferrer"
        >
          <div className="feature">
            <div className="feature-icon">
              <GrResources />
            </div>
            <div className="feature-body">
              <h4>
                <h4>Top-Notch Resources</h4>
              </h4>
              <p className="muted">Built to Power Your Prep</p>
              <small>rusted by Students, Proven to Work</small>
            </div>
          </div>
        </Link>
      </section>)
      }

    
    </div>
  );
}
