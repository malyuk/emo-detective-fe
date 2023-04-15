import React, { useContext } from "react";
import { UserContext } from "./App";
import { Link } from "react-router-dom";

export default function LessonCard({ lessonName, lessonDate, id, lessonTime }) {
  const { user } = useContext(UserContext);
  return (
    <div className="bg-white shadow-md p-8 rounded-lg w-96">
      <h2 className="font-bold text-lg mb-2">{lessonName}</h2>
      <hr />
      <span className="flex mt-2">
        {lessonDate} at {lessonTime}
      </span>
      {user.role === "teacher" && (
        <>
          <Link to={`/lesson-statistics/${id}`}>
          <button className="mt-8  bg-violet-500 text-white p-2 rounded-lg hover:bg-violet-600">
            View Lesson Stats
          </button></Link>
        </>
      )}
    </div>
  );
}
