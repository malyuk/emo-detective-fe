import React from "react";
import ChartBar from "../BarChart";

import Lessons from "../Lessons";
import LineChart from "../LineChart";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

function Home() {
  // const navigate = useNavigate();
  return (
    <main>
      <section className="bg-slate-100 py-12 px-6 min-h-screen">
        <h1 className="font-bold text-3xl mb-3">Lesson Statistics</h1>
        <hr />
        <div className="flex flex-wrap gap-4 mt-1">
        {/* <Lessons /> */}
        
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
            <h1 className="font-bold text-2xl mt-1">Full Lesson Stat</h1>
            <LineChart />
        </Box>
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
            <h1 className="font-bold text-2xl mt-1">Studend Statistic</h1>
            <ChartBar />
          </Box>
        </div>
      </section> 
    </main>
  );
}

export default Home;
