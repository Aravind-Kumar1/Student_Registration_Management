import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

const Home = ({ courseTypes, courses, courseOfferings, registrations }) => {
  return (
    <div className="home">
      
      <section className="hero">
        <h1>🎓 Welcome to the Student Registration System</h1>
        <p>Manage courses, offerings, and student registrations in real-time.</p>
        <Link to="/register" className="cta-button">Get Started</Link>
      </section>

      
      <section className="dashboard">
        <div className="card">Total Course Types: <strong>{courseTypes.length}</strong></div>
        <div className="card">Total Courses: <strong>{courses.length}</strong></div>
        <div className="card">Total Course Offerings: <strong>{courseOfferings.length}</strong></div>
        <div className="card">Total Registered Students: <strong>{registrations.length}</strong></div>
      </section>

      {/* Quick Links */}
      <section className="quick-links">
        <Link to="/course-types" className="button">Manage Course Types</Link>
        <Link to="/courses" className="button">Manage Courses</Link>
        <Link to="/course-offerings" className="button">Create Course Offering</Link>
        <Link to="/register" className="button">Register a Student</Link>
      </section>
    </div>
  );
};

export default Home;
