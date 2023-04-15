import React, { useEffect, useState } from "react";
import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import moment from 'moment'

// const data = [
//   { Time: "2017", angry: 20, disgust: 20,fear: 39, happy: 28, neutral: 90, sad: 8, surprise: 4},
//   { Time: "2018", angry: 30, disgust: 60,fear: 39, happy: 48, neutral: 20, sad: 8, surprise: 4},
//   { Time: "2019", angry: 0, disgust: 20,fear: 39, happy: 69, neutral: 30, sad: 8, surprise: 4},
//   { Time: "2020", angry: 50, disgust: 80,fear: 39, happy: 48, neutral: 60, sad: 8, surprise: 4},
//   { Time: "2021", angry: 70, disgust: 30,fear: 39, happy: 88, neutral: 80, sad: 8, surprise: 4},
//   { Time: "2022", angry: 90, disgust: 50,fear: 39, happy: 48, neutral: 50, sad: 8, surprise: 4},
// ];

export default function Chart(lesson) {
  const [chart, setChart] = useState([]);
  useEffect(() => {
    fetch(
      `https://emo-detective-be.ue.r.appspot.com/stats/lesson/etNqwBwosOWg8nFKnr0g`
    )
      .then((response) => response.json())
      .then((data) => {

        let holder= []
        data.data.forEach(element => {
          holder.push({...element.emotions, Time: moment(element.createdOn._seconds).format("h:mm:ss a") })
        });
        
        setChart( holder);
      })
      .catch(alert);
  }, [fetch]);

  return (
    <LineChart width={1500} height={300} data={chart}>   
    <Line type="monotone" dataKey="angry" stroke="#2196F3" strokeWidth={1} />
    <Line type="monotone" dataKey="disgust" troke="#F44335" strokeWidth={1} />
    <Line type="monotone" dataKey="fear" stroke="#FFCA29" strokeWidth={1} />
    <Line type="monotone" dataKey="happy" stroke="#2196F3" strokeWidth={1} />
    <Line type="monotone" dataKey="neutral" troke="#F44335" strokeWidth={1} />
    <Line type="monotone" dataKey="sad" stroke="#FFCA29" strokeWidth={1} />
    <Line type="monotone" dataKey="surprise" stroke="#2196F3" strokeWidth={1} />

    <CartesianGrid stroke="#ccc" />
    <XAxis dataKey="Time" />
    <YAxis />
    <Tooltip />
    <Legend />
    </LineChart> 
  );
}
