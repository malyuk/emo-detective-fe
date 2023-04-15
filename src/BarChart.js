
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

// const data = [
//   { name: "2017", pv: 20, uv: 40, tn: 20, tp: 40  },
//   { name: "2018", pv: 30, uv: 43 },
//   { name: "2019", pv: 22, uv: 20 },
//   { name: "2020", pv: 33, uv: 21 },

// ]
const data = [
  { Time: "2017", angry: 20, disgust: 20,fear: 39, happy: 28, neutral: 90, sad: 8, surprise: 4},
  { Time: "2018", angry: 30, disgust: 60,fear: 39, happy: 48, neutral: 20, sad: 8, surprise: 4},
  { Time: "2019", angry: 0, disgust: 20,fear: 39, happy: 69, neutral: 30, sad: 8, surprise: 4},
  { Time: "2020", angry: 50, disgust: 80,fear: 39, happy: 48, neutral: 60, sad: 8, surprise: 4},
  { Time: "2021", angry: 70, disgust: 30,fear: 39, happy: 88, neutral: 80, sad: 8, surprise: 4},
  { Time: "2022", angry: 90, disgust: 50,fear: 39, happy: 48, neutral: 50, sad: 8, surprise: 4},
];

export default function ChartBar() {

  return (

    <BarChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="Time" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="angry" fill="#8884d8" />
      <Bar dataKey="disgust" fill="#82ca9d" />
      <Bar dataKey="fear" fill="#82ca9d" />
      <Bar dataKey="happy" fill="#82ca9d" />
      <Bar dataKey="neutral" fill="#82ca9d" />
      <Bar dataKey="sad" fill="#82ca9d" />
      <Bar dataKey="surprise" fill="#82ca9d" />
    </BarChart>
  )
}

