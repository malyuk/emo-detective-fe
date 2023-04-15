import * as React from "react";

export default function LessonCard({ lessonName, lessonDate, id }) {
  return (
    <div className="bg-white shadow-md p-8 rounded-lg w-96">
      <h2 className="font-bold text-lg">{lessonName}</h2>
      <hr />
      <span>{lessonDate}</span>
    </div>
  );
}
