import React from "react";
import ChartBar from "../BarChart";

import Lessons from "../Lessons";
import LineChart from "../LineChart";

function Home() {
  return (
    <main>
      <Lessons />
      <LineChart />
      <ChartBar />
    </main>
  );
}

export default Home;
