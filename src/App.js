import './App.css';
// import LessonCard from './LessonCard';
import Lessons from './Lessons';
// import TeacherDashboard from './TeacherDashboard';
// import LogInForm from './LoginForm';


import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import React, { createContext, useState } from "react";
import AddLesson from "./pages/AddLesson";
import Lesson from "./pages/Lesson";
import TeacherDashboard from "./pages/TeacherDashboard";
import LessonStatistics from "./pages/LessonStatistics";
import Login from "./pages/Login";

export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <header>
          <nav
            style={{
              padding: ".3em",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <NavLink exact to="/Login">
              Login
            </NavLink>
            <NavLink exact to="/TeacherDashboard">
              Teacher Dashboard
            </NavLink>
            <NavLink exact to="/AddLesson">
              Add Lesson
            </NavLink>
            <NavLink exact to="/Lesson">
              Lesson
            </NavLink>
            <NavLink exact to="/LessonStatistics">
              Lesson Statistics
            </NavLink>
          </nav>
        </header>
        <Routes>
          <Route path="/LessonStatistics" element={<LessonStatistics />} />
          <Route path="/AddLesson" element={<AddLesson />} />
          <Route path="/Lesson" element={<Lesson />} />
          <Route path="/TeacherDashboard" element={<TeacherDashboard />} />
          {/* <Route path ='/Login' element={<Login/>} />*/}
          <Route exact path="/Login" element={<Login />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
