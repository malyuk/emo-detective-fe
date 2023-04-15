import "./App.css";
// import LessonCard from './LessonCard';
import Lessons from "./Lessons";
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
import Header from "./components/Header";

export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);

  console.log("user:", user);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Header />
        <Routes>
          <Route path="/lesson-statistics/:id" element={<LessonStatistics />} />
          <Route path="/add-lesson" element={<AddLesson />} />
          <Route path="/lesson" element={<Lesson />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
