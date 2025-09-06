import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Home.css";
import { FaRegNewspaper } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { GrResources } from "react-icons/gr";
import { Link } from "react-router-dom";
import { Loader } from "../components/Loader";
import { baseURL } from "../url";

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(baseURL, { withCredentials: true })
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-left">
          <div className="tagline">From Preparation to Celebration - Start Today</div>
          <h1 className="hero-title">
            From classrooms to coding interviews,
            <br />
            we bring you the raw, unfiltered experiences of students chasing their tech dreams — shared by your very own college peers.
          </h1>
          <p className="hero-desc">
            Trusted Insights<br />
            Written by Students from Your Own Campus
          </p>
          <p className="hero-desc">
            Stay Connected<br />
            New Opportunities Added Every Day
          </p>
          <p className="hero-desc">
            Built to Power Your Prep with NEED-BOT<br />
            Trusted by Students, Proven to Work
          </p>
        </div>
        <div className="hero-right">
          {/* You can keep or customize your hero-right content */}
        </div>
      </section>
    </div>
  );
}
