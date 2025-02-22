import React, { useState, useEffect } from "react";
import "../styles/course.css"; // Import CSS file

const Course = ({ courses, onCoursesChange }) => {
  const [newCourse, setNewCourse] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [updatedCourse, setUpdatedCourse] = useState("");

  const handleAddCourse = () => {
    if (newCourse.trim() === "") return;
    const updatedCourses = [...courses, newCourse];
    onCoursesChange(updatedCourses);
    setNewCourse("");
  };

  const handleDeleteCourse = (index) => {
    const updatedCourses = courses.filter((_, i) => i !== index);
    onCoursesChange(updatedCourses);
  };

  const handleEditCourse = (index) => {
    setEditingIndex(index);
    setUpdatedCourse(courses[index]);
  };

  const handleUpdateCourse = () => {
    if (updatedCourse.trim() === "") return;
    const updatedCourses = courses.map((course, i) => (i === editingIndex ? updatedCourse : course));
    onCoursesChange(updatedCourses);
    setEditingIndex(null);
    setUpdatedCourse("");
  };

  return (
    <div className="course-container">
      <h2>📚 Manage Your Courses</h2>

      <div className="input-container">
        <input
          type="text"
          className="course-input"
          value={newCourse}
          onChange={(e) => setNewCourse(e.target.value)}
          placeholder="Add new course..."
        />
        <button className="add-btn" onClick={handleAddCourse}>
          Add
        </button>
      </div>

      <ul className="course-list">
        {courses.map((course, index) => (
          <li key={index} className="course-item">
            {editingIndex === index ? (
              <input
                type="text"
                className="edit-input"
                value={updatedCourse}
                onChange={(e) => setUpdatedCourse(e.target.value)}
              />
            ) : (
              <span className="course-name">{course}</span>
            )}

            <div className="btn-group">
              {editingIndex === index ? (
                <button className="save-btn" onClick={handleUpdateCourse}>
                  Save
                </button>
              ) : (
                <>
                  <button className="edit-btn" onClick={() => handleEditCourse(index)}>
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => handleDeleteCourse(index)}>
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Course;
