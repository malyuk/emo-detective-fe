import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import moment from 'moment'
import Box from "@mui/material/Box";
// const data = [
//   { name: "2017", pv: 20, uv: 40, tn: 20, tp: 40  },
//   { name: "2018", pv: 30, uv: 43 },
//   { name: "2019", pv: 22, uv: 20 },
//   { name: "2020", pv: 33, uv: 21 },

// ]
// const data = [
//   { Time: "2017", angry: 20, disgust: 20, fear: 39, happy: 28, neutral: 90, sad: 8, surprise: 4 },
//   { Time: "2018", angry: 30, disgust: 60, fear: 39, happy: 48, neutral: 20, sad: 8, surprise: 4 },
//   { Time: "2019", angry: 0, disgust: 20, fear: 39, happy: 69, neutral: 30, sad: 8, surprise: 4 },
//   { Time: "2020", angry: 50, disgust: 80, fear: 39, happy: 48, neutral: 60, sad: 8, surprise: 4 },
//   { Time: "2021", angry: 70, disgust: 30, fear: 39, happy: 88, neutral: 80, sad: 8, surprise: 4 },
//   { Time: "2022", angry: 90, disgust: 50, fear: 39, happy: 48, neutral: 50, sad: 8, surprise: 4 },
// ];

export default function ChartBar() {

  const [chart, setChart] = useState([]);
  const [userID, setUserId] = useState([]);

  useEffect(() => {
    fetch(
      `https://emo-detective-be.ue.r.appspot.com/stats/lesson/etNqwBwosOWg8nFKnr0g`
    )
      .then((response) => response.json())
      .then((data) => {

        let holder= []
        let user_id = data.data[0].userId

        setUserId(data.data[2].userId);
        data.data.sort((a,b) => (a.createdOn._seconds - b.createdOn._seconds))

        

        data.data.forEach(element => {

          if (element.emotions.lenght !== 0 ){
            if (element.userId === user_id){
              holder.push({...element.emotions, Time: moment(element.createdOn._seconds).format("h:mm:ss a") })
            }
          } 
        });

        holder.sort(function(a, b){return a.Time - b.Time})

       
        
        // setChart(holder.filter((todo) => todo.userId === data.data[2].userId));
        // console.log("USER", holder.filter((todo) => todo.userId === data.data[2].userId))
        setChart( holder);
      })
      .catch(alert);
  }, [fetch]);

  return (
    
    <main>
      <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
      <h1 className="font-bold text-2xl mt-1">Selected Student Statistic </h1>
      <h1 className="font-bold text-2xl mt-1">Student Id - {userID}</h1>
    <BarChart width={900} height={300} data={chart}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="Time" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="angry" fill="#f90008" />
      <Bar dataKey="disgust" fill="#798589" />
      <Bar dataKey="fear" fill="#0021fc" />
      <Bar dataKey="happy" fill="#69ff0c" />
      <Bar dataKey="neutral" fill="#fcc40c" />
      <Bar dataKey="sad" fill="#754d38" />
      <Bar dataKey="surprise" fill="#A45EE5" />
    </BarChart>
    </Box>
    </main>
  )
}

