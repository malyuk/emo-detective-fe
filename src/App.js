import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { createContext, useState } from "react";
import AddLesson from "./pages/AddLesson";
import Lesson from "./pages/Lesson";
import LessonStatistics from "./pages/LessonStatistics";
import Login from "./pages/Login";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";

export const UserContext = createContext(null);
export const LessonContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);
  const [lesson, setLesson] = useState(null);

  console.log("user:", user);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <LessonContext.Provider value={{ lesson, setLesson }}>
        <Router>
          <Header />
          <Routes>
            <Route
              path="/lesson-statistics/:id"
              element={<LessonStatistics />}
            />
            <Route path="/add-lesson" element={<AddLesson />} />
            <Route path="/lesson/:id" element={<Lesson />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </Router>
      </LessonContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
