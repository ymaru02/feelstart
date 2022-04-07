import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import Box from "@mui/material/Box";

export default function Bar(props) {
  const canvasDom = useRef(null);

  const labels = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const obj = { SUN: 0, MON: 0, TUE: 0, WED: 0, THU: 0, FRI: 0, SAT: 0 };

  props.dataset.map((data) => {
    let date2 = new Date(data.loginUserDatetime);
    const day = labels[date2.getDay()];
    obj[day] += 1;
  });

  useEffect(() => {
    const data = {
      labels: labels,
      datasets: [
        {
          label: "My First Dataset",
          data: [obj.SUN, obj.MON, obj.TUE, obj.WED, obj.THU, obj.FRI, obj.SAT],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(201, 203, 207, 0.2)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
          ],
          borderWidth: 1,
        },
      ],
    };
    const config = {
      type: "bar",
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    const ctx = canvasDom.current.getContext("2d");
    Chart.register(...registerables);
    const ChartName = new Chart(ctx, config);

    return () => ChartName.destroy();
  }, [obj]);

  return (
    <Box
      sx={{
        padding: 5,
        border: "solid",
        borderRadius: 10,
        backgroundColor: "rgb(239, 240, 239)",
      }}
    >
      <canvas ref={canvasDom}></canvas>
    </Box>
  );
}
