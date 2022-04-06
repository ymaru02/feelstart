import React, { useRef, useEffect } from "react";
import { Chart, registerables } from "chart.js";
import Box from "@mui/material/Box";

export default function Doughnut(props) {
  const canvasDom = useRef(null);

  const labels = [...new Set(props.dataset.map((data) => data.accessBrowser))];

  const browserset = [];
  for (let i = 0; i < props.dataset.length; i++) {
    browserset.push(
      props.dataset.filter((data) => data.accessBrowser === labels[i]).length
    );
  }

  useEffect(() => {
    const data = {
      labels: labels,

      datasets: [
        {
          label: "My First Dataset",
          data: browserset,
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
          hoverOffset: 4,
        },
      ],
    };

    const config = {
      type: "doughnut",
      data: data,
    };

    const ctx = canvasDom.current.getContext("2d");
    Chart.register(...registerables);
    const ChartName = new Chart(ctx, config);
    return () => ChartName.destroy();
  }, [labels]);

  return (
    <Box
      sx={{
        marginBottom: 10,
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
