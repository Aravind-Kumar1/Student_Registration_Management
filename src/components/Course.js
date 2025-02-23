import React, { useState } from "react";  // Removed useEffect
import "../styles/course.css"; 

const Course = ({ courses, setCourses }) => {
  const [newCourse, setNewCourse] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [updatedCourse, setUpdatedCourse] = useState("");

  const handleAddCourse = () => {
    if (newCourse.trim() === "") return;
    setCourses([...courses, newCourse]); 
    setNewCourse("");
  };

  const handleDeleteCourse = (index) => {
    setCourses(courses.filter((_, i) => i !== index));
  };

  const handleEditCourse = (index) => {
    setEditingIndex(index);
    setUpdatedCourse(courses[index]);
  };

  const handleUpdateCourse = () => {
    if (updatedCourse.trim() === "") return;
    setCourses(
      courses.map((course, i) => (i === editingIndex ? updatedCourse : course))
    );
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
