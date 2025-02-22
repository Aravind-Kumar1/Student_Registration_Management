import React, { useState } from "react";
import "../styles/courseoffering.css";

const CourseOffering = ({ courseTypes, courseOfferings, onCourseOfferingsChange }) => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // Validation message

  // Add new offering
  const handleAddOffering = () => {
    if (!selectedCourse || !selectedType) {
      setErrorMessage("⚠️ Please fill all input fields before adding!");
      return;
    }

    const newOffering = { id: Date.now(), course: selectedCourse, type: selectedType };
    onCourseOfferingsChange((prev) => [...prev, newOffering]);
    setSelectedCourse("");
    setSelectedType("");
    setErrorMessage(""); // Clear error message on successful addition
  };

  // Delete a single offering
  const handleDeleteOffering = (id) => {
    onCourseOfferingsChange((prev) => prev.filter((offering) => offering.id !== id));
  };

  // Clear all offerings with confirmation
  const handleClearAll = () => {
    const confirmDelete = window.confirm("🚨 Are you sure you want to clear all course offerings? This action cannot be undone.");
    if (confirmDelete) {
      onCourseOfferingsChange([]);
    }
  };

  // Edit an offering
  const handleEditOffering = (offering) => {
    setSelectedCourse(offering.course);
    setSelectedType(offering.type);
    setEditingId(offering.id);
    setErrorMessage(""); // Clear any previous error message
  };

  // Update an offering
  const handleUpdateOffering = () => {
    if (!selectedCourse || !selectedType) {
      setErrorMessage("⚠️ Please fill all input fields before updating!");
      return;
    }

    onCourseOfferingsChange((prev) =>
      prev.map((offering) =>
        offering.id === editingId ? { ...offering, course: selectedCourse, type: selectedType } : offering
      )
    );
    setSelectedCourse("");
    setSelectedType("");
    setEditingId(null);
    setErrorMessage(""); // Clear error message on successful update
  };

  return (
    <div className="course-offering-container">
      <h2>📚 Course Offerings</h2>

      <div className="form-container">
        <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
          <option value="">Select Course</option>
          {["Hindi", "English", "Urdu"].map((course) => (
            <option key={course} value={course}>{course}</option>
          ))}
        </select>

        <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
          <option value="">Select Type</option>
          {courseTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        {editingId ? (
          <button className="update-btn" onClick={handleUpdateOffering}>Update</button>
        ) : (
          <button className="add-btn" onClick={handleAddOffering}>Add Offering</button>
        )}
      </div>

      {/* Error Message Display */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="offerings-container">
        <ul className="offerings-list">
          {courseOfferings.length === 0 ? <p>No courses added yet.</p> : courseOfferings.map((offering) => (
            <li key={offering.id}>
              <span>{offering.type} - {offering.course}</span>
              <div className="buttons">
                <button className="edit-btn" onClick={() => handleEditOffering(offering)}>✏ Edit</button>
                <button className="delete-btn" onClick={() => handleDeleteOffering(offering.id)}>🗑 Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {courseOfferings.length > 0 && <button className="clear-btn" onClick={handleClearAll}>❌ Clear All</button>}
    </div>
  );
};

export default CourseOffering;
