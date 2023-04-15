
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const data = [
  { name: "2017", pv: 20, uv: 40 },
  { name: "2018", pv: 30, uv: 43 },
  { name: "2019", pv: 22, uv: 20 },
  { name: "2020", pv: 33, uv: 21 },

]

export default function ChartBar() {

  return (

    <BarChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="pv" fill="#8884d8" />
      <Bar dataKey="uv" fill="#82ca9d" />
    </BarChart>
  )
}

