import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const data = [
  { name: "2017", react: 32, angular: 37, vue: 60 },
  { name: "2018", react: 42, angular: 42, vue: 43 },
  { name: "2019", react: 52, angular: 41, vue: 53 },
  { name: "2020", react: 60, angular: 41, vue: 27 },
  { name: "2021", react: 51, angular: 33, vue: 30 },
  { name: "2022", react: 96, angular: 33, vue: 49 },
];

export default function Chart() {

  return (
    <LineChart width={600} height={300} data={data}>
      <Line type="monotone" dataKey="react" stroke="#2196F3" strokeWidth={5} />
      <Line type="monotone" dataKey="angular" stroke="#F44335" strokeWidth={5} />
      <Line type="monotone" dataKey="vue" stroke="#FFCA29" strokeWidth={5} />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
    </LineChart>
  )
}

