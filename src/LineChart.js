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

const data = [
  { Time: "2017", react: 42, angular: 42, vue: 43 },
  { Time: "2018", react: 42, angular: 42, vue: 43 },
  { Time: "2019", react: 52, angular: 41, vue: 53 },
  { Time: "2020", react: 60, angular: 41, vue: 27 },
  { Time: "2021", react: 51, angular: 33, vue: 30 },
  { Time: "2022", react: 96, angular: 33, vue: 49 },
];

export default function Chart(lesson) {
  const [chart, setChart] = useState([]);
  useEffect(() => {
    fetch(
      `https://emo-detective-be.ue.r.appspot.com/stats/lesson/etNqwBwosOWg8nFKnr0g`
    )
      .then((response) => response.json())
      .then((data) => {
        setChart(data);
        console.log(data, "here");
      })
      .catch(alert);
  }, [lesson]);

  return (
    <LineChart width={600} height={300} data={data}>
      <Line type="monotone" dataKey="react" stroke="#2196F3" strokeWidth={5} />
      <Line
        type="monotone"
        dataKey="angular"
        stroke="#F44335"
        strokeWidth={5}
      />
      <Line type="monotone" dataKey="vue" stroke="#FFCA29" strokeWidth={5} />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="Time" />
      <YAxis />
      <Tooltip />
      <Legend />
    </LineChart>
  );
}
