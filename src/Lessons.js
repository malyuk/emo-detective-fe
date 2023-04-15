import React, { useEffect, useState } from 'react';
import LessonCard from "./LessonCard"

export default function Lessons() {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {

    fetch(`https://emo-detective-be.ue.r.appspot.com/lessons`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLessons(data);
      })
      .catch(console.error);
  }, []);

  return (
    <section>
      {!lessons ? <p>Loading...</p> : (
        lessons.map(el => {
          return (<div className='flex'>
            <LessonCard lessonDate={el.lessonDate} lessonName={el.lessonName}></LessonCard>
          </div>)
        })
      )}
    </section>
  );
}

























