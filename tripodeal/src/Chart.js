import React from "react";
import ReactApexChart from "react-apexcharts";
import { chartData } from "./Json";

const Charts = () => {
  console.log("CHART DATA", chartData);

  return (
    <div>
      {chartData.map((data) => (
        <div>
          <h3>{data.chart} Chart Example</h3>
          <ReactApexChart
            options={data.options}
            series={data.series}
            type={data.type}
            height={data.height}
            width={data.width}
          />
        </div>
  ))}
    </div>
  );
};

export default Charts;
