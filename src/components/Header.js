import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/header.css";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation(); 

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest(".nav-menu") && !event.target.closest(".menu-icon")) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/" className="logo-link">
            <h2>Student Registration Hub</h2>
          </Link>
        </div>

        <nav className={`nav-menu ${isMobileMenuOpen ? "open" : ""}`}>
          <ul>
            <li>
              <Link to="/" className={location.pathname === "/" ? "active" : ""} 
                onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/course-types" className={location.pathname === "/course-types" ? "active" : ""} 
                onClick={() => setIsMobileMenuOpen(false)}>
                Course Types
              </Link>
            </li>
            <li>
              <Link to="/courses" className={location.pathname === "/courses" ? "active" : ""} 
                onClick={() => setIsMobileMenuOpen(false)}>
                Courses
              </Link>
            </li>
            <li>
              <Link to="/course-offerings" className={location.pathname === "/course-offerings" ? "active" : ""} 
                onClick={() => setIsMobileMenuOpen(false)}>
                Course Offerings
              </Link>
            </li>
            <li>
              <Link to="/register" className={location.pathname === "/register" ? "active" : ""} 
                onClick={() => setIsMobileMenuOpen(false)}>
                Student Registration
              </Link>
            </li>
          </ul>
        </nav>

        <div className="menu-icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          ☰
        </div>
      </div>
    </header>
  );
};

export default Header;
