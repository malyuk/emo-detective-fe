import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import React, { createContext } from "react";
import AddLesson from "./pages/AddLesson";
import Lesson from "./pages/Lesson";
import LessonDashboard from "./pages/LessonDashboard";
import LessonStatistics from "./pages/LessonStatistics";
import Login from "./pages/Login";

export const UserContext = createContext(null);

function App() {
  return (
    // <UserContext.Provider value={{ user, setUser, jwt, setJwt }}>
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
          <NavLink exact to="/LessonDashboard">
            Lesson Dashboard
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
        <Route path="/LessonDashboard" element={<LessonDashboard />} />
        {/* <Route path ='/Login' element={<Login/>} />*/}
        <Route exact path="/Login" element={<Login />} />
      </Routes>
    </Router>
    // </UserContext.Provider>
  );
}

export default App;
