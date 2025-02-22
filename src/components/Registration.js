import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/registration.css";

const Registration = ({ courseOfferings, registrations, setRegistrations }) => {
  const [selectedOffering, setSelectedOffering] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [studentName, setStudentName] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    if (!studentName.trim()) newErrors.studentName = "⚠️ Please enter the student's name!";
    if (!selectedOffering) newErrors.selectedOffering = "⚠️ Please select a course!";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (!validateForm()) {
      toast.error("⚠️ Please fill in all required fields!", { position: "top-right", autoClose: 3000 });
      return;
    }

    const newRegistration = {
      id: Date.now(),
      name: studentName,
      course: selectedOffering,
      type: selectedType,
    };

    setRegistrations((prev) => [...prev, newRegistration]);
    setStudentName("");
    setSelectedOffering("");
    setErrors({});

    toast.success("🎉 Successfully registered!", { position: "top-right", autoClose: 3000 });
  };

  const handleDelete = (id) => {
    setRegistrations((prev) => prev.filter((registration) => registration.id !== id));
  };

  const handleClearAll = () => {
    const confirmDelete = window.confirm("🚨 Are you sure you want to clear all registrations?");
    if (confirmDelete) {
      setRegistrations([]);
      toast.info("🗑️ All registrations cleared!", { position: "top-right", autoClose: 3000 });
    }
  };

  const handleFilterChange = (e) => {
    setSelectedType(e.target.value);
    setSelectedOffering("");
  };

  const filteredOfferings = selectedType
    ? courseOfferings.filter((offering) => offering.type === selectedType)
    : courseOfferings;

  return (
    <div className="registration-container">
      <ToastContainer />

      <h2>🎓 Student Registration</h2>

      {Object.keys(errors).length > 0 && (
        <div className="error-box">
          {Object.values(errors).map((error, index) => (
            <p key={index} className="error-text">{error}</p>
          ))}
        </div>
      )}

      <div className="form-container">
        <input
          type="text"
          placeholder="Enter Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className={errors.studentName ? "error-input" : ""}
        />

        <select value={selectedType} onChange={handleFilterChange}>
          <option value="">Filter by Course Type</option>
          {[...new Set(courseOfferings.map((offering) => offering.type))].map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <select 
          value={selectedOffering} 
          onChange={(e) => setSelectedOffering(e.target.value)}
          className={errors.selectedOffering ? "error-input" : ""}
        >
          <option value="">Select Course Offering</option>
          {filteredOfferings.map((offering) => (
            <option key={offering.id} value={offering.course}>
              {offering.type} - {offering.course}
            </option>
          ))}
        </select>

        <button className="register-btn" onClick={handleRegister}>Register</button>
      </div>

      <h3>📋 Registered Students</h3>
      <div className="registration-list-container">
        <ul className="registration-list">
          {registrations.map((registration) => (
            <li key={registration.id} className="registration-item">
              {registration.name} - {registration.course} ({registration.type})
              <button className="delete-btn" onClick={() => handleDelete(registration.id)}>🗑️</button>
            </li>
          ))}
        </ul>
      </div>

      {registrations.length > 0 && (
        <button className="clear-btn" onClick={handleClearAll}>❌ Clear All</button>
      )}
    </div>
  );
};

export default Registration;
