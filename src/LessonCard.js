import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";

export default function LessonCard({ lessonName, lessonDate, id }) {
  return (
  <div className="bg-white shadow-md p-8 rounded-lg w-48">
    <h2 className="font-bold text-lg">{lessonName}</h2>
    <hr/>
    <span>{lessonDate}</span>
  </div>
  )
}
