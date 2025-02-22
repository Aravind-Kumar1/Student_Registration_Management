import React, { useState } from "react";
import "../styles/coursetype.css";

const CourseType = ({ courseTypes = [], onCourseTypesChange }) => {
  const [newType, setNewType] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const handleAddType = () => {
    if (!newType.trim() || courseTypes.includes(newType)) return;
    onCourseTypesChange([...courseTypes, newType]);
    setNewType("");
  };

  const handleEditType = (index) => {
    setEditingIndex(index);
    setEditText(courseTypes[index]);
  };

  const handleSaveEdit = () => {
    if (!editText.trim()) return;
    const updatedTypes = [...courseTypes];
    updatedTypes[editingIndex] = editText;
    onCourseTypesChange(updatedTypes);
    setEditingIndex(null);
  };

  const handleDeleteType = (index) => {
    const filteredTypes = courseTypes.filter((_, i) => i !== index);
    onCourseTypesChange(filteredTypes);
  };

  return (
    <div className="course-type-container">
      <h2 className="title">Course Types</h2>

      <div className="input-section">
        <input
          type="text"
          value={newType}
          onChange={(e) => setNewType(e.target.value)}
          placeholder="Enter new course type"
          className="input-field"
        />
        <button onClick={handleAddType} className="btn add-btn">Add</button>
      </div>

      <div className="course-list-container">
        {courseTypes.length > 0 ? (
          <ul className="course-list">
            {courseTypes.map((type, index) => (
              <li key={index} className="course-item">
                {editingIndex === index ? (
                  <div className="edit-mode">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="input-field"
                    />
                    <button onClick={handleSaveEdit} className="btn save-btn">Save</button>
                  </div>
                ) : (
                  <div className="display-mode">
                    <span className="course-name">{type}</span>
                    <div className="btn-group">
                      <button onClick={() => handleEditType(index)} className="btn edit-btn">
                        Edit
                      </button>
                      <button onClick={() => handleDeleteType(index)} className="btn delete-btn">
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-course">No course types added yet.</p>
        )}
      </div>
    </div>
  );
};

export default CourseType;
