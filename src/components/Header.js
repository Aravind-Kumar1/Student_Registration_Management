import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/header.css";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation(); // Get current path

  return (
    <header className="header">
      <div className="container">
        {/* Logo (Now Clickable) */}
        <div className="logo">
          <Link to="/" className="logo-link">
            <h2>Student Registration Hub</h2>
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className={`nav-menu ${isMobileMenuOpen ? "open" : ""}`}>
          <ul>
            <li>
              <Link to="/" className={location.pathname === "/" ? "active" : ""}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/course-types" className={location.pathname === "/course-types" ? "active" : ""}>
                Course Types
              </Link>
            </li>
            <li>
              <Link to="/courses" className={location.pathname === "/courses" ? "active" : ""}>
                Courses
              </Link>
            </li>
            <li>
              <Link to="/course-offerings" className={location.pathname === "/course-offerings" ? "active" : ""}>
                Course Offerings
              </Link>
            </li>
            <li>
              <Link to="/register" className={location.pathname === "/register" ? "active" : ""}>
                Student Registration
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Icon */}
        <div className="menu-icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          ☰
        </div>
      </div>
    </header>
  );
};

export default Header;
