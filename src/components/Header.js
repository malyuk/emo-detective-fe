import React from "react";
import { Link } from "react-router-dom";

const navigationItems = [
  { path: "/login", name: "Login" },
  { path: "/lesson", name: "Lesson" },
  { path: "/teacher-dashboard", name: "Teacher Dashboard" },
  { path: "/add-lesson", name: "Add Lesson" },
  { path: "/lesson-statistics", name: "Lesson Statistics" },
];

const Header = () => {
  return (
    <div className="flex justify-between text-lg bg-slate-200 py-4 px-6 shadow-sm">
        <Link to="/">Logo</Link>
      <ul className="flex gap-8">
        {navigationItems.map((el) => {
          return (
            <li key={el.name} className="hover:underline cursor-pointer ">
              <Link to={el.path}>{el.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Header;
