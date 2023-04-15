import React, { useEffect } from "react";
import LessonCard from "../LessonCard";
import { useContext, useState } from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [lessons, setLessons] = useState([]);
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_BASE_URL}/lessons/student/${user.userId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setLessons(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="bg-slate-100 py-12 px-6 min-h-screen">
      <h1 className="font-bold text-3xl mb-3">Dashboard</h1>
      <hr />
      <div className="flex flex-wrap gap-4 mt-4">
        {!lessons
          ? "Loading"
          : lessons.map((el) => {
              return (
                <Link key={el.lessonName} to={`/lesson/${el.id}`}>
                  <LessonCard
                    key={el.lessonName}
                    lessonDate={el.lessonDate}
                    lessonName={el.lessonName}
                    lessonTime={el.lessonTime}
                  />
                </Link>
              );
            })}
      </div>
    </section>
  );
};

export default Dashboard;
