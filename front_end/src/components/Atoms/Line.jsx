import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import Box from "@mui/material/Box";

export default function Line(props) {
  const canvasDom = useRef(null);

  const timeset = props.dataset.map(
    (data) => data.loginUserDatetime.split("T")[1].split(":")[0]
  );
  const time = [];
  for (let i = 1; i < 25; i++) {
    time.push(
      timeset.filter((data) => {
        return Number(data) === i;
      }).length
    );
  }

  useEffect(() => {
    const labels = [];
    for (let i = 1; i < 25; i++) {
      if (i < 10) {
        labels.push("0" + String(i));
      } else labels.push(String(i));
    }

    const data = {
      labels: labels,
      datasets: [
        {
          label: "My First Dataset",
          data: time,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };
    const config = {
      type: "line",
      data: data,
    };
    const ctx = canvasDom.current.getContext("2d");
    Chart.register(...registerables);
    const ChartName = new Chart(ctx, config);

    return () => ChartName.destroy();
  }, [timeset]);

  return (
    <Box
      sx={{
        padding: 5,
        border: "solid",
        borderRadius: 10,
        backgroundColor: "rgb(249, 250, 251)",
      }}
    >
      <canvas ref={canvasDom}></canvas>
    </Box>
  );
}
