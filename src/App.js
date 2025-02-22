import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CourseType from "./components/CourseType";  
import Course from "./components/Course";
import CourseOffering from "./components/CourseOffering";
import Registration from "./components/Registration";
import Header from "./components/Header";
import Home from "./components/Home";

// Function to Get Data from Local Storage
const getLocalStorageData = (key) => {
  try {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    console.error(`Error parsing localStorage data for ${key}:`, error);
    return [];
  }
};

function App() {
  const [courseTypes, setCourseTypes] = useState(() => getLocalStorageData("courseTypes"));
  const [courses, setCourses] = useState(() => getLocalStorageData("courses"));
  const [courseOfferings, setCourseOfferings] = useState(() => getLocalStorageData("courseOfferings"));
  const [registrations, setRegistrations] = useState(() => getLocalStorageData("registrations"));

  // Save Data to Local Storage when state changes
  useEffect(() => {
    localStorage.setItem("courseTypes", JSON.stringify(courseTypes));
  }, [courseTypes]);

  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem("courseOfferings", JSON.stringify(courseOfferings));
  }, [courseOfferings]);

  useEffect(() => {
    localStorage.setItem("registrations", JSON.stringify(registrations));
  }, [registrations]);

  return (
    <Router>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={
            <Home 
              courseTypes={courseTypes} 
              courses={courses} 
              courseOfferings={courseOfferings} 
              registrations={registrations} 
            />
          }/>
          <Route 
            path="/course-types" 
            element={<CourseType courseTypes={courseTypes} onCourseTypesChange={setCourseTypes} />} 
          />
          <Route 
            path="/courses" 
            element={<Course courses={courses} onCoursesChange={setCourses} />} 
          />
          <Route 
            path="/course-offerings" 
            element={
              <CourseOffering 
                courseTypes={courseTypes} 
                courseOfferings={courseOfferings}  
                onCourseOfferingsChange={setCourseOfferings} 
              />
            }  
          />
          <Route 
            path="/register" 
            element={
              <Registration 
              courseOfferings={courseOfferings} 
              registrations={registrations} 
              setRegistrations={setRegistrations}
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
